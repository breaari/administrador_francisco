import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientFormData } from "../../../utils";
import { FaXmark } from "react-icons/fa6";
import { GetClients, PostClient } from "../../../Redux/actions"; 

export const CreateClient = () => {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(clientFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (emailExists(formData.email)) {
        setEmailExistsError(true);
        return;
      }

      let clientData = { ...formData };

      await dispatch(PostClient(clientData));  
      await dispatch(GetClients());           

      setShowSuccess(true);
      setFormData(clientFormData);
      handleCloseModal();
    } catch (error) {
      setShowError(true);
    }
  };

  const emailExists = (email) => {
    return clients.some((client) => client.email === email);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmailExistsError(false);
    setShowSuccess(false);
    setShowError(false);
  };

  return (
    <>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setShowModal(true)}
      >
        Crear Cliente
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-6 h-auto">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Crear Nuevo Cliente</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                <FaXmark />
              </button>
            </div>

            {showSuccess && (
              <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                El cliente fue creado con éxito.
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

                        {/* Nombre del cliente */}
                        <label className="flex items-center gap-2 text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="client_name"
                            value={formData.client_name}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="w-1/2">

              {/* Condición IVA */}
              <label className="flex items-center gap-2 text-gray-700">
                Condición IVA
              </label>
              <select
                name="iva_condition"
                value={formData.iva_condition}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Seleccionar</option>
                <option value="1">Responsable inscripto</option>
                <option value="4">IVA Exento</option>
                <option value="5">Consumidor Final</option>
                <option value="6">Monotributista</option>
              </select>
              </div>
              </div>
              <div className="flex flex-row justify-between items-center space-x-2">
                    <div className="w-1/2">

              {/* CUIT o CUIL */}
              <label className="flex items-center gap-2 text-gray-700">
                CUIT o CUIL
              </label>
              <input
                type="text"
                name="cuit_or_cuil"
                value={formData.cuit_or_cuil}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              </div>
              <div className="w-1/2">


              {/* Domicilio Fiscal */}
              <label className="flex items-center gap-2 text-gray-700">
                Domicilio Fiscal
              </label>
              <input
                type="text"
                name="tax_domicile"
                value={formData.tax_domicile}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
             </div> 
             </div>
             <div className="flex flex-row justify-between items-center space-x-2">
                    <div className="w-1/2">


              {/* Localidad */}
              <label className="flex items-center gap-2 text-gray-700">
                Localidad
              </label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              </div>
              <div className="w-1/2">
              {/* Teléfono */}
              <label className="flex items-center gap-2 text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              </div>
              </div>
              <div className="flex flex-row justify-between items-center space-x-2">
                    <div className="w-1/2">

              {/* Email */}
              <label className="flex items-center gap-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />

              {emailExistsError && (
                <div className="text-red-600">
                  El email ya existe en la base de datos.
                </div>
              )}
            </div>
            <div className="w-1/2">
              {/* Cuenta Corriente */}
              <label className="flex items-center gap-2 text-gray-700">
                ¿Tiene Cuenta Corriente?
              </label>
              <select
                name="current_account"
                value={formData.current_account}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="1">Sí</option>
                <option value="2">No</option>
              </select>
              </div>
              </div>
              <div className="flex flex-row justify-between items-center space-x-2">
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
                  Crear Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
