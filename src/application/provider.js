import {createContext,useState} from 'react';
export default ({children})=>{
    const [userState,setUserState]=useState({sesion:null});
    const [eventState,setEventState]=useState(false);
    return (
        <AppContext.Provider value={{user:[userState, setUserState],event:[eventState,setEventState]}}>
            {children}
        </AppContext.Provider>
    );
}
export const AppContext=createContext();