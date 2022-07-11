import React from 'react';
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number
}

export const ProteinsFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__proteins meals-summary-info">
            <p><small>P:</small> {macroSummary(ProductEnum.Proteins)}<small>g</small></p>
        </div>
    )
}