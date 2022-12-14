import { z } from "zod";
import { router, procedure } from "@/utils/trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z
        .object({
          text: z.string(),
        })
        .nullish()
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
