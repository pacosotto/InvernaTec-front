import { useState, useEffect } from "react";
import CameraToggle from "../components/CameraToggle";
import TemperaturaIcono from "../public/icons/temperature-svgrepo-com.svg";
import HumedadIcono from "../public/icons/humidity-svgrepo-com.svg";
import LuzIcono from "../public/icons/day-and-night-svgrepo-com.svg";
import CaudalimetroIcono from "../public/icons/water-rate-two-svgrepo-com.svg";
import HumedadSueloIcono from "../public/icons/suelo.svg";
import VientoIcono from "../public/icons/wind-svgrepo-com.svg";
import phIcono from "../public/icons/ph-meter-lab-svgrepo-com.svg";
import conductividadIcono from "../public/icons/conductividad.svg";
// vite --host 10.11.6.135

const Dashboard = () => {
  const [infoSensores, setInfoSensores] = useState(null);

  const [luces, setLuces] = useState(true);
  const [ventilador, setVentilador] = useState(true);
  const [riego, setRiego] = useState(true);
  let estadoLuces;
  let estadoVentilador;
  let estadoRiego;

  const obtenerInfoSensores = async () => {
    try {
      const response = await fetch("http://172.20.10.12/sensorData"); // Asegúrate de usar la IP correcta
      if (!response.ok) {
        throw new Error(`Error al obtener datos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setInfoSensores(data);
    } catch (error) {
      console.error("Error en la consulta:", error);
    }
  };

  const encenderLuces = () => {
    luces ? (estadoLuces = "on") : (estadoLuces = "off");
    fetch(`http://192.168.137.64/led?state=${estadoLuces}`).catch((error) =>
      console.error("Error:", error)
    );
    setLuces(!luces);
  };

  const encenderVentilador = () => {
    ventilador ? (estadoVentilador = "on") : (estadoVentilador = "off");
    fetch(`http://192.168.137.64/ventilador?state=${estadoVentilador}`).catch(
      (error) => console.error("Error:", error)
    );
    setVentilador(!ventilador);
  };

  const encenderRiego = () => {
    riego ? (estadoRiego = "on") : (estadoRiego = "off");
    fetch(`http://192.168.137.64/riego?state=${estadoRiego}`).catch((error) =>
      console.error("Error:", error)
    );
    setRiego(!riego);
  };

  const encenderLucesEsp32 = async () => {
    setLuces(!luces);
    try {
      const response = await fetch("http://172.20.10.12/toggleLuces");
      if (!response.ok) {
        throw new Error(
          `Error al activar/desactivar luces: ${response.statusText}`
        );
      }
      console.log("Luces activadas/desactivadas");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const encenderBombaEsp32 = async () => {
    setRiego(!riego);
    try {
      const response = await fetch("http://172.20.10.12/toggleBomba");
      if (!response.ok) {
        throw new Error(
          `Error al activar/desactivar bomba: ${response.statusText}`
        );
      }
      console.log("Bomba activada/desactivada");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const encenderVentiladorEsp32 = async () => {
    setVentilador(!ventilador);
    try {
      const response = await fetch("http://172.20.10.12/toggleVentilador");
      if (!response.ok) {
        throw new Error(
          `Error al activar/desactivar ventilador: ${response.statusText}`
        );
      }
      console.log("Ventilador activado/desactivado");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      obtenerInfoSensores();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <h1 className="font-bold uppercase text-gray-400 mb-10 text-center lg:text-left">
        {" "}
        / Dashboard /
      </h1>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="grid w-5/6 lg:grid-cols-4 gap-10">
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={TemperaturaIcono} className="w-1/6" />
            <h3 className="font-bold">Temperatura</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.temperatura : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={HumedadIcono} className="w-1/6" />
            <h3 className="font-bold">Humedad</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.humedad : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={LuzIcono} className="w-1/6" />
            <h3 className="font-bold">Sensor de Luz</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.lightsensor : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={CaudalimetroIcono} className="w-1/6" />
            <h3 className="font-bold">Caudal Hz</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.caudalFrecuencia : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={HumedadSueloIcono} className="w-1/6" />
            <h3 className="font-bold">Humedad de Suelo</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.humedadSuelo : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={VientoIcono} className="w-1/6" />
            <h3 className="font-bold">Velocidad de viento</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.velocidadViento : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={CaudalimetroIcono} className="w-1/6" />
            <h3 className="font-bold">Caudal L/Min</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.caudalMinutos : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={CaudalimetroIcono} className="w-1/6" />
            <h3 className="font-bold">Caudal L/Hora</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.caudalHoras : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={phIcono} className="w-1/6" />
            <h3 className="font-bold">Nivel de Ph</h3>
            <p>
              <span>{infoSensores ? infoSensores?.pH : "Cargando..."}</span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={conductividadIcono} className="w-1/6" />
            <h3 className="font-bold">Conductividad</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.conductividad : "Cargando..."}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105">
            <img src={CaudalimetroIcono} className="w-1/6" />
            <h3 className="font-bold">Caudal Total</h3>
            <p>
              <span>
                {infoSensores ? infoSensores?.caudalTotal : "Cargando..."}
              </span>
            </p>
          </div>
        </div>
        <h3 className="font-bold text-2xl">Acciones</h3>
        <div className="flex flex-col lg:flex-row gap-10">
          <button
            className={
              luces
                ? "bg-gray-700 p-4 rounded-lg text-white"
                : "bg-yellow-300 p-4 rounded-lg text-black font-bold"
            }
            onClick={encenderLucesEsp32}
          >
            {luces ? "Encender luces" : "Apagar luces"}
          </button>
          <button
            className={
              ventilador
                ? "bg-gray-700 p-4 rounded-lg text-white"
                : "bg-gray-300 p-4 rounded-lg text-black font-bold"
            }
            onClick={encenderVentiladorEsp32}
          >
            {ventilador ? "Encender ventilador" : "Apagar ventilador"}
          </button>
          <button
            className={
              riego
                ? "bg-gray-700 p-4 rounded-lg text-white"
                : "bg-sky-500 p-4 rounded-lg text-black font-bold"
            }
            onClick={encenderBombaEsp32}
          >
            {riego ? "Encender riego" : "Apagar riego"}
          </button>
        </div>
        <div>
          <CameraToggle />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
