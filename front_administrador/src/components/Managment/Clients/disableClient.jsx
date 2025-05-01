import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateClient, GetClients } from "../../../Redux/actions"; 
import { FaXmark } from "react-icons/fa6";

export default function ToggleClientStatus({ client }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const isDisabled = client.is_activate === 0;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      const updatedClient = {
        ...client,
        is_activate: isDisabled ? 1 : 0, 
      };

      await dispatch(UpdateClient(client.id, updatedClient)); 
      await dispatch(GetClients()); 
      handleCloseModal();
    } catch (error) {
      alert("Error actualizando cliente");
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
              ¿Está seguro que desea {isDisabled ? "activar" : "desactivar"} al cliente{" "}
              <span className="font-semibold">{client?.client_name}</span>?
            </p>

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
