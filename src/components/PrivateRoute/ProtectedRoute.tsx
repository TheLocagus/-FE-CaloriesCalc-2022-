import React from 'react';
import {Navigate} from "react-router-dom";

interface Props {
    isAuth: boolean,
    children: JSX.Element
}

export const ProtectedRoute = ({isAuth, children}: Props) => {

    if (isAuth) {
        return children
    } else return <Navigate to="/signin"/>

};
