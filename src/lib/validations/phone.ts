import { z } from "zod";

/**
 * Mobile Number Rules:
 * - Exactly 10 digits
 * - Cannot start with 0
 * - Regex: ^[1-9]\d{9}$
 */
export const PHONE_10_DIGIT_REGEX = /^[1-9]\d{9}$/;

export const isValid10DigitPhone = (val?: string | null): boolean => {
  if (!val) return false;
  const clean = val.replace(/\D/g, "");
  return PHONE_10_DIGIT_REGEX.test(clean);
};

export const sanitize10DigitPhone = (val: string): string => {
  if (!val) return "";
  let clean = val.replace(/\D/g, "");
  if (clean.startsWith("0")) {
    clean = clean.replace(/^0+/, "");
  }
  return clean.slice(0, 10);
};

export const phone10DigitSchema = z
  .string()
  .trim()
  .transform((val) => val.replace(/\D/g, ""))
  .refine(
    (val) => PHONE_10_DIGIT_REGEX.test(val),
    "Mobile number must be exactly 10 digits and cannot start with 0."
  );

export const optionalPhone10DigitSchema = z
  .string()
  .trim()
  .optional()
  .transform((val) => (val ? val.replace(/\D/g, "") : ""))
  .refine(
    (val) => !val || val === "" || PHONE_10_DIGIT_REGEX.test(val),
    "Mobile number must be exactly 10 digits and cannot start with 0."
  );

/**
 * Email Rules:
 * - Must end with @mantif.edu, @acuity.edu, or @gmail.com
 * - Regex: ^[a-zA-Z0-9._%+-]+@(mantif\.edu|acuity\.edu|gmail\.com)$
 */
export const EMAIL_DOMAIN_REGEX = /^[a-zA-Z0-9._%+-]+@(mantif\.edu|mantif\.com|acuity\.edu|gmail\.com)$/i;

export const isValidAcuityOrGmail = (email?: string | null): boolean => {
  if (!email) return false;
  return EMAIL_DOMAIN_REGEX.test(email.trim());
};

export const emailDomainSchema = z
  .string()
  .trim()
  .email("Invalid email format")
  .refine(
    (val) => isValidAcuityOrGmail(val),
    "Email address must end with @mantif.com, @mantif.edu, @acuity.edu, or @gmail.com."
  );

/**
 * Strict Student Email Validation:
 * Must end with @mantif.com
 */
export const STUDENT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@mantif\.com$/i;

export const isValidStudentEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return STUDENT_EMAIL_REGEX.test(email.trim().toLowerCase());
};

export const ensureStudentEmail = (val: string): string => {
  const clean = (val || "").trim().toLowerCase();
  if (!clean) return "";
  if (clean.endsWith("@mantif.com")) return clean;
  if (clean.includes("@")) {
    const [prefix] = clean.split("@");
    return `${prefix.trim()}@mantif.com`;
  }
  return `${clean}@mantif.com`;
};

export const isValidGeneralEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
