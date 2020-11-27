import React, { createContext, useReducer} from "react";
import AppReducer from "./AppReducer"
import axios from 'axios';

//initial state
let initialState = {
    users: []
};

axios.get(`http://localhost:9090/api/v1/employees`)
    .then(res => {

        const users = res.data;
        initialState = {users};
        console.log(initialState);
    })
    .catch(e => {
       console.error(e);
    });

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions for deleting
    const removeUser = (id) =>{
      dispatch({
          type: 'REMOVE_USER',
          payload: id
      })
    };

    const addUser = (user) =>{
        dispatch({
            type: "ADD_USER",
            payload: user
        })
    };

    const editUser = (user) =>{
        dispatch({
            type: "EDIT_USER",
            payload: user
        })
    };

    return (
        <GlobalContext.Provider value={{users: state.users, removeUser, addUser, editUser}}>
            {children}
        </GlobalContext.Provider>
    )
};
