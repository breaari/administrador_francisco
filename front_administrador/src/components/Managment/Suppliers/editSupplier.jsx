import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateSupplier, GetSuppliers } from "../../../Redux/actions";
import { FaXmark } from "react-icons/fa6";

export default function EditSupplier({ supplier }) {
  const [formData, setFormData] = useState(supplier);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(UpdateSupplier(supplier.id, formData));
      await dispatch(GetSuppliers());
      setShowModal(false);
    } catch (error) {
      alert("Error actualizando el proveedor");
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
              <h2 className="text-2xl font-bold">Editar Proveedor</h2>
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

              <div className="">
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
              </div>

              <div className="">
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
                  <option value="0">Responsable Inscripto</option>
                  <option value="1">Monotributista</option>
                  <option value="2">Exento</option>
                </select>
              </div>

              <div className="">
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
