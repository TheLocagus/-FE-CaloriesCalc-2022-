import React, {useCallback} from "react";
import { ProductEntity } from "types";
import {ProductEnum} from "../Meal/MealSummary/MealSummary";

interface Props {
    meals: ProductEntity[][] | []
}

export const MealsSummary = ({meals}: Props) => {
    console.log('render')
    const macroSummary = useCallback((macro: ProductEnum) => {
        switch (macro) {
            case ProductEnum.Proteins:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map((meal, i) => {
                            if (meal[0] === undefined) return 0
                            console.log(meal)
                            return meal[0].proteins
                        })
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Carbohydrates:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map(meal => {
                            if (meal[0] === undefined) return 0
                            return meal[0].carbohydrates
                        })
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Fats:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map(meal => {
                            if (meal[0] === undefined) return 0
                            return meal[0].fats
                        })
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Calories:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map(meal => {
                            if (meal[0] === undefined) return 0
                            return meal[0].calories
                        })
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            default:
                return 0
        }
    }, [meals])


    return (
        <div className="meals-summary">
            <header className="meals-summary__header">
                <p>Podsumowanie:</p>
            </header>
            <div className="meals-summary__proteins">
                <p>Białko: {macroSummary(ProductEnum.Proteins)}g</p>
            </div>
            <div className="meals-summary__carbo">
                <p>Węglowodany: {macroSummary(ProductEnum.Carbohydrates)}g</p>
            </div>
            <div className="meals-summary__fats">
                <p>Tłuszcze: {macroSummary(ProductEnum.Fats)}g</p>
            </div>
            <div className="meals-summary__calories">
                <p>Kalorie: {macroSummary(ProductEnum.Calories)}kcal</p>
            </div>
        </div>
    )
}