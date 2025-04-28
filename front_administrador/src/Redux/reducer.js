const initialState = {
    users: [],
    userDetail: [],
    authenticatedUserId: null,
    suppliers: [],
    supplierDetail: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
      case "GET_USERS":
        return {
          ...state,
          users: action.payload,
        };
  
      case "GET_ID_USER":
        return {
          ...state,
          userDetail: action.payload,
        };
  
      case "POST_USER":
        return {
          ...state,
        };
  
      case "UPDATE_USER":
        return {
          ...state,
          users: state.users.map((item) => {
            return item.id === action.payload.id ? action.payload : item;
          }),
        };
  
      case "DELETE_USER":
        return {
          ...state,
          users: state.users.filter((item) => item.id !== action.payload),
        };
  
      case "SET_AUTHENTICATED_USER_ID":
        return {
          ...state,
          authenticatedUserId: action.payload,
        };
        
        case "GET_SUPPLIERS":
          return {
            ...state,
            suppliers: action.payload,
          };
  
        case "GET_ID_SUPPLIER":
          return {
            ...state,
            supplierDetail: action.payload,
          };
  
        case "POST_SUPPLIER":
          return {
            ...state,
          };
  
        case "UPDATE_SUPPLIER":
          return {
            ...state,
            suppliers: state.suppliers.map((item) => 
              item.id === action.payload.id ? action.payload : item
            ),
          };
  
        case "DELETE_SUPPLIER":
          return {
            ...state,
            suppliers: state.suppliers.filter((item) => item.id !== action.payload),
          };
  
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;
  