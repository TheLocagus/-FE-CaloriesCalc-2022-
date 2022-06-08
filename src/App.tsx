import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {CaloriesCalculatorView} from "./components/views/CaloriesCalculatorView";
import {Header} from "./components/Header/Header";
import Modal from "react-modal";
import {Provider} from "react-redux";
import {store} from "./store";
import {LoginView} from "./components/views/LoginView";
import {RegistrationView} from "./components/views/RegistrationView";
import './App.css';
import {ChangePasswordView} from "./components/views/ChangePasswordView";
import {ProtectedRoute} from "./components/PrivateRoute/ProtectedRoute";

export const App = () => {
    Modal.setAppElement('#root');
    const token = localStorage.getItem('token');
    return (
        <div className="App">
            <Provider store={store}>
                <Header/>
                <Routes>
                    <Route path="/" element={<CaloriesCalculatorView/>}/>
                    <Route path="/signin" element={<LoginView/>}/>
                    <Route path="/signup" element={<RegistrationView/>}/>
                    <Route
                        path="/change-password"
                        element={
                            <ProtectedRoute isAuth={!!token}>
                                <ChangePasswordView/>
                            </ProtectedRoute>}
                    />

                </Routes>
            </Provider>
        </div>
    );
}

