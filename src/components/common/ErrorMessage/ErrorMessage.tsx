import React from 'react';

import './ErrorMessage.scss';

interface Props {
    message: string;
}

export const ErrorMessage = ({message}: Props) => {

    return (
        <div className="error-message">
            <p><small>{message}</small></p>
        </div>
    )
}