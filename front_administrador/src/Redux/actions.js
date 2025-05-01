import axios from "axios";

// USERS
export const GET_USERS = "GET_USERS";
export const GET_ID_USER = "GET_ID_USER";
export const POST_USER = "POST_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_AUTHENTICATED_USER_ID = "SET_AUTHENTICATED_USER_ID";

// SUPPLIERS
export const GET_SUPPLIERS = "GET_SUPPLIERS";
export const GET_ID_SUPPLIER = "GET_ID_SUPPLIER";
export const POST_SUPPLIER = "POST_SUPPLIER";
export const UPDATE_SUPPLIER = "UPDATE_SUPPLIER";
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";

// CLIENTS
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_ID_CLIENT = "GET_ID_CLIENT";
export const POST_CLIENT = "POST_CLIENT";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";

// URLs
const usersURL = import.meta.env.VITE_API_USERS_URL;
const suppliersURL = import.meta.env.VITE_API_SUPPLIERS_URL;
const clientsURL = import.meta.env.VITE_API_CLIENTS_URL;
console.log("clients:", clientsURL)

// USERS ACTIONS
export const GetUsers = () => {
    return async function (dispatch) {
      try {
        var response = await axios.get(usersURL);
        return dispatch({
          type: GET_USERS,
          payload: response.data || [],
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
};

export const GetUserDetail = (id) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${usersURL}?id=${id}`);
        return dispatch({
          type: GET_ID_USER,
          payload: response.data || [],
        });
      } catch (err) {
        console.log(err);
      }
    };
};

export const PostUser = (atributos) => {
    return async function (dispatch) {
      try {
        var f = new FormData();
        f.append("METHOD", "POST");
        f.append("first_name", atributos.first_name);
        f.append("last_name", atributos.last_name);
        f.append("user_role", atributos.user_role);
        f.append("email", atributos.email);
        f.append("clue", atributos.clue);
        f.append("is_activate", atributos.is_activate);
        f.append("entry_time", atributos.entry_time || "NULL");
        f.append("exit_time", atributos.exit_time || "NULL");
        
        var response = await axios.post(usersURL, f);
        
        return dispatch({
          type: POST_USER,
          payload: response.data,
        });
      } catch (err) {
        alert(err);
        throw err;
      }
    };
};

export const UpdateUser = (id, atributos) => {
    return async function (dispatch) {
      try {
        var f = new FormData();
        f.append("METHOD", "PUT");
        f.append("first_name", atributos.first_name);
        f.append("last_name", atributos.last_name);
        f.append("user_role", atributos.user_role);
        f.append("email", atributos.email);
        f.append("clue", atributos.clue);
        f.append("is_activate", atributos.is_activate);
        f.append("entry_time", atributos.entry_time || "NULL");
        f.append("exit_time", atributos.exit_time || "NULL");
        
        var response = await axios.post(usersURL, f, { params: { id: atributos.id } });
        console.log("Usuario actualizado en la ACTION: ", response.data);
        return dispatch({
          type: UPDATE_USER,
          payload: response.data,
        });
      } catch (err) {
        alert(err);
        throw err;
      }
    };
};

export const DeleteUser = (id) => {
    return async function (dispatch) {
      try {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        var response = await axios.post(usersURL, f, { params: { id: id } });
        return dispatch({
          type: DELETE_USER,
          payload: response.id,
        });
      } catch (err) {
        alert("Error al eliminar usuario: ", err);
      }
    };
};

export const SetAuthenticatedUserId = (id) => {
    return function (dispatch) {
      try {
        console.log(id);
        localStorage.setItem("authenticatedUserId", id);
        return dispatch({
          type: SET_AUTHENTICATED_USER_ID,
          payload: id,
        });
      } catch (error) {
        console.log(error);
      }
    };
};

// SUPPLIERS ACTIONS
export const GetSuppliers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(suppliersURL);
            return dispatch({
                type: GET_SUPPLIERS,
                payload: response.data || [],
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetSupplierDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${suppliersURL}?id=${id}`);
            return dispatch({
                type: GET_ID_SUPPLIER,
                payload: response.data || [],
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostSupplier = (atributos) => {
    return async function (dispatch) {
        try {
            const f = new FormData();
            f.append("METHOD", "POST");
            f.append("supplier_name", atributos.supplier_name);
            f.append("cuit_or_cuil", atributos.cuit_or_cuil);
            f.append("iva_condition", atributos.iva_condition);
            f.append("current_account", atributos.current_account);
            f.append("is_activate", 1);

            const response = await axios.post(suppliersURL, f);

            return dispatch({
                type: POST_SUPPLIER,
                payload: response.data,
            });
        } catch (err) {
            alert(err);
            throw err;
        }
    };
};

export const UpdateSupplier = (id, atributos) => {
    return async function (dispatch) {
        try {
            const f = new FormData();
            f.append("METHOD", "PUT");
            f.append("supplier_name", atributos.supplier_name);
            f.append("cuit_or_cuil", atributos.cuit_or_cuil);
            f.append("iva_condition", atributos.iva_condition);
            f.append("current_account", atributos.current_account);
            f.append("is_activate", atributos.is_activate);

            const response = await axios.post(suppliersURL, f, { params: { id: atributos.id } });
            console.log("Proveedor actualizado en la ACTION: ", response.data);
            return dispatch({
                type: UPDATE_SUPPLIER,
                payload: response.data,
            });
        } catch (err) {
            alert(err);
            throw err;
        }
    };
};

export const DeleteSupplier = (id) => {
    return async function (dispatch) {
        try {
            const f = new FormData();
            f.append("METHOD", "DELETE");
            const response = await axios.post(suppliersURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_SUPPLIER,
                payload: response.id,
            });
        } catch (err) {
            alert("Error al eliminar proveedor: ", err);
        }
    };
};

// CLIENTS ACTIONS
export const GetClients = () => {
    return async function (dispatch) {
        try {
            console.log("clientes", clientsURL)
            const response = await axios.get(clientsURL);
            return dispatch({
                type: GET_CLIENTS,
                payload: response.data || [],
            });
           
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const GetClientDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${clientsURL}?id=${id}`);
            return dispatch({
                type: GET_ID_CLIENT,
                payload: response.data || [],
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const PostClient = (atributos) => {
    return async function (dispatch) {
        try {
            const f = new FormData();
            f.append("METHOD", "POST");
            f.append("client_name", atributos.client_name);
            f.append("cuit_or_cuil", atributos.cuit_or_cuil);
            f.append("iva_condition", atributos.iva_condition);
            f.append("tax_domicile", atributos.tax_domicile);
            f.append("locality", atributos.locality);
            f.append("email", atributos.email);
            f.append("phone", atributos.phone);
            f.append("current_account", atributos.current_account);
            f.append("is_activate", 1);

            const response = await axios.post(clientsURL, f);

            return dispatch({
                type: POST_CLIENT,
                payload: response.data,
            });
        } catch (err) {
            alert(err);
            throw err;
        }
    };
};

export const UpdateClient = (id, atributos) => {
    return async function (dispatch) {
        try {
            const f = new FormData();
            f.append("METHOD", "PUT");
            f.append("client_name", atributos.client_name);
            f.append("cuit_or_cuil", atributos.cuit_or_cuil);
            f.append("iva_condition", atributos.iva_condition);
            f.append("tax_domicile", atributos.tax_domicile);
            f.append("locality", atributos.locality);
            f.append("email", atributos.email);
            f.append("phone", atributos.phone);
            f.append("current_account", atributos.current_account);
            f.append("is_activate", atributos.is_activate);

            const response = await axios.post(clientsURL, f, { params: { id: atributos.id } });
            console.log("Cliente actualizado en la ACTION: ", response.data);
            return dispatch({
                type: UPDATE_CLIENT,
                payload: response.data,
            });
            console.log(payload)
        } catch (err) {
            alert(err);
            throw err;
        }
    };
};

export const DeleteClient = (id) => {
    return async function (dispatch) {
        try {
            const f = new FormData();
            f.append("METHOD", "DELETE");
            const response = await axios.post(clientsURL, f, { params: { id: id } });
            return dispatch({
                type: DELETE_CLIENT,
                payload: response.id,
            });
        } catch (err) {
            alert("Error al eliminar cliente: ", err);
        }
    };
};
