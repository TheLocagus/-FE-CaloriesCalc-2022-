import React from "react";
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

import "./Meal.css"


interface Props {
    mealId: number;
}

export const Meal = ({ mealId}: Props) => {
    const {meals} = useSelector((store: RootState) => store.caloriesCalculator);

    return (
        <div className="meal">
            <MealHeader
                mealId={mealId}
            />
            <MealAddingNewProduct
                mealId={mealId}
            />
            <MealProducts
                mealId={mealId}
            />
            <MealSummary
                mealId={mealId}
            />

            {
                meals.length > 1
                    ? <div className="separator"></div>
                    : null
            }
        </div>
    )
}