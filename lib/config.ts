export const config = {
  isDevelopment:
    process.env.NODE_ENV === "development",

  bypassPayments:
    process.env.PAYMENT_MODE === "bypass",
};