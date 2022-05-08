import React from "react";

interface Props {
    removeMeal: (id: number) => void;
    mealId: number;
}

export const MealHeader = ({removeMeal, mealId}: Props) => {

    return (
        <div className="meal__header">
            <p>Posiłek {mealId + 1}</p>
            <button onClick={() => removeMeal(mealId)} className="remove-meal">Usuń</button>
        </div>
    )
}