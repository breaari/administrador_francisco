import axios from "axios";

export const GET_USERS = "GET_USERS";
export const GET_ID_USER = "GET_ID_USER";
export const POST_USER = "POST_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const SET_AUTHENTICATED_USER_ID = "SET_AUTHENTICATED_USER_ID";

export const GET_SUPPLIERS = "GET_SUPPLIERS";
export const GET_ID_SUPPLIER = "GET_ID_SUPPLIER";
export const POST_SUPPLIER = "POST_SUPPLIER";
export const UPDATE_SUPPLIER = "UPDATE_SUPPLIER";
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";

const usersURL = import.meta.env.VITE_API_USERS_URL;
const suppliersURL = import.meta.env.VITE_API_SUPPLIERS_URL;

export const GetUsers = () => {
    return async function (dispatch) {
      try {
        var response = await axios.get(usersURL);
        if (response.data !== null) {
          return dispatch({
            type: GET_USERS,
            payload: response.data,
          });
        } else {
          return dispatch({
            type: GET_USERS,
            payload: [],
          });
        }
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
        if (response.data) {
          return dispatch({
            type: GET_ID_USER,
            payload: response.data,
          });
        } else {
          return dispatch({
            type: GET_ID_USER,
            payload: [],
          });
        }
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
        if (atributos.entry_time) {
          f.append("entry_time", atributos.entry_time);
        } else {
          f.append("entry_time", "NULL"); 
        }
        
        if (atributos.exit_time) {
          f.append("exit_time", atributos.exit_time);
        } else {
          f.append("exit_time", "NULL"); 
        }
        
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
        
        // Solo agregar estos si no son nulos
        if (atributos.entry_time) {
          f.append("entry_time", atributos.entry_time);
        } else {
          f.append("entry_time", "NULL"); // Enviar valor NULL explícito
        }
        
        if (atributos.exit_time) {
          f.append("exit_time", atributos.exit_time);
        } else {
          f.append("exit_time", "NULL"); // Enviar valor NULL explícito
        }
        
        var response = await axios.post(usersURL, f, { params: { id: atributos.id } }); // Corregí también el error aquí (id era indefinido)
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
          localStorage.setItem("authenticatedUserId", id); // Guardar el ID en localStorage
          return dispatch({
            type: SET_AUTHENTICATED_USER_ID,
            payload: id,
          });
        } catch (error) {
          console.log(error);
        }
      };
    };


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
              f.append("is_activate", 1); // Nuevo proveedor se activa por defecto
          
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

    