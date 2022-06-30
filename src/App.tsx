import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {CaloriesCalculatorView} from "./components/views/CaloriesCalculatorView";
import {Header} from "./components/Header/Header";
import Modal from "react-modal";
import {LoginView} from "./components/views/LoginView";
import {RegistrationView} from "./components/views/RegistrationView";
import {ChangePasswordView} from "./components/views/ChangePasswordView";
import {ProtectedRoute} from "./components/common/PrivateRoute/ProtectedRoute";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {setUser} from "./actions/caloriesCalclator";
import {FavouritesView} from "./components/views/FavouritesView";


export const App = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    Modal.setAppElement('#root');

    useEffect(()=>{
        if (token){
            const data = JSON.parse(atob(token.split('.')[1]))
            dispatch(setUser(data))
        }
        
    }, [dispatch, token])
    return (
        <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<CaloriesCalculatorView/>}/>
                    <Route path="/signin" element={<LoginView/>}/>
                    <Route path="/signup" element={<RegistrationView/>}/>
                    <Route
                        path="/change-password"
                        element={
                            <ProtectedRoute>
                                <ChangePasswordView/>
                            </ProtectedRoute>}
                    />
                    <Route
                        path="/user/:id/favourites"
                        element={
                            <ProtectedRoute>
                                <FavouritesView/>
                            </ProtectedRoute>}
                    />

                </Routes>
        </div>
    );
}

