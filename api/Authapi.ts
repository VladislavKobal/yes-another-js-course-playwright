import { APIRequestContext, expect } from "@playwright/test";

const API_BASE_URL = "https://api.practicesoftwaretesting.com";

export interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export async function loginViaApi(
  request: APIRequestContext,
  credentials: Credentials,
): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/users/login`, {
    data: credentials,
  });

  expect(response.ok(), "API login request should return 2xx").toBeTruthy();

  const body = (await response.json()) as LoginResponse;
  expect(
    body.access_token,
    "API login response should contain a non-empty access_token",
  ).toBeTruthy();

  return body.access_token;
}
