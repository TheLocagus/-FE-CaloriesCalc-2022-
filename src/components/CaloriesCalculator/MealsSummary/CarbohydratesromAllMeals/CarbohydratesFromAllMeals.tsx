import React from "react";
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number;
}

export const CarbohydratesFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__carbo meals-summary-info">
            <p><small>W:</small> {macroSummary(ProductEnum.Carbohydrates)}<small>g</small></p>
        </div>
    )
}
