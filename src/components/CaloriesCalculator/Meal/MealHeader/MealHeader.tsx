import React from "react";
import './MealHeader.css'
import {useDispatch} from "react-redux";
import {removeMeal} from "../../../../actions/caloriesCalclator";

interface Props {
    mealId: number;
}

export const MealHeader = ({mealId}: Props) => {

    const dispatch = useDispatch();

    return (
        <div className="meal__header">
            <p>Posiłek {mealId + 1}</p>
            <button onClick={() => dispatch(removeMeal(mealId))} className="remove-meal">X</button>
        </div>
    )
}