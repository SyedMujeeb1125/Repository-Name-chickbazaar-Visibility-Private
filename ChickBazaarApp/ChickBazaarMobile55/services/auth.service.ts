import { API } from "../config/api";
import Api from "./api";
import SessionService from "./session";

export interface Retailer {
  id?: string;
  shopName?: string;
  ownerName?: string;
  mobile: string;
  email?: string;
  address?: string;
}

export interface LoginRequest {
  mobile: string;
}

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  retailer: Retailer;
}

class AuthService {
  async login(
    payload: LoginRequest
  ): Promise<LoginResponse> {
    const response =
      await Api.post<LoginResponse>(
        API.AUTH.LOGIN,
        payload
      );

    if (
  response.success &&
  response.accessToken &&
  response.retailer
) {
      await SessionService.setAccessToken(
        response.accessToken
      );

      await SessionService.setRetailer(
        response.retailer
      );
    }

    return response;
  }

  async logout() {
    await SessionService.clearSession();
  }

  async getRetailer() {
    return SessionService.getRetailer<Retailer>();
  }

  async getAccessToken() {
    return SessionService.getAccessToken();
  }

  async isLoggedIn() {
    return SessionService.isLoggedIn();
  }
}

export default new AuthService();