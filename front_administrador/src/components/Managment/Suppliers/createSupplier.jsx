import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supplierFormData } from "../../../utils"; 
import { FaXmark } from "react-icons/fa6";
import { GetSuppliers, PostSupplier } from "../../../Redux/actions";

export const CreateSupplier = () => {
  const suppliers = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(supplierFormData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [SupplierExistsError, setSupplierExistsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (supplierExists(formData.cuit_or_cuil)) {
        setSupplierExistsError(true);
        return;
      }

      await dispatch(PostSupplier(formData));
      await dispatch(GetSuppliers());

      setShowSuccess(true);
      setFormData(supplierFormData);
      handleCloseModal();
    } catch (error) {
      setShowError(true);
    }
  };

  const supplierExists = (cuit_or_cuil) => {
    return suppliers.some((supplier) => supplier.cuit_or_cuil === cuit_or_cuil);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSupplierExistsError(false);
    setShowSuccess(false);
    setShowError(false);
  };

  return (
    <>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setShowModal(true)}
      >
        Crear Proveedor
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-6 h-auto">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Crear Nuevo Proveedor</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                <FaXmark />
              </button>
            </div>

            {showSuccess && (
              <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                El proveedor fue creado con éxito.
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
                    Nombre del Proveedor
                  </label>
                  <input
                    type="text"
                    name="supplier_name"
                    value={formData.supplier_name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>

                <div className="w-1/2">
                  <label className="flex items-center gap-2 text-gray-700">
                    CUIT / CUIL
                  </label>
                  <input
                    type="text"
                    name="cuit_or_cuil"
                    value={formData.cuit_or_cuil}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  {SupplierExistsError && (
                    <div className="text-red-600 mt-1">
                      El proveedor con este CUIT/CUIL ya existe en la base de datos.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between items-center space-x-2">
                <div className="w-1/2">
                  <label className="flex items-center gap-2 text-gray-700">
                    Condición frente al IVA
                  </label>
                  <select
                    name="iva_condition"
                    value={formData.iva_condition}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">Responsable Inscripto</option>
                    <option value="4">IVA Exento</option>
                    <option value="6">Monotributista</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <label className="flex items-center gap-2 text-gray-700">
                    Cuenta Corriente
                  </label>
                  <select
                    name="current_account"
                    value={formData.current_account}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                  >
                    <option value="">Seleccionar</option>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
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
                  Crear Proveedor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
