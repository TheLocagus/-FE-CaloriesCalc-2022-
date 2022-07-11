import React from 'react';

import './Message.css';

interface Props {
    message: string;
}

export const Message = ({message}: Props) => {

    return (
        <div className="message">
            <p><small>{message}</small></p>
        </div>
    )
}