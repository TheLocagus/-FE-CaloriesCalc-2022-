import React, {useCallback} from "react";
import "./MealSummary.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

interface Props {
    mealIndex: number
}

export enum ProductEnum {
    Proteins,
    Carbohydrates,
    Fats,
    Calories,
}

export const MealSummary = ({mealIndex}: Props) => {

    const {meals} = useSelector((store: RootState) => store.caloriesCalculator)

    const macroSummary = useCallback((macro: ProductEnum) => {
        switch (macro) {
            case ProductEnum.Proteins:
                return meals[mealIndex].length !== 0 ?
                    Number([...meals][mealIndex]
                        .map((product) => product.proteins)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Carbohydrates:
                return meals[mealIndex].length !== 0 ?
                    Number([...meals][mealIndex]
                        .map((product) => product.carbohydrates)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Fats:
                return meals[mealIndex].length !== 0 ?
                    Number([...meals][mealIndex]
                        .map((product) => product.fats)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Calories:
                return meals[mealIndex].length !== 0 ?
                    Number([...meals][mealIndex]
                        .map((product) => product.calories)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            default:
                return 0
        }
    }, [mealIndex, meals])

    return (
        <div className="meal__meal-summary">
            <div className="meal__meal-summary__header">
                <p>Meal #{mealIndex + 1} extends: </p>
            </div>
            <div className="meal__meal-summary__macronutrients">
                <div className="meal__meal-summary__macronutrients__proteins">
                    <p><small>P:</small> {macroSummary(ProductEnum.Proteins)}<small>g</small></p>
                </div>
                <div className="meal__meal-summary__macronutrients__carbohydrates">
                    <p><small>C:</small> {macroSummary(ProductEnum.Carbohydrates)}<small>g</small></p>
                </div>
                <div className="meal__meal-summary__macronutrients__fats">
                    <p><small>F:</small> {macroSummary(ProductEnum.Fats)}<small>g</small></p>
                </div>
                <div className="meal__meal-summary__macronutrients__calories">
                    <p><small>Cal:</small> {macroSummary(ProductEnum.Calories)}</p>
                </div>
            </div>
        </div>
    )
}