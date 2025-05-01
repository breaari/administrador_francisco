import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSuppliers } from "../../../Redux/actions";
import { CreateSupplier } from "./createSupplier";
import EditSupplier from "./editSupplier";
import DisableSupplier from "./disableSupplier";
import SeeSupplier from "./seeSupplier";
import { getIvaConditionName, getCurrentAccountStatus, getActivationStatus } from "../../../utils";


export const Suppliers = () => {
    const dispatch = useDispatch();
    const allSuppliers = useSelector((state) => state.suppliers);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); 
    const [currentAccountFilter, setCurrentAccountFilter] = useState("all"); 
    useEffect(() => {
        dispatch(GetSuppliers());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSuppliers = allSuppliers
        .filter(supplier =>
            supplier.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.cuit_or_cuil.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(supplier => {
            if (statusFilter === "active") return supplier.is_activate === 1;
            if (statusFilter === "inactive") return supplier.is_activate === 0;
            return true;
        })
        .filter(supplier => {
            if (currentAccountFilter === "yes") return supplier.current_account === 1;
            if (currentAccountFilter === "no") return supplier.current_account === 0;
            return true;
        })
        .sort((a, b) => b.is_activate - a.is_activate);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Proveedores</h2>
                <CreateSupplier />
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre o CUIT/CUIL..."
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

                <select
                    value={currentAccountFilter}
                    onChange={(e) => setCurrentAccountFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="all">Todas las cuentas</option>
                    <option value="yes">Con cuenta corriente</option>
                    <option value="no">Sin cuenta corriente</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">CUIT/CUIL</th>
                            <th className="p-2">Condición IVA</th>
                            <th className="p-2">Cuenta Corriente</th>
                            <th className="p-2">Estado</th>
                            <th className="p-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map(supplier => (
                            <tr key={supplier.id} className="border-t">
                                <td className="p-2">{supplier.supplier_name}</td>
                                <td className="p-2">{supplier.cuit_or_cuil}</td>
                                <td className="p-2">{getIvaConditionName(supplier.iva_condition)}</td>
                                <td className="p-2">{getCurrentAccountStatus(supplier.current_account)}</td>
                                <td className="p-2">{getActivationStatus(supplier.is_activate)}</td>
                                <td className="p-2 flex gap-2 justify-center">
                                    <SeeSupplier supplier={supplier} />
                                    <EditSupplier supplier={supplier} />
                                    <DisableSupplier supplier={supplier} />
                                </td>
                            </tr>
                        ))}
                        {filteredSuppliers.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-500">
                                    No se encontraron proveedores.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
