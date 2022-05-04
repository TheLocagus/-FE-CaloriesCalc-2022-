import React from "react";

interface Props {
    removeMeal: (id: number) => void;
    id: number;
    numberOfMeal: number;
}

export const MealHeader = ({removeMeal, id, numberOfMeal}: Props) => {

    return (
        <div className="meal__header">
            <p>Posiłek {numberOfMeal}</p>
            <button onClick={() => removeMeal(id)} className="remove-meal">Usuń</button>
        </div>
    )
}