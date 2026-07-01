export type RepeatOrderSchedule = {
  frequency: "daily" | "weekly" | "monthly";
  start_date: string;
  end_date?: string | null;
  skip_sundays?: boolean;
};

export function calculateNextDelivery(
  order: RepeatOrderSchedule
): Date | null {
  const today = new Date();

  let current = new Date(order.start_date);

  if (current < today) {
    current = new Date(today);
  }

  const endDate = order.end_date
    ? new Date(order.end_date)
    : null;

  while (true) {
    if (endDate && current > endDate) {
      return null;
    }

    if (
      order.skip_sundays &&
      current.getDay() === 0
    ) {
      current.setDate(
        current.getDate() + 1
      );
      continue;
    }

    switch (order.frequency) {
      case "daily":
        return current;

      case "weekly":
        return current;

      case "monthly":
        return current;

      default:
        return current;
    }
  }
}

export function formatDeliveryDate(
  date: Date | null
) {
  if (!date) {
    return "Completed";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}