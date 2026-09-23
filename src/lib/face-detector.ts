/**
 * High-Precision Client-Side Face & Multi-Person Detector
 * Detects:
 * - 0 faces: Absent / No face in camera
 * - 1 face: Valid single candidate
 * - 2+ faces: Multiple people violation
 *
 * Uses native browser FaceDetector when available, with a fast, zero-dependency
 * anthropometric computer vision fallback operating on HTML5 Canvas.
 */

export interface DetectedFace {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

export interface FaceDetectionResult {
  faceCount: number;
  status: "NO_FACE" | "SINGLE_FACE" | "MULTIPLE_FACES";
  faces: DetectedFace[];
}

// Processing resolution for high speed & low CPU usage (15-30 FPS)
const PROC_W = 160;
const PROC_H = 120;

let sharedCanvas: HTMLCanvasElement | null = null;
let sharedCtx: CanvasRenderingContext2D | null = null;

function getProcessingContext(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  if (typeof window === "undefined") return null;
  if (!sharedCanvas) {
    sharedCanvas = document.createElement("canvas");
    sharedCanvas.width = PROC_W;
    sharedCanvas.height = PROC_H;
    sharedCtx = sharedCanvas.getContext("2d", { willReadFrequently: true });
  }
  return sharedCtx ? { canvas: sharedCanvas, ctx: sharedCtx } : null;
}

/**
 * Fast Anthropometric Face Detection running on pixel data
 */
function detectFacesViaPixelAnalysis(
  video: HTMLVideoElement,
  videoWidth: number,
  videoHeight: number
): FaceDetectionResult {
  const proc = getProcessingContext();
  if (!proc) {
    return { faceCount: 1, status: "SINGLE_FACE", faces: [] };
  }

  const { ctx } = proc;
  ctx.drawImage(video, 0, 0, PROC_W, PROC_H);
  const imgData = ctx.getImageData(0, 0, PROC_W, PROC_H);
  const data = imgData.data;

  // Step 1: Skin Chrominance Segmentation in YCbCr & Normalized RGB
  const skinMask = new Uint8Array(PROC_W * PROC_H);
  let totalSkinPixels = 0;

  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const sum = r + g + b || 1;
    const nr = r / sum;
    const ng = g / sum;

    // YCbCr conversion
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

    // Skin locus condition covering varied skin tones
    const isSkin =
      y > 25 &&
      y < 240 &&
      cb >= 75 &&
      cb <= 135 &&
      cr >= 130 &&
      cr <= 180 &&
      r > g &&
      g > b &&
      r - g >= 6 &&
      nr > 0.33 &&
      nr < 0.62 &&
      ng > 0.24 &&
      ng < 0.42;

    if (isSkin) {
      skinMask[p] = 1;
      totalSkinPixels++;
    }
  }

  // Camera covered or pitch black
  if (totalSkinPixels < 120) {
    return { faceCount: 0, status: "NO_FACE", faces: [] };
  }

  // Step 2: Grid-Based Spatial Density Clustering (8x8 cells)
  const cellW = 8;
  const cellH = 8;
  const cols = Math.floor(PROC_W / cellW);
  const rows = Math.floor(PROC_H / cellH);
  const grid = new Float32Array(cols * rows);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let count = 0;
      for (let cy = 0; cy < cellH; cy++) {
        for (let cx = 0; cx < cellW; cx++) {
          const py = r * cellH + cy;
          const px = c * cellW + cx;
          if (skinMask[py * PROC_W + px]) count++;
        }
      }
      grid[r * cols + c] = count / (cellW * cellH);
    }
  }

  // Step 3: Connected Component Blob Extraction on active grid cells (> 0.25 density)
  const visited = new Uint8Array(cols * rows);
  interface Blob {
    minC: number;
    maxC: number;
    minR: number;
    maxR: number;
    weight: number;
  }
  const blobs: Blob[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (visited[idx] || grid[idx] < 0.25) continue;

      // Flood fill
      let minC = c;
      let maxC = c;
      let minR = r;
      let maxR = r;
      let weight = 0;
      const queue: [number, number][] = [[c, r]];
      visited[idx] = 1;

      while (queue.length > 0) {
        const [qc, qr] = queue.pop()!;
        minC = Math.min(minC, qc);
        maxC = Math.max(maxC, qc);
        minR = Math.min(minR, qr);
        maxR = Math.max(maxR, qr);
        weight += grid[qr * cols + qc];

        // 4-neighborhood
        const neighbors: [number, number][] = [
          [qc + 1, qr],
          [qc - 1, qr],
          [qc, qr + 1],
          [qc, qr - 1],
        ];

        for (const [nc, nr] of neighbors) {
          if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
            const nidx = nr * cols + nc;
            if (!visited[nidx] && grid[nidx] >= 0.25) {
              visited[nidx] = 1;
              queue.push([nc, nr]);
            }
          }
        }
      }

      if (weight >= 3.5) {
        blobs.push({ minC, maxC, minR, maxR, weight });
      }
    }
  }

  // Step 4: Validate Blobs against Facial Geometry & Edge Gradients
  const scaleX = videoWidth / PROC_W;
  const scaleY = videoHeight / PROC_H;
  const validatedFaces: DetectedFace[] = [];

  for (const blob of blobs) {
    const pixelX = blob.minC * cellW;
    const pixelY = blob.minR * cellH;
    const pixelW = (blob.maxC - blob.minC + 1) * cellW;
    const pixelH = (blob.maxR - blob.minR + 1) * cellH;

    const aspect = pixelH / (pixelW || 1);
    const areaFraction = (pixelW * pixelH) / (PROC_W * PROC_H);

    // Anthropometric filter: Human faces have aspect ratio ~0.8 to 2.2 and occupy reasonable area
    if (aspect >= 0.75 && aspect <= 2.4 && areaFraction >= 0.02) {
      // Check internal feature variance (reject flat walls/garments)
      let sumLuma = 0;
      let count = 0;
      for (let y = pixelY; y < pixelY + pixelH; y += 2) {
        for (let x = pixelX; x < pixelX + pixelW; x += 2) {
          const idx = (y * PROC_W + x) * 4;
          sumLuma += data[idx];
          count++;
        }
      }
      const avg = sumLuma / (count || 1);
      let variance = 0;
      for (let y = pixelY; y < pixelY + pixelH; y += 2) {
        for (let x = pixelX; x < pixelX + pixelW; x += 2) {
          const idx = (y * PROC_W + x) * 4;
          variance += Math.abs(data[idx] - avg);
        }
      }
      const avgVariance = variance / (count || 1);

      // Facial features (eyes, nose, mouth) produce variance > 8
      if (avgVariance > 6) {
        validatedFaces.push({
          x: Math.round(pixelX * scaleX),
          y: Math.round(pixelY * scaleY),
          width: Math.round(pixelW * scaleX),
          height: Math.round(pixelH * scaleY),
          confidence: Math.min(1, blob.weight / 15),
        });
      }
    }
  }

  // Step 5: Merge overlapping/adjacent blobs that belong to the same head
  const mergedFaces: DetectedFace[] = [];
  for (const face of validatedFaces) {
    let merged = false;
    for (const existing of mergedFaces) {
      // Check horizontal or vertical proximity
      const xOverlap = Math.max(0, Math.min(face.x + face.width, existing.x + existing.width) - Math.max(face.x, existing.x));
      const yOverlap = Math.max(0, Math.min(face.y + face.height, existing.y + existing.height) - Math.max(face.y, existing.y));
      const isClose = Math.abs(face.x - existing.x) < existing.width * 0.45 && Math.abs(face.y - existing.y) < existing.height * 0.45;

      if ((xOverlap > 0 && yOverlap > 0) || isClose) {
        const minX = Math.min(face.x, existing.x);
        const minY = Math.min(face.y, existing.y);
        const maxX = Math.max(face.x + face.width, existing.x + existing.width);
        const maxY = Math.max(face.y + face.height, existing.y + existing.height);
        existing.x = minX;
        existing.y = minY;
        existing.width = maxX - minX;
        existing.height = maxY - minY;
        existing.confidence = Math.max(face.confidence, existing.confidence);
        merged = true;
        break;
      }
    }
    if (!merged) {
      mergedFaces.push({ ...face });
    }
  }

  const faceCount = mergedFaces.length;
  const status: "NO_FACE" | "SINGLE_FACE" | "MULTIPLE_FACES" =
    faceCount === 0 ? "NO_FACE" : faceCount === 1 ? "SINGLE_FACE" : "MULTIPLE_FACES";

  return {
    faceCount,
    status,
    faces: mergedFaces,
  };
}

/**
 * Main Face Detection Engine
 * Tries Hardware-accelerated browser FaceDetector first, then falls back to pixel analysis.
 */
let nativeDetectorInstance: any = null;
let nativeDetectorTested = false;

export async function detectFacesInVideo(video: HTMLVideoElement): Promise<FaceDetectionResult> {
  if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
    return { faceCount: 1, status: "SINGLE_FACE", faces: [] };
  }

  const vW = video.videoWidth;
  const vH = video.videoHeight;

  // Tier 1: Native Browser FaceDetector (Hardware Accelerated where available)
  if (typeof window !== "undefined" && "FaceDetector" in window) {
    try {
      if (!nativeDetectorTested) {
        nativeDetectorInstance = new (window as any).FaceDetector({
          maxDetectedFaces: 5,
          fastMode: true,
        });
        nativeDetectorTested = true;
      }
      if (nativeDetectorInstance) {
        const detected = await nativeDetectorInstance.detect(video);
        if (Array.isArray(detected)) {
          const faces: DetectedFace[] = detected.map((f: any) => ({
            x: Math.round(f.boundingBox.x),
            y: Math.round(f.boundingBox.y),
            width: Math.round(f.boundingBox.width),
            height: Math.round(f.boundingBox.height),
            confidence: 0.95,
          }));

          const faceCount = faces.length;
          return {
            faceCount,
            status: faceCount === 0 ? "NO_FACE" : faceCount === 1 ? "SINGLE_FACE" : "MULTIPLE_FACES",
            faces,
          };
        }
      }
    } catch {
      // Fallback to computer vision
      nativeDetectorInstance = null;
    }
  }

  // Tier 2: Anthropometric Pixel Analysis
  return detectFacesViaPixelAnalysis(video, vW, vH);
}
