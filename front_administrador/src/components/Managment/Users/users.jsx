import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../../../Redux/actions";
import { CreateUser } from "./createUser";
import EditUser from "./editUser";
import DisableUser from "./disableUser";

export const Users = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.users);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");


    useEffect(() => {
        dispatch(GetUsers());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = allUsers
    .filter(user =>
        (`${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(user => {
        if (statusFilter === "active") return user.is_activate === 1;
        if (statusFilter === "inactive") return user.is_activate === 0;
        return true;
    })
    .filter(user => {
        if (roleFilter !== "all") return user.user_role === parseInt(roleFilter);
        return true;
    })
    .sort((a, b) => b.is_activate - a.is_activate);


      
    const getRolNombre = (rol) => {
        switch (rol) {
            case 0: return "Programador";
            case 1: return "Administrador";
            case 2: return "Empleado";
            default: return "Rol desconocido";
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
                 <CreateUser></CreateUser>
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

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="all">Todos los roles</option>
                    <option value="0">Programador</option>
                    <option value="1">Administrador</option>
                    <option value="2">Empleado</option>
                </select>
                </div>


            <div className="overflow-x-auto">
                <table className="w-full border text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Rol</th>
                            <th className="p-2">Estado</th>
                            <th className="p-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="p-2">{user.first_name} {user.last_name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{getRolNombre(user.user_role)}</td>
                                <td className="p-2">
                                    {user.is_activate === 1 ? "Activo" : "Inactivo"}
                                </td>
                                <td className="p-2 flex gap-2 justify-center">
                                    <EditUser user={user}></EditUser>
                                    <DisableUser user={user} ></DisableUser>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
