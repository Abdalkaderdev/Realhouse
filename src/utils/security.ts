// ═══════════════════════════════════════════════════════════════════════════
// Security Utilities - CSRF Protection & Input Sanitization
// Real House - Protecting user data and preventing attacks
// ═══════════════════════════════════════════════════════════════════════════

// ─── CSRF Token Management ──────────────────────────────────────────────────

const CSRF_TOKEN_KEY = 'realhouse_csrf_token';
const CSRF_TOKEN_EXPIRY_KEY = 'realhouse_csrf_expiry';
const TOKEN_VALIDITY_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Generate a cryptographically secure random token
 */
function generateRandomToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Get or create a CSRF token for form submissions
 */
export function getCSRFToken(): string {
  try {
    const existingToken = sessionStorage.getItem(CSRF_TOKEN_KEY);
    const expiry = sessionStorage.getItem(CSRF_TOKEN_EXPIRY_KEY);

    // Check if token exists and is not expired
    if (existingToken && expiry && Date.now() < parseInt(expiry, 10)) {
      return existingToken;
    }

    // Generate new token
    const newToken = generateRandomToken();
    const newExpiry = Date.now() + TOKEN_VALIDITY_MS;

    sessionStorage.setItem(CSRF_TOKEN_KEY, newToken);
    sessionStorage.setItem(CSRF_TOKEN_EXPIRY_KEY, newExpiry.toString());

    return newToken;
  } catch {
    // Fallback for private browsing or storage issues
    return generateRandomToken();
  }
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  try {
    const storedToken = sessionStorage.getItem(CSRF_TOKEN_KEY);
    const expiry = sessionStorage.getItem(CSRF_TOKEN_EXPIRY_KEY);

    if (!storedToken || !expiry) {
      return false;
    }

    // Check expiry
    if (Date.now() > parseInt(expiry, 10)) {
      return false;
    }

    // Constant-time comparison to prevent timing attacks
    return constantTimeCompare(token, storedToken);
  } catch {
    return false;
  }
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Regenerate CSRF token (call after successful form submission)
 */
export function regenerateCSRFToken(): string {
  try {
    sessionStorage.removeItem(CSRF_TOKEN_KEY);
    sessionStorage.removeItem(CSRF_TOKEN_EXPIRY_KEY);
  } catch {
    // Ignore storage errors
  }
  return getCSRFToken();
}

// ─── Input Sanitization ─────────────────────────────────────────────────────

/**
 * HTML entities that need escaping
 */
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHTML(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }
  return str.replace(/[&<>"'`=/]/g, char => HTML_ENTITIES[char] || char);
}

/**
 * Sanitize user input - removes dangerous characters and normalizes whitespace
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters (except newlines and tabs)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Trim
    .trim();
}

/**
 * Sanitize input for display (escapes HTML)
 */
export function sanitizeForDisplay(input: string): string {
  return escapeHTML(sanitizeInput(input));
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return '';
  }

  return email
    .toLowerCase()
    .trim()
    // Remove any characters that aren't valid in emails
    .replace(/[^\w.@+-]/g, '')
    // Limit length
    .slice(0, 254);
}

/**
 * Sanitize phone number input
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') {
    return '';
  }

  return phone
    .trim()
    // Only allow digits, spaces, dashes, plus, and parentheses
    .replace(/[^\d\s\-+()]/g, '')
    // Limit length
    .slice(0, 20);
}

/**
 * Sanitize name input
 */
export function sanitizeName(name: string): string {
  if (typeof name !== 'string') {
    return '';
  }

  return name
    .trim()
    // Allow letters, spaces, hyphens, apostrophes (for names like O'Brien)
    .replace(/[^\p{L}\p{M}\s\-']/gu, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Limit length
    .slice(0, 100);
}

/**
 * Sanitize message/textarea input
 */
export function sanitizeMessage(message: string): string {
  if (typeof message !== 'string') {
    return '';
  }

  return message
    // Remove null bytes and control chars (keep newlines)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Limit consecutive newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim
    .trim()
    // Limit length
    .slice(0, 5000);
}

/**
 * Validate and sanitize URL
 */
export function sanitizeURL(url: string): string {
  if (typeof url !== 'string') {
    return '';
  }

  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return '';
    }
    return parsed.href;
  } catch {
    return '';
  }
}

// ─── Form Data Sanitization ─────────────────────────────────────────────────

export interface SanitizedFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  [key: string]: string;
}

/**
 * Sanitize entire form data object
 */
export function sanitizeFormData(data: Record<string, string>): SanitizedFormData {
  const sanitized: SanitizedFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  for (const [key, value] of Object.entries(data)) {
    switch (key) {
      case 'name':
        sanitized.name = sanitizeName(value);
        break;
      case 'email':
        sanitized.email = sanitizeEmail(value);
        break;
      case 'phone':
        sanitized.phone = sanitizePhone(value);
        break;
      case 'message':
      case 'notes':
      case 'comment':
        sanitized.message = sanitizeMessage(value);
        break;
      default:
        // For unknown fields, apply basic sanitization
        sanitized[key] = sanitizeInput(value);
    }
  }

  return sanitized;
}

// ─── Secure Storage ─────────────────────────────────────────────────────────

/**
 * Safely store data in sessionStorage (not localStorage for PII)
 */
export function secureStore(key: string, data: unknown): boolean {
  try {
    // Use sessionStorage instead of localStorage for sensitive data
    sessionStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    // Storage full or private browsing
    return false;
  }
}

/**
 * Safely retrieve data from sessionStorage
 */
export function secureRetrieve<T>(key: string): T | null {
  try {
    const data = sessionStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

/**
 * Clear sensitive data from storage
 */
export function secureClear(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

// ─── Rate Limiting ──────────────────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if action is rate limited
 * @param key Unique identifier for the action (e.g., 'form_submit')
 * @param maxAttempts Maximum attempts allowed
 * @param windowMs Time window in milliseconds
 */
export function isRateLimited(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // First attempt or window expired
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxAttempts) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Reset rate limit for a key
 */
export function resetRateLimit(key: string): void {
  rateLimitMap.delete(key);
}
