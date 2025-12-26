import type { VercelRequest, VercelResponse } from '@vercel/node';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const RATE_LIMIT = 5; // Max requests
const RATE_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_FILE = join(process.cwd(), '.vercel/cache/rate-limits.json');

// Ensure cache directory exists
try {
  mkdirSync(join(process.cwd(), '.vercel/cache'), { recursive: true });
} catch (e) {
  // Directory might already exist
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

interface RateLimitData {
  [key: string]: RateLimitRecord;
}

function loadRateLimits(): RateLimitData {
  try {
    if (existsSync(RATE_LIMIT_FILE)) {
      const data = readFileSync(RATE_LIMIT_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('[RATE LIMIT] Error loading rate limits:', error);
  }
  return {};
}

function saveRateLimits(data: RateLimitData): void {
  try {
    writeFileSync(RATE_LIMIT_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('[RATE LIMIT] Error saving rate limits:', error);
  }
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const rateLimits = loadRateLimits();
  const record = rateLimits[identifier];

  console.log(`[RATE LIMIT] IP: ${identifier}, Record:`, record);

  if (!record || now > record.resetTime) {
    // New window - start with count of 1
    rateLimits[identifier] = { count: 1, resetTime: now + RATE_WINDOW };
    saveRateLimits(rateLimits);
    console.log(`[RATE LIMIT] New window created, count: 1`);
    return true;
  }

  // Increment FIRST to prevent race conditions
  record.count++;
  console.log(`[RATE LIMIT] Incremented count to: ${record.count}, limit: ${RATE_LIMIT}`);

  // Check if we've exceeded the limit
  if (record.count > RATE_LIMIT) {
    console.log(`[RATE LIMIT] ❌ BLOCKED - exceeded limit`);
    return false;
  }

  // Save updated count
  rateLimits[identifier] = record;
  saveRateLimits(rateLimits);
  console.log(`[RATE LIMIT] ✓ ALLOWED`);
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting by IP
  const clientIP = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                   (req.headers['x-real-ip'] as string) ||
                   'unknown';

  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Validate message length (prevent massive messages)
  if (message.length > 4000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // Test mode: skip Telegram if TEST_MODE is set
  const TEST_MODE = process.env.TEST_MODE === 'true';

  if (TEST_MODE) {
    console.log(`[TEST MODE] Would send message: ${message.substring(0, 50)}...`);
    return res.status(200).json({ success: true, testMode: true });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing Telegram credentials');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Telegram API error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
