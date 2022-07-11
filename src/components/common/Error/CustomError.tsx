import React from 'react';
import { ErrorEntity } from 'types';
import {Link} from "react-router-dom";

import './CustomError.css';

interface Props {
    error?: ErrorEntity | null,
    message?: string;
    status?: number;
}

export const CustomError = ({error, message, status}: Props) => {

    if (error === null){
        return (
            <div className="error-page-container">
                <h2>Incorrect page.</h2>
                <Link className='back-to-main-link' to='/'>Back to the main</Link>
            </div>
        )
    }
    return (
        <div className="error-page-container">
            <h2>Error #{status}</h2>
            <p><b>{message}</b></p>
            <Link className='back-to-main-link' to='/'>Back to the main</Link>
        </div>
    )
}