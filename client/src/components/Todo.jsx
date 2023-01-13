import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ShowTodo from "../components/ShowTodo";

function Todo({ todoData }) {
  const queryClient = useQueryClient();
  const [isShow, setIsShow] = useState(false);

  function getDateString(date) {
    const new_date = new Date(date);
    return new_date.toLocaleString("es", { timeZone: "UTC" });
  }

  const { mutateAsync } = useMutation(
    (id) => {
      return fetch("http://localhost:8080/api/todo/" + id, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["todos"]),
    }
  );

  return (
    <>
      <div className="w-1/3 p-4 duration-200 border-2 border-white hover:scale-[1.20] rounded-xl place-self-start">
        <p className="mb-2 overflow-hidden text-lg break-words max-h-12">
          {todoData.name}
        </p>
        <p className="mb-2 overflow-hidden text-sm break-words max-h-12 text-slate-300">
          {todoData.content}
        </p>
        <p className="bottom-0 text-xs text-slate-400">
          {getDateString(todoData.date)}
        </p>
        <div className="flex justify-center">
          <button
            className="bottom-0 px-2 py-1 m-1 text-xs bg-green-700 rounded-lg hover:bg-green-800"
            onClick={() => setIsShow(true)}
          >
            Show
          </button>
          <button
            className="bottom-0 px-2 py-1 m-1 text-xs bg-red-700 rounded-lg hover:bg-red-800"
            onClick={async () => {
              await mutateAsync(todoData._id);
              console.log("Delete ", todoData._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <ShowTodo isShow={isShow} setIsShow={setIsShow} todoData={todoData} />
    </>
  );
}

export default Todo;
