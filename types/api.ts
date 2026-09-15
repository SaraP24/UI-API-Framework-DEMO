/** Tipos compartidos para API clients */
export interface APIResponse<T = unknown> {
  status: number;
  body: T;
  headers?: Record<string, string>;
}

export interface IRequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
  timeoutMs?: number;
}

export interface IUser {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IPet {
  id?: number;
  name: string;
  status?: string;
}

export interface IOrder {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: string;
}
