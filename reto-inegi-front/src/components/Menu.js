import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <nav className="navigation">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="crear">Crear</NavLink>
        <NavLink to="dashboard">Dashboard</NavLink>
      </nav>
      <h1>Menu</h1>
    </div>
  );
};

export default Menu;
