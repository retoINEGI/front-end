import { NavLink } from "react-router-dom";
import "../styles/Menu.css";
import logo from "../images/logo_INEGI.jpg"

const Menu = () => {
  return (
    <div>
      <nav className="barra-navegacion">
        <img src={logo} className="logo-image" alt=""/>
        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="crear">Crear</NavLink>
        <NavLink to="inicio">Inicio</NavLink>
      </nav>
    </div>
  );
};

export default Menu;
