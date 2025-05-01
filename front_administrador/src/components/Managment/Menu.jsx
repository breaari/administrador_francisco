import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { hasStaffAccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetail } from "../../Redux/actions";
import { useEffect, useState } from "react";
import UserAuthentication from "../../userAuthentication";

export const Menu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userDetail = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    dispatch(GetUserDetail(id))
      .then(() => setLoading(false))
      .catch(error => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [dispatch, id]);
  
  const handleNavigation = (path) => {
    // Solo navegar si tenemos el userDetail
    if (userDetail && userDetail.id) {
      navigate(`/administrador/${userDetail.id}/${path}`);
    } else {
      console.error("User details not available for navigation");
    }
  };
  
  // Mostrar loader mientras carga
  if (loading) {
    return (
      <div className="bg-black w-[275px] min-h-screen flex flex-col items-center justify-center">
        <p className="text-white">Cargando...</p>
      </div>
    );
  }
  
  // Verificar que userDetail existe antes de usarlo
  return (
    <>
     <UserAuthentication id={id} />
    
    <div className="bg-black w-[275px] min-h-screen flex flex-col items-center">
      <img src={logo} className="w-[60%] py-8" alt="logo" />
      <a className="text-white pb-8">
        {userDetail && userDetail.first_name ? userDetail.first_name : "Usuario"}
      </a>
      <button
        className="text-white border rounded-2xl py-1 px-4 mb-2"
        onClick={() => handleNavigation("usuarios")}
      >
        Gestor de usuarios
      </button>
      <button
        className="text-white border rounded-2xl py-1 px-4 mb-2"
        onClick={() => handleNavigation("proveedores")}
      >
        Gestor de proveedores
      </button>
      <button
        className="text-white border rounded-2xl py-1 px-4 mb-2"
        onClick={() => handleNavigation("clientes")}
      >
        Gestor de clientes
      </button>
    </div>
    </>
  );
};