import React from 'react';
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number
}

export const ProteinsFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__proteins">
            <p>Białko: {macroSummary(ProductEnum.Proteins)}g</p>
        </div>
    )
}