import { TRPCError, initTRPC } from "@trpc/server";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/backend/router";
import { createTRPCNext } from "@trpc/next";

const t = initTRPC.create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
});
