import { Elysia } from "elysia";
import UsersModule from "./modules/users/users.module";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(UsersModule)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
