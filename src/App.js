import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/home";
import NavBar from "./components/navbar";

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <BrowserRouter>
      <div className="font-DMsans bg-slate-400">
        <header className="p-10 text-3xl md:text-6xl font-bold text-right bg-slate-300">
          <h1>Carls NC News</h1>
        </header>
        <nav>
          <NavBar loading={loading} setLoading={setLoading} />
        </nav>
        <section>
          <Home loading={loading} setLoading={setLoading} />
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
