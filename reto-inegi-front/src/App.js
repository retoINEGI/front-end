import { Route, Routes } from "react-router-dom";
import "./App.css";
import Inicio from "./components/Inicio";
import Menu from "./components/Menu";
import Crear from "./components/Crear";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
