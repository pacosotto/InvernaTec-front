import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import plant from "../public/plant.svg";
import planto from "../public/planto.svg";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        {
          email,
        }
      );
      console.log(data);

      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
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
        <h1 className="text-lime-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas el control de tu
          <span className="text-black"> Invernadero</span>
        </h1>

        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-lime-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-lime-800 md:w-auto "
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500 " to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <div></div>
          {/* <Link
            className="block text-center my-5 text-gray-500 "
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link> */}
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
