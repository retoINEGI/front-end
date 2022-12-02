/*
Nombre del archivo: Crear.js
Fecha de creación: 28-10-2022

Página que permitirá al usuario crear gráficas con un dataset de
entrada y a través de un chatbot en Amazon Lex.
*/

import "../styles/Crear.css";
import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Define a color
Chart.defaults.color = "#000000";

const Crear = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [result, setResult] = useState(null);
  const [grafica, setGrafica] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#DE8910", "#005791"],
        borderColor: ["#DE8910", "#005791"],
        borderWidth: 1,
      },
    ],
  });
  const [tipoGrafica, setTipografica] = useState(null);

  // Función para obtener la respuesta del bot y graficar
  const graficar = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://retoinegibucket.s3.us-west-2.amazonaws.com/bot_response.txt?X-Amz-Expires=86400&X-Amz-Date=20221202T010203Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARXWBOEHYDWOTTUYO%2F20221202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=28be70123cbe17e5331b0131a532eaa4b0fa92edf4b77872847fd9ae0bcfaaa4",
      requestOptions
    )
      .then((response) => response.text())
      .then((resultado) => {
        console.log(resultado);
        setResult(JSON.parse(resultado));
        console.log(result.x);
        console.log(result.y);
        var x = result.x;
        console.log(x.length);
        if (x.length > 1 && x.length !== 2) {
          setTipografica("Bar");
        } else if (x.length === 2) {
          setTipografica("Pie");
        } else {
          setTipografica("Doughnut");
        }
        setGrafica({
          labels: result.x,
          datasets: [
            {
              data: result.y,
              backgroundColor: ["#DE8910", "#005791"],
              borderColor: ["#DE8910", "#005791"],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.log("error", error));
  };

  let isConfigUpdate = false;

  async function uploadToS3Bucket(stream, cd) {
    try {
      if (!isConfigUpdate) {
        AWS.config.update({ region: "us-east-1" });
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1:92fb3e21-e1c0-4c7c-a638-5b71d49f6105",
        });
        isConfigUpdate = true;
      }

      let s3 = new AWS.S3({ apiVersion: "latest" });
      let uploadItem = await s3
        .upload({
          Bucket: "myawsfordataprocessingbucket",
          Key: document.getElementById("fileToUpload").files[0].name, // name for the bucket file
          ContentType: document.getElementById("fileToUpload").files[0].type,
          Body: stream,
        })
        .on("httpUploadProgress", function (progress) {
          console.log("progress=>", progress);
          cd(getUploadingProgress(progress.loaded, progress.total));
        })
        .promise();
      console.log("uploadItem=>", uploadItem);
      return uploadItem;
    } catch (error) {
      console.log(error);
    }
  }

  function getUploadingProgress(uploadSize, totalSize) {
    let uploadProgress = (uploadSize / totalSize) * 100;
    return Number(uploadProgress.toFixed(0));
  }

  async function uploadMedia() {
    let mediaStreamRequest = getFile(
      document.getElementById("fileToUpload").files[0]
    );
    const [mediaStream] = await Promise.all([mediaStreamRequest]);
    await uploadToS3Bucket(mediaStream, (progress) => {
      console.log(progress);
    });
  }

  async function getFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (err) => {
        reject(false);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  return (
    <div>
      <h1 className="text-format">Crear</h1>
      <p>Sube el dataset con el que generarás tus gráficas</p>
      <input type="file" id="fileToUpload" className="file-select" />
      <button onClick={() => uploadMedia()} className="upload-btn">
        Upload
      </button>
      <div className="crear-card-container" data-aos="fade-up">
        <div className="bot-container">
          <h1 className="text-format">Bot</h1>
          <iframe
            className="bot"
            title="bot"
            src="https://widget.kommunicate.io/chat?appId=31c586e71bcb02c23f6f9e05dd21e3a44"
            allow="microphone; geolocation;"
            frameborder="0"
          ></iframe>
        </div>
        <div className="bot-container">
          <h1 className="text-format">Vista Previa del Gráfico</h1>
          <button onClick={() => graficar()} className="graficar-btn">
            Ver Gráfica
          </button>

          <div>
            {tipoGrafica === "Bar" && (
              <Bar
                style={{ height: "15rem" }}
                data={grafica}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                      position: "up",
                    },
                    title: {
                      display: true,
                      fontSize: 20,
                      text: "Gráfico",
                      fontColor: "#9facbd",
                    },
                  },
                }}
              />
            )}
            {tipoGrafica === "Doughnut" && (
              <Doughnut
                style={{ height: "15rem" }}
                data={grafica}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                      position: "up",
                    },
                    title: {
                      display: true,
                      fontSize: 20,
                      text: result.x + " - " + result.y,
                      fontColor: "#9facbd",
                    },
                  },
                }}
              />
            )}
            {tipoGrafica === "Pie" && (
              <Pie
                style={{ height: "15rem" }}
                data={grafica}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                      position: "up",
                    },
                    title: {
                      display: true,
                      fontSize: 20,
                      text: "Femenino y Masculino",
                      fontColor: "#9facbd",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crear;
