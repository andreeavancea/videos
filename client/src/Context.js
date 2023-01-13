import {createContext} from "react";

const Context = createContext({
    isLoggedIn: false, setIsLoggedIn: () => {
    }
});

export default Context