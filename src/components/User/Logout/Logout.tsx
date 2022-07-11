import React, {useEffect} from "react";

export const Logout = () => {

    useEffect(() => {
        (async() => {
            const res = await fetch('http://localhost:3002/auth/logout', {
                credentials: "include",
            })
            const data = await res.json();

            if (data.success === true) {
                localStorage.removeItem('username');
                localStorage.removeItem('id');
                window.location.href = 'http://localhost:3000';
            }
        })()
    }, [])

    return (
        <h2>Logout is in progres...</h2>
    )
}