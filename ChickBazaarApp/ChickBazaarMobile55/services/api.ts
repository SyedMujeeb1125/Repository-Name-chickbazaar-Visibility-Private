const API_BASE_URL =
  "https://www.chickbazaar.com/api/mobile";

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

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method,

      headers: {
        "Content-Type":
          "application/json",
        ...headers,
      },

      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    }
  );

  if (!response.ok) {

    const message =
      await response.text();

    throw new Error(
      message ||
      "Request failed."
    );

  }

  return response.json();

}

const Api = {

  get<T>(endpoint: string) {

    return request<T>(
      endpoint
    );

  },

  post<T>(
    endpoint: string,
    body: any
  ) {

    return request<T>(
      endpoint,
      {
        method: "POST",
        body,
      }
    );

  },

  put<T>(
    endpoint: string,
    body: any
  ) {

    return request<T>(
      endpoint,
      {
        method: "PUT",
        body,
      }
    );

  },

  delete<T>(
    endpoint: string
  ) {

    return request<T>(
      endpoint,
      {
        method: "DELETE",
      }
    );

  },

};

export default Api;