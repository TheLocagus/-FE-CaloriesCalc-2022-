import React from "react";

interface Props {
    text: string,
    onClick: () => void;
    className: string;
}

export const Button = ({text, onClick, className}: Props) => (
    <button className={className} onClick={onClick}>{text}</button>
)
