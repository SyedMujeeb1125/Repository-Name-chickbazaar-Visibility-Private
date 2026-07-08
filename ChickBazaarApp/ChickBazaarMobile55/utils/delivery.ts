export function getDeliveryStatus(date = new Date()) {
  const hour = date.getHours();

  // Before 9 AM
  if (hour < 9) {
    return {
      isSameDay: true,
      title: "Guaranteed Same-Day Delivery",
      subtitle:
        "Healthy live broiler chicken delivered today. Place your order before 9:00 AM.",
      buttonText: "PLACE TODAY'S ORDER",
      showSameDayRequest: false,
    };
  }

  return {
    isSameDay: false,
    title: "Guaranteed Next-Day Delivery",
    subtitle:
      "Healthy live broiler chicken delivered tomorrow.",
    buttonText: "PLACE TOMORROW'S ORDER",
    showSameDayRequest: true,
  };
}