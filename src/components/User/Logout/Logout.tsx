import React, {useEffect} from "react";
import {apiUrl} from "../../../config/api";

export const Logout = () => {

    useEffect(() => {
        (async() => {
            const res = await fetch(`${apiUrl}/auth/logout`, {
                credentials: "include",
            })
            const data = await res.json();

            if (data.success === true) {
                localStorage.removeItem('username');
                localStorage.removeItem('id');
                window.location.href = 'https://www.bkolsutjs-caloriescalc.networkmanager.pl';
            }
        })()
    }, [])

    return (
        <h2>Logout is in progres...</h2>
    )
}