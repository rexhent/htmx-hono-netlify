import { handle } from "https://deno.land/x/hono@v3.12.8/adapter/netlify/mod.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.8/mod.ts";
import { cors } from "https://deno.land/x/hono/middleware.ts";

interface User {
  name: string;
}

const app = new Hono();

app.use("/*", cors());

app.get("/users", async (c: { html: (arg0: string) => any }) => {
  const response: Response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const users: User[] = await response.json();

  return c.html(`
    <h1 class="text-2xl font-bold my-4">Users</h1>
      <ul>
        ${users
          .map((user: { name: string }) => `<li>${user.name}</li>`)
          .join("")}
      </ul>
  `);
});

export default handle(app);
