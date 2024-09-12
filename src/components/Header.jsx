import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <header className="py-4 bg-white shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-gray-500 text-center">
          Invernadero de{" "}
          <span className="text-lime-600 font-black">Alta Tecnología</span>
        </h1>
        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link className="text-gray-500 text-sm  font-bold" to="/admin">
            Home
          </Link>
          <Link
            className="text-gray-500 text-sm  font-bold"
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-gray-500 text-sm  font-bold"
            to="/admin/graphics"
          >
            Graphics
          </Link>
          <Link className="text-gray-500 text-sm  font-bold" to="/admin/perfil">
            Profile
          </Link>

          <button
            type="button"
            className="text-gray-500 text-sm  font-bold"
            onClick={cerrarSesion}
          >
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
