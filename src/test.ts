export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export async function getTodos() {
  const res = await fetch("http://localhost:4000/todos");
  const data: Todo[] = await res.json();

  return data;
}

getTodos().then(console.log);
