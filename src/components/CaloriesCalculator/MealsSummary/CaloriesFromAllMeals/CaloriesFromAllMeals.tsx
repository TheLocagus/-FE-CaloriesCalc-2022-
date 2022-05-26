import React from "react";
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number;
}

export const CaloriesFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__calories meals-summary-info">
            <p><small>K:</small> {macroSummary(ProductEnum.Calories)}<small>kcal</small></p>
        </div>
    )
}