import { useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";

function ShowTodo({ isShow, setIsShow, todoData }) {
  const queryClient = useQueryClient();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isShow]);
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

  if (!isShow) {
    return <></>;
  }
  return (
    <>
      <style>{"body {overflow:hidden;}"}</style>
      <div className="absolute top-0 left-0 flex flex-wrap w-full h-full  place-content-center bg-[#00000077]">
        <div className="bg-slate-700 h-3/4 w-3/4 flex flex-col place-content-center items-center rounded-3xl shadow-[0px_0px_8px_8px] shadow-slate-600 hover:shadow-slate-500">
          <p className="w-full mb-2 text-lg break-words">{todoData.name}</p>
          <p className="w-full mb-2 text-sm break-words text-slate-300">
            {todoData.content}
          </p>

          <div>
            <button
              className="bottom-0 px-2 py-1 m-1 bg-red-700 rounded-lg hover:bg-red-800"
              onClick={async () => {
                await mutateAsync(todoData._id);
                console.log("Delete ", todoData._id);
              }}
            >
              Delete
            </button>
            <button
              className="inline-block px-6 py-1 m-1 bg-blue-700 rounded-lg hover:bg-blue-800"
              onClick={() => {
                setIsShow(false);
              }}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowTodo;
