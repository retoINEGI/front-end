/*
Nombre del archivo: Dashboard.js
Fecha de creación: 28-10-2022

Página que permitirá ver al usuario las gráficas que ha creado.
*/

import "../styles/Dashboard.css";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div>
      <h1 className="text-format">Dashboard</h1>
      <div className="dashboard-card-container" data-aos="fade-up">
        <center>
          <tableau-viz
            id="tableauViz"
            src="https://public.tableau.com/views/RetoDashboardFINAL/Dashboard1"
          ></tableau-viz>
        </center>
      </div>
    </div>
  );
};

export default Dashboard;
