import React from "react";
import {ProductEnum} from "../../Meal/MealSummary/MealSummary";

interface Props {
    macroSummary: (Enum: number) => number;
}

export const CarbohydratesFromAllMeals = ({macroSummary}: Props) => {

    return (
        <div className="meals-summary__carbo">
            <p>Węglowodany: {macroSummary(ProductEnum.Carbohydrates)}g</p>
        </div>
    )
}
