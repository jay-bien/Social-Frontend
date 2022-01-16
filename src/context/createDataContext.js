import React, { createContext, useReducer } from 'react';

export default createDataContext = ( reducer, actions, initialState ) => {

  const Context = createContext();

  const Provider = ( { children }) => {

    const [ state, dispatch ] = useReducer( reducer, initialState );
    const boundActions = {};
    for( let action in actions ){
      boundActions[ action ] = actions[ action ]( dispatch );
    }
    return (
      <Context.Provider
      value={ { state, ...boundActions } }
      >
{ children }
      </Context.Provider>
    )
  }
}