import { API_ENDPOINTS } from '../constants/config';

export class ApiError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export async function sendOrder(message: string): Promise<void> {
  const response = await fetch(API_ENDPOINTS.order, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new ApiError('Failed to send order', response.status);
  }
}
