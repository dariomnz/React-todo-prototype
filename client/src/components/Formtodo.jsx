import React from "react";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

function FormTodo({ isForm, setIsForm }) {
  const queryClient = useQueryClient();
  const [datos, setDatos] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isForm]);
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const { mutateAsync } = useMutation(
    () => {
      console.log("Datos del form:" + JSON.stringify(datos));
      return fetch("http://localhost:8080/api/todo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["todos"]),
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutateAsync();
    setIsForm(false);
  };
  if (!isForm) {
    return <></>;
  }
  return (
    <>
      <style>{"body {overflow:hidden;}"}</style>
      <div className="absolute top-0 left-0 flex flex-wrap w-full h-full  place-content-center bg-[#00000077]">
        <form
          className="bg-slate-700 h-3/4 w-3/4 flex flex-col place-content-center items-center rounded-3xl shadow-[0px_0px_8px_8px] shadow-slate-600 hover:shadow-slate-500"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name..."
            className="w-3/4 h-10 mb-4 border-8 rounded-lg bg-slate-800 border-slate-800"
            onChange={handleInputChange}
            name="name"
          ></input>
          <label htmlFor="name">Content</label>
          <textarea
            type="text"
            placeholder="Enter content..."
            className="w-3/4 h-40 mb-4 border-8 rounded-lg resize-none bg-slate-800 border-slate-800"
            onChange={handleInputChange}
            name="content"
          ></textarea>
          <div>
            <button
              type="submit"
              className="inline-block px-6 py-1 m-1 bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              Save
            </button>
            <button
              className="inline-block px-6 py-1 m-1 bg-red-700 rounded-lg hover:bg-red-800"
              onClick={() => {
                setIsForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormTodo;
