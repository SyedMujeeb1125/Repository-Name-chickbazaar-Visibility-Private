import { apiUrl } from "../config/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
  } = options;

  const isFormData = body instanceof FormData;

  const response = await fetch(apiUrl(endpoint), {
    method,
    headers: {
      Accept: "application/json",
      ...(isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),
      ...headers,
    },
    body:
      body === undefined
        ? undefined
        : isFormData
        ? body
        : JSON.stringify(body),
  });

  let data: any;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid server response.");
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Request failed."
    );
  }

  return data as T;
}

const Api = {
  get<T>(endpoint: string) {
    return request<T>(endpoint);
  },

  post<T>(
    endpoint: string,
    body: any
  ) {
    return request<T>(endpoint, {
      method: "POST",
      body,
    });
  },

  put<T>(
    endpoint: string,
    body: any
  ) {
    return request<T>(endpoint, {
      method: "PUT",
      body,
    });
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, {
      method: "DELETE",
    });
  },
};

export default Api;