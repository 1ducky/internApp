// lib/rate-limit.ts
import { unstable_cache } from "next/cache";

const LIMIT = 10;       // max request
const WINDOW = 60;      // detik (TTL cache = window)

type RateLimitData = {
  count: number;
  firstRequestAt: number;
};

function getRateLimitData(userId: string) {
  return unstable_cache(
    async (): Promise<RateLimitData> => ({
      count: 0,
      firstRequestAt: Date.now(),
    }),
    [`rate-limit-${userId}`],     // cache key unik per user
    {
      revalidate: WINDOW,         // TTL otomatis reset setelah WINDOW detik
      tags: [`rate-limit-${userId}`],
    }
  )();
}

export async function checkRateLimit(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetIn: number;
}> {
  const data = await getRateLimitData(userId);
  const now = Date.now();
  const elapsed = (now - data.firstRequestAt) / 1000;

  // Jika TTL belum habis dan limit tercapai → blokir
  if (elapsed < WINDOW && data.count >= LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil(WINDOW - elapsed),
    };
  }

  // Update count (TTL akan auto-reset oleh revalidate)
  data.count += 1;

  return {
    allowed: true,
    remaining: LIMIT - data.count,
    resetIn: Math.ceil(WINDOW - elapsed),
  };
}