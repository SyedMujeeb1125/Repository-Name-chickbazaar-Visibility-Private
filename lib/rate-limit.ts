type RateLimitRecord = {
  count: number;
  expiresAt: number;
};

type RateLimitOptions = {
  key: string;
  action: string;
  maxRequests: number;
  windowMinutes: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
};

const store = new Map<string, RateLimitRecord>();

export async function checkRateLimit(
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const now = Date.now();

  const storageKey = `${options.action}:${options.key}`;

  const existing = store.get(storageKey);

  // First request or expired window
  if (!existing || existing.expiresAt <= now) {
    store.set(storageKey, {
      count: 1,
      expiresAt: now + options.windowMinutes * 60 * 1000,
    });

    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      retryAfter: 0,
    };
  }

  // Limit exceeded
  if (existing.count >= options.maxRequests) {
    const retryAfter = Math.ceil((existing.expiresAt - now) / 1000);

    console.warn(
      `[RateLimit] Blocked ${options.action} for ${options.key}`
    );

    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    };
  }

  existing.count++;

  store.set(storageKey, existing);

  return {
    allowed: true,
    remaining: options.maxRequests - existing.count,
    retryAfter: 0,
  };
}

/**
 * Cleanup expired entries every 10 minutes
 * Prevents the in-memory Map from growing indefinitely.
 */
setInterval(() => {
  const now = Date.now();

  for (const [key, value] of store.entries()) {
    if (value.expiresAt <= now) {
      store.delete(key);
    }
  }
}, 10 * 60 * 1000);