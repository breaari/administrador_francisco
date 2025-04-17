// Formulario Base de usuario

export const userFormData = {
  first_name: "",
  last_name: "",
  user_role: "",
  email: "",
  clue: "",
  is_activate: 1,
};

// Permiso para Staff
// 0: Programador, 1: Administrador, 2: Empleado

export const hasStaffAccess = (userRole) => {

  console.log(userRole);
  
  return userRole === 0 || userRole === 1 || userRole === 2;
};