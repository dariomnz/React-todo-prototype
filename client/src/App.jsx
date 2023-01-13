import reactLogo from "./assets/react.svg";
import plusLogo from "./assets/plus-icon.svg";
import Todos from "./pages/Todos";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-wrap items-center justify-between w-full px-6 shadow-md shadow-slate-700 bg-slate-900">
          <div className="py-6">
            <img
              src="/vite.svg"
              className="inline-block h-10"
              alt="Vite logo"
            />
            <img
              src={plusLogo}
              className="inline-block h-4 px-2"
              alt="React logo"
            />
            <img
              src={reactLogo}
              className="inline-block h-10 animate-[spin_5s_linear_infinite] hover:animate-bounce"
              alt="React logo"
            />
          </div>
          <div className="flex w-3/4 gap-4 place-content-end">
            <Link to="/">Home</Link>
            <Link to="/todos">Todos</Link>
          </div>
        </div>
        <Routes>
          <Route exact path="/"></Route>
          <Route exact path="/todos" element={<Todos />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
