import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import plant from "../public/plant.svg";
import planto from "../public/planto.svg";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div className="bg-green-200 relative overflow-y-clip">
        <img
          src={plant}
          alt=""
          className="w-full h-full absolute -bottom-28 -rotate-6 -right-24 z-10 drop-shadow-lg"
        />
        <img
          src={planto}
          alt=""
          className="w-full h-full absolute -bottom-[7.8rem] -rotate-6 -right-[6.2rem] drop-shadow-lg opacity-15"
        />
      </div>

      <div className="px-20 bg-white flex flex-col justify-center">
        <h1 className="text-lime-600 font-black text-6xl mb-20">
          Confirma tu cuenta y Comienza a Administrar tus
          <span className="text-black"> pacientes</span>
        </h1>

        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500 " to="/">
            Iniciar sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
