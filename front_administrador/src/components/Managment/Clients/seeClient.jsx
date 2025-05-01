import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function SeeClient({ client }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
      >
        Ver
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-6 h-auto">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Detalles del Cliente</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                <FaXmark />
              </button>
            </div>

            <div className="space-y-2">
              <p><strong>Nombre:</strong> {client.client_name}</p>
              <p><strong>CUIT / CUIL:</strong> {client.cuit_or_cuil}</p>
              <p><strong>Condición frente al IVA:</strong> {client.iva_condition}</p>
              <p><strong>Domicilio Fiscal:</strong> {client.tax_domicile}</p>
              <p><strong>Localidad:</strong> {client.locality}</p>
              <p><strong>Teléfono:</strong> {client.phone}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Cuenta Corriente:</strong> {client.current_account === 1 ? "Sí" : "No"}</p>
              <p><strong>Estado:</strong> {client.is_activate === 1 ? "Activo" : "Inactivo"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
