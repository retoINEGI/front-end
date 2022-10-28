import { NavLink } from "react-router-dom";
import "../styles/Menu.css";

const Menu = () => {
  return (
    <div>
      <nav className="barra-navegacion">
        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="crear">Crear</NavLink>
        <NavLink to="inicio">Inicio</NavLink>
      </nav>
    </div>
  );
};

export default Menu;
