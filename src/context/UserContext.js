import createDataContext from "./createDataContext";

const SET_USER = 'set_user';
const CLEAR_USER='clear_user';

const userReducer = (state, action) => {

  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
      case CLEAR_USER:
        return { ...state, user: null }
  }
}

const setUser = dispatch => {
  return (user) => {
    dispatch({
      type: SET_USER,
      payload: user
    })
  }
}

const clearUser = dispatch => {
  return _ => {
    dispatch({
      type: CLEAR_USER,
    })
  }
}



const { Context, Provider } = createDataContext(userReducer, {
  setUser,
  clearUser
}, {
  user: null
})

export { Context as UserContext, Provider as UserProvider }