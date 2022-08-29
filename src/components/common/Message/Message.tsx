import React from 'react';

import './Message.scss';

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