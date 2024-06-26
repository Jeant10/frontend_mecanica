import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts";
import { CiLogout } from "react-icons/ci";

export const DashboardTemplate = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const urlActual = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/logout",
        {},
        { headers: { accept: "application/json", authorization: token } }
      );
      navigate("/login", { replace: true });
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-amber-500 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white underline">
          Prison System
        </h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/711/711769.png"
          alt="img-client"
          className="m-auto mt-4"
          width={120}
        />
        <h3 className="text-2xl font-black text-center text-white">
          {user.email}
        </h3>
        <h3 className="text-xl font-black text-center text-white">
          {user.name}
        </h3>
        <hr className="mt-5 text-orange-900" />

        <ul className="mt-5 list-outside px-5">
          <li className="text-orange-900">
            <Link
              to="/clientes"
              className={`${
                urlActual === "/clientes"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Clientes
            </Link>
          </li>
          <li className="text-orange-900">
            <Link
              to="/vehiculos"
              className={`${
                urlActual === "/vehiculos"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Vehiculos
            </Link>
          </li>

          <li className="text-orange-900">
            <Link
              to="/clientes/create"
              className={`${
                urlActual === "/clientes/create"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Create a cliente
            </Link>
          </li>

          <li className="text-orange-900">
            <Link
              to="/vehiculos/create"
              className={`${
                urlActual === "/vehiculos/create"
                  ? "text-blue-300 underline"
                  : "text-white"
              } text-2xl block mt-2 hover:text-blue-200`}
            >
              Create a vehiculo
            </Link>
          </li>

          

          <button
            type="button"
            onClick={onLogout}
            className="m-auto text-white text-2xl block mt-4 hover:text-red-300 text-center bg-red-900 p-1 rounded-lg"
          >
            <CiLogout size={30} />
            Logout
          </button>
        </ul>
  
      </div>




      <div className="md:w-3/4 p-10 md:h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};
