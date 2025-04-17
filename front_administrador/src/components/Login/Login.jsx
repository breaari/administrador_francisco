import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers, SetAuthenticatedUserId } from "../../../src/Redux/actions";
import bcrypt from "bcryptjs";

export default function Login() {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(GetUsers());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoginError("Error al cargar usuarios. Intente nuevamente.");
        setIsLoading(false);
      }
    };

    localStorage.removeItem("authenticatedUserId");
    fetchUsers();

    const retryFetch = setInterval(() => {
      if (users.length === 0 && !isLoading) {
        dispatch(GetUsers());
      } else {
        clearInterval(retryFetch);
      }
    }, 3000);

    return () => clearInterval(retryFetch);
  }, [dispatch, users.length, isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      setLoginError("Cargando usuarios, por favor espere.");
      return;
    }

    if (!formData.email || !formData.password) {
      setLoginError("Por favor complete todos los campos");
      return;
    }

    try {
      const user = users.find(
        (user) => user.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (!user) {
        setLoginError("Usuario no registrado");
        return;
      }

      const passwordMatch = await bcrypt.compare(formData.password, user.clue);

      if (passwordMatch) {
        dispatch(SetAuthenticatedUserId(user.id));
        window.location.href = `administrador/${user.id}`;
      } else {
        setLoginError("Contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      setLoginError("Error al iniciar sesión, intente de nuevo más tarde");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 mx-auto mb-2 rounded-full"
          />
          <h2 className="text-xl font-semibold text-red-600">
            Iniciar Sesión
          </h2>
        </div>

        {isLoading || users.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-6">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-red-600 h-10 w-10 mb-4 animate-spin"></div>
            <p className="text-sm font-medium text-gray-700 text-center">
              Cargando usuarios, por favor espere...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Iniciar sesión
            </button>
          </form>
        )}

        {loginError && !isLoading && (
          <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded text-sm text-center">
            {loginError}
          </div>
        )}
      </div>
    </div>
  );
}
