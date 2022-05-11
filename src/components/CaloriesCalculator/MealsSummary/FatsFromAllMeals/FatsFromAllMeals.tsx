import React from "react";
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number;
}

export const FatsFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__fats">
            <p>Tłuszcze: {macroSummary(ProductEnum.Fats)}g</p>
        </div>
    )
}