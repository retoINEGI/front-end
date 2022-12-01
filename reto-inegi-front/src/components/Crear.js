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

const Crear = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [result, setResult] = useState(null);

  // Función para obtener la respuesta del bot y graficar
  const graficar = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://retoinegibucket.s3.us-west-2.amazonaws.com/bot_response.txt?X-Amz-Expires=86400&X-Amz-Date=20221201T015542Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARXWBOEHYDWOTTUYO%2F20221201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=bba5e1ae156daedcdbc0b14a461464d539dd9da17b16c697a9c7fa7e4870e224",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setResult(result);
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
          <h1>{result}</h1>
        </div>
      </div>
    </div>
  );
};

export default Crear;
