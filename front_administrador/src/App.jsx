// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import './App.css';
// import Login from './components/Login/Login';
// import Navbar from "./components/Navbar/Navbar";
// import { Managment } from "./components/Managment/Managment";
// import { Users } from "./components/Managment/Users/users";

// const App = () => {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/administrador/");

//   return (
//     <div className="flex">
//       {/* Solo mostrar el Menu si la ruta empieza con /administrador */}
//       {isAdminRoute && <Managment />}

//       <div className="flex-1">
//         <Routes>
//           <Route path="/" element={<Navbar />} />
//           <Route path="/login" element={<Login />} />

//           {/* Redirigir si alguien entra a /administrador */}
//           <Route path="/administrador" element={<Navigate to="/login" replace />} />

//           {/* Ruta para acceder a Managment */}
//           <Route path="/administrador/:id" element={<Managment/>} />

//           {/* Ruta para el gestor de usuarios, depende del id */}
//           <Route path="/administrador/:id/usuarios" element={<Users />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import { Managment } from "./components/Managment/Managment";
import { Users } from "./components/Managment/Users/users";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/administrador" element={<Navigate to="/login" replace />} />

      {/* Rutas anidadas dentro del panel administrador */}
      <Route path="/administrador/:id" element={<Managment />}>
        <Route index element={<div className="p-6">Bienvenido al panel de administración</div>} />
        <Route path="usuarios" element={<Users />} />
        {/* Podés agregar más: productos, configuraciones, etc */}
      </Route>
    </Routes>
  );
};

export default App;
