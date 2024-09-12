import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import plant from "../public/plant.svg";
import planto from "../public/planto.svg";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: "Coloca tu nuevo password" });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({ msg: data.msg });

      setPasswordModificado(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

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
          Restablece tu password y no pierdas Acceso a tus
          <span className="text-black"> pacientes</span>
        </h1>

        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo password
                </label>
                <input
                  type="password"
                  placeholder="Tu nuevo password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Guardar nuevo password"
                className="bg-lime-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-lime-800 md:w-auto "
              />
            </form>
          </>
        )}

        {passwordModificado && (
          <Link className="block text-center my-5 text-gray-500 " to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
