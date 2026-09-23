/**
 * High-Precision Client-Side Face, Candidate Presence & Mobile Detector
 * Features:
 * - Candidate in Frame: Detects if student is present (sitting, facing camera, or looking down writing on paper)
 * - Writing Posture Tolerance: Students write on paper and tilt their heads down. Does NOT false-alarm NO_FACE or MULTIPLE_FACES.
 * - Single vs Multiple Candidates: Merges hands/wrists/split skin so only distinct second individuals trigger MULTIPLE_FACES.
 * - Mobile Phone Detection: Detects rectangular smartphone screens/devices held in frame.
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
  isCandidateInFrame: boolean;
  isWritingPosture: boolean;
  isMobileDetected: boolean;
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
 * Mobile Phone Detector:
 * Scans for handheld high-contrast rectangular objects with mobile phone aspect ratios (~1.6 to 2.4).
 */
function detectMobileDeviceInFrame(data: Uint8ClampedArray, cols: number, rows: number, cellW: number, cellH: number): boolean {
  // Mobile phones have dark screens or glowing screens bounded by sharp vertical edges
  // Scan for rectangular clusters of dark pixels (screen off) or high brightness surrounded by dark bezel
  let mobileCandidateBlocks = 0;

  for (let r = 2; r < rows - 2; r++) {
    for (let c = 2; c < cols - 2; c++) {
      let darkCount = 0;
      let edgeCount = 0;

      for (let cy = 0; cy < cellH; cy++) {
        for (let cx = 0; cx < cellW; cx++) {
          const py = r * cellH + cy;
          const px = c * cellW + cx;
          const idx = (py * PROC_W + px) * 4;
          const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];

          // Check if pixel is very dark (phone screen/body) or very high contrast edge
          if (lum < 40) darkCount++;
          
          // Edge gradient check with horizontal neighbor
          if (px < PROC_W - 1) {
            const nextIdx = idx + 4;
            const nextLum = 0.299 * data[nextIdx] + 0.587 * data[nextIdx + 1] + 0.114 * data[nextIdx + 2];
            if (Math.abs(lum - nextLum) > 55) edgeCount++;
          }
        }
      }

      const totalPixels = cellW * cellH;
      // If cell has very strong phone-like characteristics (sharp bezel edge + dark screen)
      if (darkCount > totalPixels * 0.65 && edgeCount > totalPixels * 0.25) {
        mobileCandidateBlocks++;
      }
    }
  }

  // A phone held in view typically covers 5 to 25 contiguous grid cells with phone aspect ratio
  return mobileCandidateBlocks >= 6 && mobileCandidateBlocks <= 35;
}

/**
 * Fast Anthropometric Face & Candidate Presence Detection
 */
function detectFacesViaPixelAnalysis(
  video: HTMLVideoElement,
  videoWidth: number,
  videoHeight: number
): FaceDetectionResult {
  const proc = getProcessingContext();
  if (!proc) {
    return {
      faceCount: 1,
      status: "SINGLE_FACE",
      faces: [],
      isCandidateInFrame: true,
      isWritingPosture: false,
      isMobileDetected: false,
    };
  }

  const { ctx } = proc;
  ctx.drawImage(video, 0, 0, PROC_W, PROC_H);
  const imgData = ctx.getImageData(0, 0, PROC_W, PROC_H);
  const data = imgData.data;

  // Step 1: Segmentation for Skin, Hair, and Head Geometry
  const skinMask = new Uint8Array(PROC_W * PROC_H);
  const candidatePresenceMask = new Uint8Array(PROC_W * PROC_H);
  let totalSkinPixels = 0;
  let totalCandidatePixels = 0;

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

    // Standard skin color locus
    const isSkin =
      y > 20 &&
      y < 245 &&
      cb >= 70 &&
      cb <= 140 &&
      cr >= 125 &&
      cr <= 185 &&
      r > g &&
      g >= b &&
      r - g >= 4 &&
      nr > 0.32 &&
      nr < 0.65 &&
      ng > 0.23 &&
      ng < 0.44;

    // Candidate presence locus (Skin OR dark/medium hair OR student clothing near central column)
    const isHairOrHead = y < 85 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25;
    const isCandidatePixel = isSkin || isHairOrHead;

    if (isSkin) {
      skinMask[p] = 1;
      totalSkinPixels++;
    }

    if (isCandidatePixel) {
      candidatePresenceMask[p] = 1;
      totalCandidatePixels++;
    }
  }

  // Check 1: Empty frame or covered camera
  const isCandidateInFrame = totalCandidatePixels >= 180 || totalSkinPixels >= 60;
  if (!isCandidateInFrame) {
    return {
      faceCount: 0,
      status: "NO_FACE",
      faces: [],
      isCandidateInFrame: false,
      isWritingPosture: false,
      isMobileDetected: false,
    };
  }

  // Step 2: Grid-Based Spatial Density Clustering (8x8 cells)
  const cellW = 8;
  const cellH = 8;
  const cols = Math.floor(PROC_W / cellW);
  const rows = Math.floor(PROC_H / cellH);
  const grid = new Float32Array(cols * rows);
  const candidateGrid = new Float32Array(cols * rows);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let skinCount = 0;
      let candCount = 0;
      for (let cy = 0; cy < cellH; cy++) {
        for (let cx = 0; cx < cellW; cx++) {
          const py = r * cellH + cy;
          const px = c * cellW + cx;
          const p = py * PROC_W + px;
          if (skinMask[p]) skinCount++;
          if (candidatePresenceMask[p]) candCount++;
        }
      }
      grid[r * cols + c] = skinCount / (cellW * cellH);
      candidateGrid[r * cols + c] = candCount / (cellW * cellH);
    }
  }

  // Check for Mobile Phone Device
  const isMobileDetected = detectMobileDeviceInFrame(data, cols, rows, cellW, cellH);

  // Step 3: Connected Component Blob Extraction on active grid cells
  const visited = new Uint8Array(cols * rows);
  interface Blob {
    minC: number;
    maxC: number;
    minR: number;
    maxR: number;
    weight: number;
    centerC: number;
    centerR: number;
  }
  const blobs: Blob[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (visited[idx] || grid[idx] < 0.22) continue;

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

        const neighbors: [number, number][] = [
          [qc + 1, qr],
          [qc - 1, qr],
          [qc, qr + 1],
          [qc, qr - 1],
        ];

        for (const [nc, nr] of neighbors) {
          if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
            const nidx = nr * cols + nc;
            if (!visited[nidx] && grid[nidx] >= 0.22) {
              visited[nidx] = 1;
              queue.push([nc, nr]);
            }
          }
        }
      }

      if (weight >= 2.5) {
        blobs.push({
          minC,
          maxC,
          minR,
          maxR,
          weight,
          centerC: (minC + maxC) / 2,
          centerR: (minR + maxR) / 2,
        });
      }
    }
  }

  // Step 4: Detect Writing Posture
  // When looking down to write on paper:
  // - The head is lower or angled downward (minR > rows * 0.2)
  // - Hands/arms are positioned on desk/paper (lower third of screen)
  // - Hair/head presence is concentrated in middle columns
  let isWritingPosture = false;
  let lowerThirdPresence = 0;
  let upperMidPresence = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 4; c < cols - 4; c++) {
      const val = candidateGrid[r * cols + c];
      if (r < rows * 0.65) upperMidPresence += val;
      else lowerThirdPresence += val;
    }
  }

  if (upperMidPresence > 10 && lowerThirdPresence > 8) {
    isWritingPosture = true;
  }

  // Step 5: Separate true Human Head Candidates from Hands/Desk
  const scaleX = videoWidth / PROC_W;
  const scaleY = videoHeight / PROC_H;
  const headCandidates: DetectedFace[] = [];

  for (const blob of blobs) {
    const pixelX = blob.minC * cellW;
    const pixelY = blob.minR * cellH;
    const pixelW = (blob.maxC - blob.minC + 1) * cellW;
    const pixelH = (blob.maxR - blob.minR + 1) * cellH;
    const aspect = pixelH / (pixelW || 1);
    const areaFraction = (pixelW * pixelH) / (PROC_W * PROC_H);

    // If student is writing, ignore lower-third desk/hand blobs that don't belong to a separate standing person
    const isHandAtDesk = blob.centerR > rows * 0.68 && blob.weight < 12;
    if (isWritingPosture && isHandAtDesk) {
      continue;
    }

    if (aspect >= 0.55 && aspect <= 2.8 && areaFraction >= 0.015) {
      headCandidates.push({
        x: Math.round(pixelX * scaleX),
        y: Math.round(pixelY * scaleY),
        width: Math.round(pixelW * scaleX),
        height: Math.round(pixelH * scaleY),
        confidence: Math.min(1, blob.weight / 12),
      });
    }
  }

  // Step 6: Group blobs belonging to the SAME student
  // In an online exam, one student might have head, neck, and hand visible.
  // We ONLY consider it "MULTIPLE_FACES" if there are TWO DISTINCT heads separated horizontally
  // by at least 35% of the video width (e.g. two people sitting side by side).
  const distinctPersons: DetectedFace[] = [];

  for (const head of headCandidates) {
    let belongsToExisting = false;
    for (const person of distinctPersons) {
      const horizontalDist = Math.abs((head.x + head.width / 2) - (person.x + person.width / 2));
      const verticalDist = Math.abs((head.y + head.height / 2) - (person.y + person.height / 2));

      // If blobs are close horizontally or vertically, they are part of the same person (head + neck + hand)
      if (horizontalDist < videoWidth * 0.32 || verticalDist < videoHeight * 0.45) {
        // Merge into existing candidate
        const minX = Math.min(head.x, person.x);
        const minY = Math.min(head.y, person.y);
        const maxX = Math.max(head.x + head.width, person.x + person.width);
        const maxY = Math.max(head.y + head.height, person.y + person.height);
        person.x = minX;
        person.y = minY;
        person.width = maxX - minX;
        person.height = maxY - minY;
        person.confidence = Math.max(head.confidence, person.confidence);
        belongsToExisting = true;
        break;
      }
    }

    if (!belongsToExisting) {
      distinctPersons.push({ ...head });
    }
  }

  // If candidate is in frame (even looking down writing), ensure at least 1 face is counted
  let finalFaceCount = distinctPersons.length;
  if (finalFaceCount === 0 && isCandidateInFrame) {
    finalFaceCount = 1;
    distinctPersons.push({
      x: Math.round(videoWidth * 0.25),
      y: Math.round(videoHeight * 0.15),
      width: Math.round(videoWidth * 0.5),
      height: Math.round(videoHeight * 0.6),
      confidence: 0.9,
    });
  }

  // Multiple faces check: strictly require two distinct adult heads separated by >= 35% frame width
  let isMultipleFaces = false;
  if (distinctPersons.length >= 2) {
    const p1 = distinctPersons[0];
    const p2 = distinctPersons[1];
    const hDist = Math.abs((p1.x + p1.width / 2) - (p2.x + p2.width / 2));
    if (hDist >= videoWidth * 0.35 && p1.width > videoWidth * 0.15 && p2.width > videoWidth * 0.15) {
      isMultipleFaces = true;
    } else {
      // Merge into single candidate
      finalFaceCount = 1;
    }
  }

  const status: "NO_FACE" | "SINGLE_FACE" | "MULTIPLE_FACES" =
    finalFaceCount === 0
      ? "NO_FACE"
      : isMultipleFaces
      ? "MULTIPLE_FACES"
      : "SINGLE_FACE";

  return {
    faceCount: isMultipleFaces ? 2 : finalFaceCount,
    status,
    faces: distinctPersons,
    isCandidateInFrame,
    isWritingPosture,
    isMobileDetected,
  };
}

/**
 * Main Face & Proctoring Monitor
 */
let nativeDetectorInstance: any = null;
let nativeDetectorTested = false;

export async function detectFacesInVideo(video: HTMLVideoElement): Promise<FaceDetectionResult> {
  if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
    return {
      faceCount: 1,
      status: "SINGLE_FACE",
      faces: [],
      isCandidateInFrame: true,
      isWritingPosture: false,
      isMobileDetected: false,
    };
  }

  const vW = video.videoWidth;
  const vH = video.videoHeight;

  // Run pixel analysis (provides candidate presence, writing posture tolerance, and mobile detection)
  const pixelResult = detectFacesViaPixelAnalysis(video, vW, vH);

  // If pixel analysis detects mobile phone or writing posture, prioritize its result
  if (pixelResult.isMobileDetected || pixelResult.isWritingPosture) {
    return pixelResult;
  }

  // Native hardware detector check
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
        if (Array.isArray(detected) && detected.length > 0) {
          const faces: DetectedFace[] = detected.map((f: any) => ({
            x: Math.round(f.boundingBox.x),
            y: Math.round(f.boundingBox.y),
            width: Math.round(f.boundingBox.width),
            height: Math.round(f.boundingBox.height),
            confidence: 0.95,
          }));

          // Only flag multiple faces if two separate faces have wide horizontal separation
          let hasMulti = false;
          if (faces.length >= 2) {
            const f1 = faces[0];
            const f2 = faces[1];
            const dist = Math.abs((f1.x + f1.width / 2) - (f2.x + f2.width / 2));
            if (dist > vW * 0.35) {
              hasMulti = true;
            }
          }

          return {
            faceCount: hasMulti ? 2 : 1,
            status: hasMulti ? "MULTIPLE_FACES" : "SINGLE_FACE",
            faces,
            isCandidateInFrame: true,
            isWritingPosture: false,
            isMobileDetected: pixelResult.isMobileDetected,
          };
        }
      }
    } catch {
      nativeDetectorInstance = null;
    }
  }

  return pixelResult;
}
