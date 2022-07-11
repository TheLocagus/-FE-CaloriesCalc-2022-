import React from "react";
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number;
}

export const FatsFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__fats meals-summary-info">
            <p><small>F:</small> {macroSummary(ProductEnum.Fats)}<small>g</small></p>
        </div>
    )
}