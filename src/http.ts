import { createServer } from "node:http";
import { app } from "./app";

export const http = createServer(app);
