import type { APIRequestContext } from '@playwright/test';
import { env } from '@config/env';

export type Credentials = { email: string; password: string };

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(credentials: Credentials): Promise<string> {
    const response = await this.request.post(`${env.apiUrl}/users/login`, {
      data: credentials,
    });
    if (!response.ok()) {
      throw new Error(`Логин не удался: ${response.status()} ${await response.text()}`);
    }
    const body = await response.json();
    return body.access_token;
  }

  async register(user: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await this.request.post(`${env.apiUrl}/users/register`, { data: user });
    if (!response.ok()) {
      throw new Error(`Регистрация не удалась: ${response.status()} ${await response.text()}`);
    }
    return response.json();
  }
}