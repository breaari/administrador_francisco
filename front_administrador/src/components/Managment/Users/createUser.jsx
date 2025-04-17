import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFormData } from "../../../utils";
import { FaXmark } from "react-icons/fa6";
import { GetUsers, PostUser } from "../../../redux/actions";
import bcrypt from "bcryptjs";

export const CreateUser = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(userFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [UsernameExistsError, setUsernameExistsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "clue") {
      const contieneMayuscula = /[A-Z]/.test(value);
      const contieneNumero = /[0-9]/.test(value);
      setPasswordValid(contieneMayuscula && contieneNumero);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usernameExists(formData.email)) {
        setUsernameExistsError(true);
        return;
      }

      const hashedPassword = await bcrypt.hash(formData.clue, 10);
      let userData = { ...formData, clue: hashedPassword };

      await dispatch(PostUser(userData));
      await dispatch(GetUsers());

      setShowSuccess(true);
      setFormData(userFormData);
      handleCloseModal();
    } catch (error) {
      setShowError(true);
    }
  };

  const usernameExists = (email) => {
    return users.some((user) => user.email === email);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsernameExistsError(false);
    setShowSuccess(false);
    setShowError(false);
  };

  return (
    <>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setShowModal(true)}
      >
        Crear Usuario
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-6 h-auto">
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Crear Nuevo Usuario</h2>
                <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                <FaXmark />
                </button>
            </div>

            {showSuccess && (
              <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                El usuario fue creado con éxito.
              </div>
            )}
            {showError && (
              <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                Ocurrió un error. Intenta nuevamente más tarde.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-row justify-between items-center space-x-2">
                    <div className="w-1/2">
                        <label className="flex items-center gap-2 text-gray-700">
                            Nombre
                        </label>
                        <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="flex items-center gap-2 text-gray-700">
                            Apellido
                        </label>
                        <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center space-x-2">
                    <div className="w-1/2">
                        <label className="flex items-center gap-2 text-gray-700">
                            Email
                        </label>
                        <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>

                    {UsernameExistsError && (
                        <div className="text-red-600">
                        El nombre de usuario ya existe en la base de datos.
                        </div>
                    )}

                    <div className="w-1/2">
                        <label className="flex items-center gap-2 text-gray-700">
                            Teléfono
                        </label>
                        <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                            const sanitized = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setFormData({ ...formData, phone: sanitized });
                        }}
                        maxLength={10}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center space-x-2">
                    <div className="w-1/2">
                        <label className="flex items-center gap-2 text-gray-700">
                            Contraseña
                        </label>
                        <input
                        type="password"
                        name="clue"
                        value={formData.clue}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        />
                        {formData.clue && !passwordValid && (
                        <div className="text-red-600 mt-1">
                            La contraseña debe contener al menos una mayúscula y un número.
                        </div>
                        )}
                    </div>

                    <div className="w-1/2">
                        <label className="flex items-center gap-2 text-gray-700">
                            Rol del Usuario
                        </label>
                        <select
                        name="user_role"
                        value={formData.user_role}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        >
                        <option value="0">Programador</option>
                        <option value="1">Administrador</option>
                        <option value="2">Empleado</option>
                        </select>
                    </div>
                </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
