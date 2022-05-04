import React from "react";


interface Props {
    addMeal: () => void;
}
export const AddMeal = ({addMeal}: Props) => {

    return (
        <button onClick={addMeal} className="add-meal">Dodaj posiłek</button>
    )
}