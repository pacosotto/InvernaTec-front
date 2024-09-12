import React, { useState } from "react";
import cameraIcono from "../public/icons/camera-svgrepo-com.svg";

function CameraToggle() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const toggleCamera = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={cameraIcono} className="w-12" />
      <button
        onClick={toggleCamera}
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
      >
        {isCameraOpen ? "Cerrar cámara" : "Abrir cámara"}
      </button>

      {isCameraOpen && (
        <iframe
          src="http://172.20.10.8/"
          className="w-full h-96 border-2 border-gray-300 rounded-lg shadow-md"
          title="Camera Feed"
        ></iframe>
      )}
    </div>
  );
}

export default CameraToggle;
