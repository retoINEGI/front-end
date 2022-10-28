import { NavLink } from "react-router-dom";
import "../styles/Menu.css"

const Menu = () => {
  return (
    <div>
      <nav className="barra-navegacion">
        <NavLink to="inicio">Inicio</NavLink>
        <NavLink to="crear">Crear</NavLink>
        <NavLink to="dashboard">Dashboard</NavLink>
      </nav>
    </div>
  );
};

export default Menu;
