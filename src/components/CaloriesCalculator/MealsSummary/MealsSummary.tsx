import React, {useCallback} from "react";
import {MealEntity} from "../CaloriesCalculator";
import {ProductEnum} from "../Meal/MealSummary/MealSummary";

interface Props {
    meals: MealEntity[] | []
}

export const MealsSummary = ({meals}: Props) => {

    const macroSummary = useCallback((macro: ProductEnum) => {
        switch (macro) {
            case ProductEnum.Proteins:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map((product) => product.proteins)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Carbohydrates:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map((product) => product.carbohydrates)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Fats:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map((product) => product.fats)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Calories:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map((product) => product.calories)
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
                <p>Węglowodany:  {macroSummary(ProductEnum.Carbohydrates)}g</p>
            </div>
            <div className="meals-summary__fats">
                <p>Tłuszcze:  {macroSummary(ProductEnum.Fats)}g</p>
            </div>
            <div className="meals-summary__calories">
                <p>Kalorie:  {macroSummary(ProductEnum.Calories)}kcal</p>
            </div>
        </div>
    )
}