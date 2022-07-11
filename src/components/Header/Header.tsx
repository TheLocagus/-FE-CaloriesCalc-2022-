import React from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {UsernameWithMenu} from "./UsernameWithMenu/UsernameWithMenu";

export const Header = () => {
    const {user} = useSelector((store: RootState) => store.caloriesCalculator)

    return (
        <>
            <header className="app-header">
                <div className="logo">
                    <Link to="/">FitApp - Calories Calculator, by Locagus</Link>
                </div>

                {
                    user !== null
                        ? <UsernameWithMenu/>
                        : <div className="header-functionality">
                            <div className="signin">
                                <Link to="/auth/login">Login</Link>
                            </div>
                            <div className="signup">
                                <Link to="/auth/register">Registration</Link>
                            </div>
                        </div>
                }

            </header>
        </>
    )
}