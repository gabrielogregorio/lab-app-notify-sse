const getUrlApi = (path: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};

export class ApiService {
  static async get(url: string, headers?: HeadersInit | undefined) {
    return fetch(getUrlApi(url), {
      method: "GET",
      headers,
    });
  }

  static async post(
    url: string,
    body?: string,
    headers?: HeadersInit | undefined
  ) {
    return fetch(getUrlApi(url), {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json", 
        ...headers,
      },
    });
  }
}
