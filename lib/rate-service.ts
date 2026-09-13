import { supabase } from "@/lib/supabase";

const BUSINESS_TIMEZONE = "Asia/Kolkata";

function getIstDateParts(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return {
    year: values.year,
    month: values.month,
    day: values.day,
  };
}

function formatDateParts(
  year: string,
  month: string,
  day: string
): string {
  return `${year}-${month}-${day}`;
}

export function getBusinessDateString(
  date: Date = new Date()
): string {
  const { year, month, day } = getIstDateParts(date);

  return formatDateParts(year, month, day);
}

export function getTomorrowBusinessDateString(
  date: Date = new Date()
): string {
  const istDate = getBusinessDateString(date);

  const next = new Date(`${istDate}T12:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);

  return next.toISOString().slice(0, 10);
}

async function getRateByDateColumn(
  column: "effective_date" | "rate_date",
  date: string
) {
  const { data, error } = await supabase
    .from("daily_rates")
    .select("*")
    .eq(column, date)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  return { data, error };
}

/**
 * Get the rate for a specific business date.
 *
 * Production currently uses effective_date.
 * The rate_date fallback keeps this compatible with the
 * production-foundation schema if the database is migrated
 * to that column later.
 */
export async function getRateForDate(
  date: string
) {
  const primary = await getRateByDateColumn(
    "effective_date",
    date
  );

  if (!primary.error) {
    return primary.data;
  }

  const fallback = await getRateByDateColumn(
    "rate_date",
    date
  );

  if (fallback.error) {
    console.error(
      "[RATE_SERVICE][DATE]",
      fallback.error
    );

    return null;
  }

  return fallback.data;
}

/**
 * Today's retailer/business rate.
 */
export async function getTodayRate(
  date: Date = new Date()
) {
  return getRateForDate(
    getBusinessDateString(date)
  );
}


export async function getPreviousPublishedRate(
  date: Date = new Date()
) {
  const today = getBusinessDateString(date);

  const primary = await supabase
    .from("daily_rates")
    .select("*")
    .lt("effective_date", today)
    .order("effective_date", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (!primary.error) {
    return primary.data;
  }

  const fallback = await supabase
    .from("daily_rates")
    .select("*")
    .lt("rate_date", today)
    .order("rate_date", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (fallback.error) {
    console.error(
      "[RATE_SERVICE][PREVIOUS]",
      fallback.error
    );

    return null;
  }

  return fallback.data;
}
export async function getYesterdayRate(
  date: Date = new Date()
) {
  const today = getBusinessDateString(date);
  const yesterday = new Date(`${today}T12:00:00Z`);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  return getRateForDate(
    yesterday.toISOString().slice(0, 10)
  );
}

/**
 * Tomorrow's staged rate.
 */
export async function getTomorrowRate(
  date: Date = new Date()
) {
  return getRateForDate(
    getTomorrowBusinessDateString(date)
  );
}

