import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import FilteredTopic from "./components/filteredtopic";

function App() {
  return (
    <BrowserRouter>
      <div className="font-DMsans bg-slate-400">
        <header className="p-10 text-3xl md:text-6xl font-bold text-right bg-slate-200">
          <h1>Carls NC News</h1>
        </header>
        <nav>
          <NavBar />
        </nav>
        <section>
          <Routes>
            <Route path="/" element={<FilteredTopic />} />
            <Route path="/:topic" element={<FilteredTopic />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
