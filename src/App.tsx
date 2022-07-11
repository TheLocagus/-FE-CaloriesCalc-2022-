import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {CaloriesCalculatorView} from "./components/views/CaloriesCalculatorView";
import {Header} from "./components/Header/Header";
import Modal from "react-modal";
import {LoginView} from "./components/views/LoginView";
import {RegistrationView} from "./components/views/RegistrationView";
import {ChangePasswordView} from "./components/views/ChangePasswordView";
import {ProtectedRoute} from "./components/common/PrivateRoute/ProtectedRoute";
import './App.css';
import {FavouritesView} from "./components/views/FavouritesView";
import {Logout} from "./components/User/Logout/Logout";
import {CustomError} from "./components/common/Error/CustomError";
import {NotFoundView} from "./components/views/NotFoundView/NotFoundView";
import {useSelector} from "react-redux";
import {RootState} from "./store";


export const App = () => {
    Modal.setAppElement('#root');
    const {error} = useSelector((store: RootState) => store.caloriesCalculator);

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<CaloriesCalculatorView/>}/>
                <Route path="/auth/login" element={<LoginView/>}/>
                <Route path="/auth/register" element={<RegistrationView/>}/>
                <Route path="/auth/logout" element={
                    <ProtectedRoute>
                        <Logout/>
                    </ProtectedRoute>
                }/>
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
                {
                    error === null
                        ? <Route path="/error" element={<CustomError error={error}/>}/>
                        : <Route path="/error" element={<CustomError message={error.message} status={error.status}/>}/>
                }
                <Route path="*" element={<NotFoundView/>}/>
            </Routes>
        </div>
    );
}

