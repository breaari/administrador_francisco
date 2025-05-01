import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetClients } from "../../../Redux/actions";
import { CreateClient } from "./createClient";
import EditClient from "./editClient";
import DisableClient from "./disableClient";
import SeeClient from "./seeClient";
import { getIvaConditionName, getCurrentAccountStatus, getActivationStatus } from "../../../utils";


export const Clients = () => {
    const dispatch = useDispatch();
    const allClients = useSelector((state) => state.clients);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        dispatch(GetClients());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClients = allClients
        .filter(client =>
            (client.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter(client => {
            if (statusFilter === "active") return client.is_activate === 1;
            if (statusFilter === "inactive") return client.is_activate === 0;
            return true;
        })
        .sort((a, b) => b.is_activate - a.is_activate);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Clientes</h2>
                <CreateClient />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="all">Todos los estados</option>
                    <option value="active">Activos</option>
                    <option value="inactive">Inactivos</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">CUIT/CUIL</th>
                            <th className="p-2">Condición IVA</th>
                            <th className="p-2">Teléfono</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Cuenta Corriente</th>
                            <th className="p-2">Estado</th>
                            <th className="p-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client.id} className="border-t">
                                <td className="p-2">{client.client_name}</td>
                                <td className="p-2">{client.cuit_or_cuil}</td>
                                <td className="p-2">{getIvaConditionName(client.iva_condition)}</td>
                                <td className="p-2">{client.phone}</td>
                                <td className="p-2">{client.email}</td>
                                <td className="p-2">{getCurrentAccountStatus(client.current_account)}</td>
                                <td className="p-2">{getActivationStatus(client.is_activate)}</td>
                                <td className="p-2 flex gap-2 justify-center">
                                    <SeeClient client={client} />
                                    <EditClient client={client} />
                                    <DisableClient client={client} />
                                </td>
                            </tr>
                        ))}
                        {filteredClients.length === 0 && (
                            <tr>
                                <td colSpan="10" className="p-4 text-center text-gray-500">
                                    No se encontraron clientes.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
