/* eslint-disable @typescript-eslint/no-explicit-any */
export type ServerRequestResponse = {
  success: boolean;
  message: string;
  data?: unknown;
  error?: unknown;
};

export type APIRequestResponse = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};
