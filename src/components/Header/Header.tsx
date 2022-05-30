import React from 'react';
import "./Header.css";
import {Button} from "../common/Button";

export const Header = () => {
    return (
        <>
            <header className="app-header">
                <div className="logo">
                    <p>FitApp - Calories Calculator, by Locagus</p>
                </div>
                <div className="header-functionality">
                    <Button className="signin" text="Login" onClick={()=>{}}/>
                    <Button className="signup" text="Registration" onClick={()=>{}}/>
                </div>
            </header>
        </>
    )
}