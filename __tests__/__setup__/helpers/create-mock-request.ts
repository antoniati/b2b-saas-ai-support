import { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { AppRouteHandlerFnContext } from "@/features/tenants/types/tenants-types";

interface MockNextRequestOptions {
  pathname?: string;
  hostname?: string;
  auth?: any;
  url?: string;
  headers?: Record<string, string>;
  cookies?: Record<string, string>;
  params?: Record<string, string | string[]>;
  method?: string; // novo
}

export function createMockRequestAndContext(
  options: MockNextRequestOptions = {},
): [NextRequest, AppRouteHandlerFnContext] {
  const {
    pathname = "/",
    hostname = "localhost",
    auth = null,
    url = `http://${hostname}${pathname}`,
    headers = {},
    cookies = {},
    params = {},
    method = "GET", // default GET
  } = options;

  const nextUrl = new NextURL(url, { nextConfig: { basePath: "" } } as any);

  const req = {
    auth,
    nextUrl,
    url,
    method, // adiciona o method
    headers,
    cookies: {
      get: (key: string) => ({ value: cookies[key] }),
      set: jest.fn(),
      delete: jest.fn(),
    },
    clone: jest.fn(),
  } as unknown as NextRequest;

  const ctx: AppRouteHandlerFnContext = { params };

  return [req, ctx];
}
