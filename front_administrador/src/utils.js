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

export const supplierFormData = {
  supplier_name: "",
  cuit_or_cuil: "",
  iva_condition: "",
  current_account: "",
  is_activate: "1", 
};

export const clientFormData = {
  client_name: "",
  iva_condition: "",
  cuit_or_cuil: "",    
  tax_domicile: "",     
  locality: "",        
  phone: "",           
  email: "",          
  current_account: "", 
  is_activate: "1",     
};


// src/utils/clientUtils.js

export const getIvaConditionName = (condition) => {
  switch (condition) {
      case 1: return "Responsable Inscripto";
      case 4: return "IVA Exento";
      case 5: return "Consumidor Final";
      case 6: return "Monotributista";
      default: return "Condición desconocida";
  }
};

export const getCurrentAccountStatus = (status) => {
  return status === 1 ? "Sí" : "No";
};

export const getActivationStatus = (isActive) => {
  return isActive === 1 ? "Activo" : "Inactivo";
};
