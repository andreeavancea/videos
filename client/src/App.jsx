import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from "./Context";
import { useMemo, useState} from "react";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';


function App() {


    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
    const value = useMemo(
        () => ({isLoggedIn, setIsLoggedIn}),
        [isLoggedIn]
    );


    return (<Context.Provider value={value}>
            <div className="App">
                <BrowserRouter>
                    <Routes>

                        <Route
                            path="/*"
                            exact
                            key="HomePage"
                            element={
                                value.isLoggedIn ? <HomePage/> : <Navigate to="/login" replace/>
                            }
                        />    <Route
                        path="/login"
                        key="AuthPage"
                        exact
                        element={value.isLoggedIn ? <Navigate to="/" replace/> : <AuthPage/>}
                    />
                    </Routes>
                    <ToastContainer/>

                </BrowserRouter>
            </div>
        </Context.Provider>
    );
}

export default App;
