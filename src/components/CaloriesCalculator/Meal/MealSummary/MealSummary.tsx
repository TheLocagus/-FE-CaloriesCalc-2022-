import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import {ProductEntity} from "types";

interface Props {
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    meals: ProductEntity[][]
    mealId: number
}

export enum ProductEnum {
    Proteins,
    Carbohydrates,
    Fats,
    Calories,
}

export const MealSummary = ({setMeals, mealId, meals}: Props) => {

    const macroSummary = useCallback((macro: ProductEnum) => {
        switch (macro) {
            case ProductEnum.Proteins:
                return meals[mealId].length !== 0 ?
                    Number([...meals][mealId]
                        .map((product) => product.proteins)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Carbohydrates:
                return meals[mealId].length !== 0 ?
                    Number([...meals][mealId]
                        .map((product) => product.carbohydrates)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Fats:
                return meals[mealId].length !== 0 ?
                    Number([...meals][mealId]
                        .map((product) => product.fats)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Calories:
                return meals[mealId].length !== 0 ?
                    Number([...meals][mealId]
                        .map((product) => product.calories)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            default:
                return 0
        }
    }, [mealId, meals])

    return (
        <div className="meal__meal-summary meal-summary">
            <div className="meal-summary__header">
                <p>Posiłek {mealId + 1} zawiera łącznie: </p>
            </div>
            <div className="meal-summary__proteins">
                <p>Białko: {macroSummary(ProductEnum.Proteins)}g</p>
            </div>
            <div className="meal-summary__carbo">
                <p>Węglowodany: {macroSummary(ProductEnum.Carbohydrates)}g</p>
            </div>
            <div className="meal-summary__fats">
                <p>Tłuszcze: {macroSummary(ProductEnum.Fats)}g</p>
            </div>
            <div className="meal-summary__calories">
                <p>Kalorie: {macroSummary(ProductEnum.Calories)}g</p>
            </div>
        </div>
    )
}