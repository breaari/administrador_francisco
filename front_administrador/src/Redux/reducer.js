const initialState = {
    users: [],
    userDetail: [],
    authenticatedUserId: null,
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
        
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;
  