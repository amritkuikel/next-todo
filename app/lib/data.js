import { sql } from "@vercel/postgres";
import { TodoType } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchTodos(email) {
  noStore();
  try {
    const todos = await sql`
        SELECT * from todos WHERE email=${email}
        `;
    return todos;
  } catch (error) {
    console.error(error);
    throw new Error("fetching failed");
  }
}
