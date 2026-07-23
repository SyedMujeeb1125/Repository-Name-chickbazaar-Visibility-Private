export const API = {
  BASE_URL: "https://www.chickbazaar.com/api",

  AUTH: {
    LOGIN: "/mobile/login",
    REGISTER: "/mobile/register-retailer",
  },

  PROFILE: {
    GET: "/mobile/profile",
    UPDATE: "/mobile/profile",
    UPDATE_SHOP: "/mobile/shop",
  },

  DASHBOARD: {
    GET: "/mobile/dashboard",
  },

  SHOPS: {
    LIST: "/mobile/shops",
    ADD: "/mobile/add-shop",
    UPDATE: "/mobile/update-shop",
    DELETE: "/mobile/delete-shop",
  },

  ADDRESS: {
    LIST: "/mobile/addresses",
    ADD: "/mobile/add-address",
    UPDATE: "/mobile/update-address",
    DELETE: "/mobile/delete-address",
  },

  ORDERS: {
    PLACE: "/orders",
    REVIEW: "/orders/review",
    PAYMENT: "/orders/payment",
    HISTORY: "/orders/history",
  },

  NOTIFICATIONS: {
    LIST: "/mobile/notifications",
  },
};

export const apiUrl = (path: string) => `${API.BASE_URL}${path}`;