import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import customConfig from "./config/default";

dotenv.config({
  path: path.join(__dirname, "./.env"),
});

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  sayHello: t.procedure.query(async () => {
    const message = "Hello World!";
    return { message };
  }),
});

export type AppRouter = typeof appRouter;

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: [customConfig.origin, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = customConfig.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
