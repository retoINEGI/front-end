/*
Nombre del archivo: Dashboard.js
Fecha de creación: 28-10-2022

Página que permitirá ver al usuario las gráficas que ha creado.
*/

import "../styles/Dashboard.css";
import tableau from "../images/inicio-tableau.jpg";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-format">Dashboard</h1>
      <div className="dashboard-card-container">
        <img src={tableau} className="image-format" alt="" />
      </div>
    </div>
  );
};

export default Dashboard;
