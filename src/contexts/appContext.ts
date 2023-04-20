import { createContext } from "react";


export function AppProvider({children}){
    const GlobalContext = createContext('');
    return (
        <GlobalContext.Provider value={{item: 0}}>
            {children}
        </GlobalContext.Provider>
    )
}
