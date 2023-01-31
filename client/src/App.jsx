import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { aiLogo } from "./assets";
import { Home, Posts } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-blue-300 h-52 w-52  rounded-full absolute -top-24 left-0 blur-3xl opacity-50 z-0 "></div>
        <div className="bg-blue-300 h-52 w-52 blur-3xl rounded-full absolute top-52 right-0 opacity-50"></div>
        <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-2 border-b relative z-10 border-b-[#c5c3c3]">
          <Link to="/">
            <div className="flex items-center">
              <img src={aiLogo} alt="openAiLogo" className="h-12" />{" "}
              <span
                className="text-blue-500"
                style={{
                  fontFamily: "cursive",
                }}
              >
                AI_IMAGE
              </span>
            </div>
          </Link>
          <Link
            to="/createPost"
            className="bg-[#6469ff] font-inter font-bold py-2 px-4 rounded-md text-white  "
          >
            Create
          </Link>
        </header>
        <main className="sm:px-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createPost" element={<Posts />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
