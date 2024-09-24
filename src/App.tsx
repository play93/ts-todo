import { useEffect, useState } from "react";
import "./App.css";
import { getTodos, type Todo } from "./test";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    getTodos().then((data) => setTodoList(data));
  }, []);

  const [title, setTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleAddTodo = async () => {
    if (title === "") {
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    await fetch("http://localhost:4000/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });

    setTodoList((prev) => [...prev, newTodo]);
    setTitle("");
  };

  const handleDeleteTodo = async (id: Todo["id"]) => {
    await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });

    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <TodoList todoList={todoList} onDeleteClick={handleDeleteTodo} />
      <input type="text" value={title} onChange={handleTitleChange} />
      <button onClick={handleAddTodo}>등록</button>
    </>
  );
}

type TodoListProps = {
  todoList: Todo[];
  onDeleteClick: (id: Todo["id"]) => void;
};
function TodoList({ todoList, onDeleteClick }: TodoListProps) {
  return (
    <div>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} {...todo} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
}

type TodoItemProps = Todo & { onDeleteClick: (id: Todo["id"]) => void };
function TodoItem({ id, title, completed, onDeleteClick }: TodoItemProps) {
  return (
    <>
      <div>
        <div>id: {id}</div>
        <div>title: {title}</div>
        <div>completed: {`${completed}`}</div>
        <button onClick={() => onDeleteClick(id)}>삭제</button>
      </div>
      ---
    </>
  );
}

export default App;
