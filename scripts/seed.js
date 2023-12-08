const {sql}  =require("@vercel/postgres");
const todoData = require("../app/lib/placeholder-data.js")

async function todos() {
    try {
        await sql`
       CREATE TABLE IF NOT EXISTS todos(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL,
        todo TEXT NOT NULL
       );
       `
        await Promise.all(
            todoData.todo.map((user)=>{
                return sql`
                    INSERT INTO todos (email,todo)
                    VALUES (${user.email},${user.todo});
                `
            })
        )
    } catch (error) {
        console.error('Error seeding users', error);
        throw error;
    }
}
todos()
