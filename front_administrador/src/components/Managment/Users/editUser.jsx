import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateUser, GetUsers } from "../../../redux/actions";
import { FaXmark } from "react-icons/fa6";

export default function EditUser({ user }) {
  const [formData, setFormData] = useState(user);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(UpdateUser(user.id, formData));
      await dispatch(GetUsers());
      setShowModal(false);
    } catch (error) {
      alert("Error actualizando el usuario");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
      >
        Editar
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-6 h-auto">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Editar Usuario</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
         
                <div className="">
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

                <div className="">
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

                <div className="">
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
                    <option value="">Seleccionar</option>
                    <option value={0}>Programador</option>
                    <option value={1}>Administrador</option>
                    <option value={2}>Empleado</option>
                  </select>
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
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Modificar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
