import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

interface Props {
    children: JSX.Element
}

export const ProtectedRoute = ({children}: Props) => {
    const {user} = useSelector((store: RootState) => store.caloriesCalculator);

    if (user !== null) {
        return children
    }
    return <Navigate to="/signin"/>

};
