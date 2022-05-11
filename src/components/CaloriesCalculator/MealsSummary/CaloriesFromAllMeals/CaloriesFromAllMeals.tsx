import React from "react";
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number;
}

export const CaloriesFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__calories">
            <p>Kalorie: {macroSummary(ProductEnum.Calories)}g</p>
        </div>
    )
}