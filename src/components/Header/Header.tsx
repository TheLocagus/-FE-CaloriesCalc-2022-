import React from 'react';
import "./Header.css";
import {Button} from "../common/Button";
import {Link} from "react-router-dom";

export const Header = () => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return (
        <>
            <header className="app-header">
                <div className="logo">
                    <Link to="/">FitApp - Calories Calculator, by Locagus</Link>
                </div>
                {
                    user !== null
                        ? <div> Witaj {user.username}</div>
                        : <div className="header-functionality">
                            <div className="signin">
                                <Link to="/signin">Login</Link>
                            </div>
                            <div className="signup">
                                <Link to="/signup">Registration</Link>
                            </div>
                        </div>
                }

            </header>
        </>
    )
}