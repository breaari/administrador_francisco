import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetUserDetail } from "../src/Redux/actions";


const UserAuthentication = ({ id }) => {
  const dispatch = useDispatch();
  const authenticatedUserId = localStorage.getItem("authenticatedUserId");

  useEffect(() => {
    // Verificar si el ID en la URL coincide con el ID del usuario autenticado
    if (authenticatedUserId !== id) {
      // Si no coincide, redirigir 
      window.location.href = "/login";
    } else {
      // Si coincide, cargar los detalles del usuario
      dispatch(GetUserDetail(id));
    }
  }, [dispatch, id, authenticatedUserId]);

  return null;
};

export default UserAuthentication;
