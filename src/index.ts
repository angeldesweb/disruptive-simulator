import "dotenv/config";
import { http } from "./http";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

http.listen({ port, host });
http.on("listening", () => {
  console.log(`[api]: Service running on http://${host}:${port}`);
});
http.on("error", (err) => {
  console.log(`[api]: ${err}`);
});
