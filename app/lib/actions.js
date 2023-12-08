"use server";
import { sql } from "@vercel/postgres";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function saveTodo(formData) {
  const todoVal = formData.get("todo");
  const user =await currentUser();
  const email = user?.emailAddresses[0].emailAddress
  await sql`
        INSERT INTO todos (email,todo) VALUES(${email},${todoVal})
        `;
  revalidatePath('/dashboard')
}

export async function deleteTodo() {
  const todoVal = formData.get("todo");
  console.log(todoVal)
  const user =await currentUser();
  const email = user?.emailAddresses[0].emailAddress
  await sql`
        INSERT INTO todos (email,todo) VALUES(${email},${todoVal})
        `;
  revalidatePath('/dashboard')
}
