import { UserButton, auth, currentUser } from "@clerk/nextjs";
import { fetchTodos } from "../lib/data.js";
import { saveTodo ,deleteTodo} from "../lib/actions.js";
export default async function Dashboard() {
  const { userId } = auth();
  const user = await currentUser();
  const todos = await fetchTodos(user?.emailAddresses[0].emailAddress);
  return (
    <div>
      <div>dashboard</div>
      <UserButton afterSignOutUrl="/" />
      <div>your-id: {userId}</div>
      <div>your-name: {user?.firstName}</div>
      <div>your-email: {user?.emailAddresses[0].emailAddress}</div>
      <form action={saveTodo}>
        <input
          type="text"
          name="todo"
          placeholder="task"
          className="border-4 border-black"
        />
        <button type="submit">addtodo</button>
      </form>

      {todos.rows.map((todoVal) => (
        <div key={todoVal.id}>
          {todoVal.todo} <form action="deleteTodo"><button>delete</button></form>  <button>update</button>
        </div>
      ))}
    </div>
  );
}
