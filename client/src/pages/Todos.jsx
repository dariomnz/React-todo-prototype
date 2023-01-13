import { useState } from "react";
import { useQuery } from "react-query";
import Todo from "../components/Todo";
import FormTodo from "../components/Formtodo";

async function fetchTodos() {
  const res = await fetch("http://localhost:8080/api/todos", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  return json;
}

function Todos() {
  const [isForm, setIsForm] = useState(false);
  const { isSuccess, data } = useQuery("todos", fetchTodos);
  return (
    <>
      <div className="w-full text-right">
        <button
          className="px-4 py-2 m-4 font-bold text-white bg-green-500 rounded hover:bg-green-700"
          onClick={() => {
            setIsForm(true);
          }}
        >
          New todo
        </button>
      </div>
      <div className="max-w-xl m-auto text-center App">
        <div className="container flex flex-wrap gap-10 place-content-center">
          {isSuccess
            ? data.map((todo_data) => {
                return <Todo key={todo_data._id} todoData={todo_data} />;
              })
            : "Loading..."}
        </div>
      </div>
      <FormTodo isForm={isForm} setIsForm={setIsForm} />
    </>
  );
}

export default Todos;
