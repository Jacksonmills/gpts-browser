import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { gpts } from "@/server/db/schema";

export const gptRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      url: z.string().min(1),
      name: z.string().min(1),
      description: z.string().min(1),
      creator: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(gpts).values({
        url: input.url,
        name: input.name,
        description: input.description,
        creator: input.creator,
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.gpts.findMany();
  }),
});
