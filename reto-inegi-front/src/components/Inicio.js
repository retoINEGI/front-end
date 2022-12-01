/*
Nombre del archivo: Inicio.js
Fecha de creación: 28-10-2022

Página que dará una descripción al usuario sobre la funcionalidad
de la interfaz y sus objetivos.
*/

import "../styles/Inicio.css";
import inegi from "../images/inicio-inegi.png";
import tableau from "../images/inicio-tableau.jpg";
import salesforce from "../images/inicio-salesforce.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AllPages from "./AllPages";

import diccionario from "../images/diccionarioScince.pdf"
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


const Inicio = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div>
      <h1 className="text-format">Inicio</h1>
      <div className="inicio-card-container" data-aos="fade-up">
        <div className="description-container">
          <h1 className="text-format">NLP para INEGI</h1>
          <p>
            Mediante este proyecto, se buscan resolver problemas con efecto en
            la industria, sociedad, economía y salud mediante algunos de los
            objetivos de desarrollo sostenible, los cuales serán una guía
            importante para que mediante datos del instituto INEGI, podamos
            analizar cómo mejorar dichas problemáticas e implementar soluciones.
            De esta forma, lograremos incrementar un impacto social y fortalecer
            relaciones con distintos grupos de interés. En este caso, nos
            centraremos únicamente en los siguientes ODS: 8: Trabajo decente y
            crecimiento económico: Busca promover el crecimiento económico
            sostenido, inclusivo y sostenible, el empleo pleno y productivo y el
            trabajo decente para todas y todos. 9: Industria, innovación e
            infraestructura: Pretende conseguir infraestructuras sostenibles,
            resilientes y de calidad para todos, además de impulsar una
            industrialización inclusiva para fomentar la innovación. Para poder
            abordar los problemas, necesitamos conocer cuáles son las causas por
            las que se carece de, en el caso de la ODS 8 el trabajo decente y
            crecimiento económico y por otro lado en la ODS 9, la carencia de
            innovación e infraestructura. Teniendo en cuenta ello, lograremos
            realizar con precisión gráficos visuales para que a través de
            dictado en voz, se pueda procesar información y realizar una
            predicción sobre si los datos, coinciden con alguna ODS para poder
            buscar la implementación de una solución o no. La estrategia para la
            aportación de ideas a las ODS anteriormente mencionadas se centra en
            el clustering y visualización de datos a través de: Salesforce:
            Plataforma de gestión de relaciones con los clientes basada en la
            nube y con enfoque en la inteligencia artificial. Tableau: Software
            de visualización de datos interactivos centrado en la inteligencia
            empresarial.
          </p>
        </div>
        <div className="description-container">
          <iframe src={diccionario} height="800" width="500"/>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
