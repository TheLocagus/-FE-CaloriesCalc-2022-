import React from "react";

interface Props {
    removeMeal: (id: number) => void;
    id: number;
}

export const MealHeader = ({removeMeal, id}: Props) => {

    return (
        <div className="meal__header">
            <p>Posiłek {id}</p>
            <button onClick={() => removeMeal(id)} className="remove-meal">Usuń</button>
        </div>
    )
}