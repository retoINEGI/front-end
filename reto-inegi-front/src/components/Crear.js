/*
Nombre del archivo: Crear.js
Fecha de creación: 28-10-2022

Página que permitirá al usuario crear gráficas con un dataset de 
entrada y a través de un chatbot en Amazon Lex.
*/


import "../styles/Crear.css";
import ejemploChatbot from "../images/ejemplo_chatbot.png";
import ejemploGrafica from "../images/ejemplo_grafica.png";
const Crear = () => {
  return (
    <div>
      <h1 className="text-format">Crear</h1>
      <div className="crear-card-container">
        <div className="bot-container">
          <h1 className="text-format">Bot</h1>
          <img src={ejemploChatbot} className="image-bot-format" alt="" />
        </div>
        <div className="bot-container">
          <h1 className="text-format">Vista Previa del Gráfico</h1>
          <img src={ejemploGrafica} className="graphic-format" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Crear;
