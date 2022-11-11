/*
Nombre del archivo: Crear.js
Fecha de creación: 28-10-2022

Página que permitirá al usuario crear gráficas con un dataset de
entrada y a través de un chatbot en Amazon Lex.
*/


import "../styles/Crear.css";
import ejemploGrafica from "../images/ejemplo_grafica.png";
import AWS from 'aws-sdk';

let isConfigUpdate = false;

async function uploadToS3Bucket(stream, cd) {
    try {
        if (!isConfigUpdate) {
            AWS.config.update(({ region: 'us-east-1' }));
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:92fb3e21-e1c0-4c7c-a638-5b71d49f6105'
            })
            isConfigUpdate = true;
        }

        let s3 = new AWS.S3({apiVersion: "latest"});
        let uploadItem = await s3.upload({
            Bucket: 'myawsfordataprocessingbucket',
            Key: document.getElementById("fileToUpload").files[0].name,// name for the bucket file
            ContentType: document.getElementById("fileToUpload").files[0].type,
            Body: stream
        }).on("httpUploadProgress", function (progress) {
            console.log("progress=>", progress)
            cd(getUploadingProgress(progress.loaded, progress.total));
        }).promise();
        console.log("uploadItem=>", uploadItem)
        return uploadItem;
    }
    catch (error) {
        console.log(error)
    }

}

function getUploadingProgress(uploadSize, totalSize) {
    let uploadProgress = (uploadSize / totalSize) * 100;
    return Number(uploadProgress.toFixed(0));
}

async function uploadMedia() {
    let mediaStreamRequest = getFile(document.getElementById("fileToUpload").files[0])
    const [mediaStream] = await Promise.all([
        mediaStreamRequest
    ])
    await uploadToS3Bucket(mediaStream, (progress) => {
        console.log(progress)
    })
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
};

const Crear = () => {
  return (
    <div>
      <h1 className="text-format">Crear</h1>
      <p>Sube el dataset con el que generaras tus graficas</p>
      <input type="file" id="fileToUpload" className="file-select"/>
      <button onClick={() => uploadMedia()} className="upload-btn">Upload</button>
      <div className="crear-card-container">
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
          <img src={ejemploGrafica} className="graphic-format" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Crear;
