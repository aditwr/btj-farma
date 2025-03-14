/* eslint-disable @typescript-eslint/no-explicit-any */
export type ServerRequestResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  error?: unknown;
};

export type APIRequestResponse = {
  status?: number;
  success?: boolean;
  message: string;
  data?: any;
  error?: any;
};

export type NotificationType = "success" | "info" | "warning" | "error";
