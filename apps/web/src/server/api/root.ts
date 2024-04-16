import { createCallerFactory, router } from "@/server/api/trpc";
import { userRouter } from "./routers/userRouter";
import { emailRouter } from "./routers/emailRouter";
import { codeRunRouter } from "./routers/codeRun";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  user: userRouter,
  email: emailRouter,
  code: codeRunRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
