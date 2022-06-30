import React, {useCallback} from "react";
import "./MealSummary.css";
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
        <div className="meal__meal-summary meal-summary">
            <div className="meal-summary__header">
                <p>Posiłek {mealIndex + 1} zawiera łącznie: </p>
            </div>
            <div className="meal-summary__macronutrients">
                <div className="meal-summary-macro meal-summary__proteins">
                    <p><small>B:</small> {macroSummary(ProductEnum.Proteins)}<small>g</small></p>
                </div>
                <div className="meal-summary-macro meal-summary__carbo">
                    <p><small>W:</small> {macroSummary(ProductEnum.Carbohydrates)}<small>g</small></p>
                </div>
                <div className="meal-summary-macro meal-summary__fats">
                    <p><small>T:</small> {macroSummary(ProductEnum.Fats)}<small>g</small></p>
                </div>
                <div className="meal-summary-macro meal-summary__calories">
                    <p><small>K:</small> {macroSummary(ProductEnum.Calories)}<small>kcal</small></p>
                </div>
            </div>
        </div>
    )
}