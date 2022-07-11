import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Link} from "react-router-dom";
import {AiFillCaretDown} from "react-icons/ai";

import './UsernameWithMenu.css';

export const UsernameWithMenu = () => {
    const {user} = useSelector((store: RootState) => store.caloriesCalculator)

    if (!user) {
        return <h2>Error</h2>
    }

    return (
        <div className='username-with-menu'>
            <p> Witaj {user.username} <span><AiFillCaretDown/></span></p>
            <ul className='menu-dropdown'>
                <li>
                    <Link to={`/user/${user.id}/favourites`}>Favourites</Link>
                </li>
                <li>
                    <Link to={`/auth/logout`}>Logout</Link>
                </li>
            </ul>
        </div>
    )
}