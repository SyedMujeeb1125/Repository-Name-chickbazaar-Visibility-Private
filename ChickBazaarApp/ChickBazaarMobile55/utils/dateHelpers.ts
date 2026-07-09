export function formatFullDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getTodayDate(): Date {
  return new Date();
}

export function getTomorrowDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

export function getRelativeDay(date: Date): string {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);

  const diff =
    Math.floor(
      (compare.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    );

  if (diff === 0) return "Today";

  if (diff === 1) return "Tomorrow";

  if (diff > 1)
    return `In ${diff} Days`;

  if (diff === -1)
    return "Yesterday";

  return formatFullDate(date);
}

export function getDeliveryHeader(
  date: Date
) {
  return {
    relativeDay: getRelativeDay(date),

    weekday: date.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
      }
    ),

    formattedDate:
      date.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
  };
}