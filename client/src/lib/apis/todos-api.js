import { PUBLIC_API_URL } from "$env/static/public";

const createTodo = async (name, done) => {
  const data = { name, done };

  const response = await fetch(`${PUBLIC_API_URL}/todos`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  return await response.json();
};

const readTodos = async () => {
  const response = await fetch(`${PUBLIC_API_URL}/todos`);
  return await response.json();
};

const readTodo = async (id) => {
  const response = await fetch(
    `${PUBLIC_API_URL}/todos/${id}`,
  );
  return await response.json();
};

export { createTodo, readTodos, readTodo };