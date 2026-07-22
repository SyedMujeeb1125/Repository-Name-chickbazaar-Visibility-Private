import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  RETAILER: "retailer",
};

class SessionService {
  async setAccessToken(token: string) {
    await AsyncStorage.setItem(
      STORAGE_KEYS.ACCESS_TOKEN,
      token
    );
  }

  async getAccessToken() {
    return AsyncStorage.getItem(
      STORAGE_KEYS.ACCESS_TOKEN
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(
      STORAGE_KEYS.ACCESS_TOKEN
    );
  }

  async setRetailer(data: unknown) {
    await AsyncStorage.setItem(
      STORAGE_KEYS.RETAILER,
      JSON.stringify(data)
    );
  }

  async getRetailer<T>() {
  const value = await AsyncStorage.getItem(
    STORAGE_KEYS.RETAILER
  );

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    await AsyncStorage.removeItem(
      STORAGE_KEYS.RETAILER
    );
    return null;
  }
}

  async removeRetailer() {
    await AsyncStorage.removeItem(
      STORAGE_KEYS.RETAILER
    );
  }

  async clearSession() {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.RETAILER,
    ]);
  }

  async isLoggedIn() {
    const token =
      await this.getAccessToken();

    return !!token;
  }
}

export default new SessionService();