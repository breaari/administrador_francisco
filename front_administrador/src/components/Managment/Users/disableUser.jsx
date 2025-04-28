import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateUser, GetUsers } from "../../../Redux/actions";
import { FaXmark } from "react-icons/fa6";
import bcrypt from "bcryptjs";

export default function DisableUser({ user }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [clue, setClue] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const isDisabled = user.is_activate === 0;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail("");
    setClue("");
    setPasswordValid(true);
  };

  const handleSave = async () => {
    if (isDisabled) {
      // Validar contraseña si se va a activar
      const contieneMayuscula = /[A-Z]/.test(clue);
      const contieneNumero = /[0-9]/.test(clue);
      const claveValida = contieneMayuscula && contieneNumero;

      if (!claveValida) {
        setPasswordValid(false);
        return;
      }
    }

    try {
      const hashedPassword = isDisabled ? await bcrypt.hash(clue, 10) : "";

      const updatedUser = {
        ...user,
        email: isDisabled ? email : "",
        clue: isDisabled ? hashedPassword : "",
        is_activate: isDisabled ? 1 : 0,
      };

      await dispatch(UpdateUser(user.id, updatedUser));
      await dispatch(GetUsers());
      handleCloseModal();
    } catch (error) {
      alert("Error actualizando usuario");
    }
  };

  return (
    <>
      <button
        className={`${
          isDisabled ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
        } text-white px-3 py-2 rounded`}
        onClick={handleOpenModal}
      >
        {isDisabled ? "Activar" : "Deshabilitar"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isDisabled ? "Confirmar activación" : "Confirmar desactivación"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                <FaXmark />
              </button>
            </div>

            <p className="text-gray-700 text-lg">
              ¿Está seguro que desea {isDisabled ? "activar" : "desactivar"} el usuario de{" "}
              <span className="font-semibold">
                {user?.last_name} {user?.first_name}
              </span>
              ?
            </p>

            {isDisabled && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm text-gray-700">Nuevo email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Nueva contraseña</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={clue}
                    onChange={(e) => setClue(e.target.value)}
                    required
                  />
                  {!passwordValid && (
                    <p className="text-red-600 text-sm mt-1">
                      La contraseña debe contener al menos una mayúscula y un número.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className={`${
                  isDisabled ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                } text-white px-4 py-2 rounded`}
              >
                {isDisabled ? "Activar" : "Desactivar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
