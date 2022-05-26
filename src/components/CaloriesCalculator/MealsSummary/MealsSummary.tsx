import React, {useCallback} from "react";
import {ProductEntity} from "types";
import {ProductEnum} from "../Meal/MealSummary/MealSummary";
import {ProteinsFromAllMeals} from "./ProteinsFromAllMeals/ProteinsFromAllMeals";
import {CarbohydratesFromAllMeals} from "./CarbohydratesromAllMeals/CarbohydratesFromAllMeals";
import {FatsFromAllMeals} from "./FatsFromAllMeals/FatsFromAllMeals";
import {CaloriesFromAllMeals} from "./CaloriesFromAllMeals/CaloriesFromAllMeals";
import './MealsSummary.css';

interface Props {
    meals: ProductEntity[][] | []
}

export const MealsSummary = ({meals}: Props) => {
    const macroSummary = useCallback((macro: ProductEnum) => {
        switch (macro) {
            case ProductEnum.Proteins:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map(meal => {
                            if (meal === undefined || meal.length === 0) return 0
                            return meal.map(product => product.proteins).reduce((prev, curr) => prev + curr)
                        })
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Carbohydrates:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map(meal => {
                            if (meal === undefined || meal.length === 0) return 0
                            return meal.map(product => product.carbohydrates).reduce((prev, curr) => prev + curr)
                        })
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Fats:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map(meal => {
                            if (meal === undefined || meal.length === 0) return 0
                            return meal.map(product => product.fats).reduce((prev, curr) => prev + curr)
                        })
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Calories:
                return meals.length !== 0 ?
                    Number([...meals]
                        .map(meal => {
                            if (meal === undefined || meal.length === 0) return 0
                            return meal.map(product => product.calories).reduce((prev, curr) => prev + curr)
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
            <div className="meals-summary__macronutrients">
                <ProteinsFromAllMeals macroSummary={macroSummary}/>
                <CarbohydratesFromAllMeals macroSummary={macroSummary}/>
                <FatsFromAllMeals macroSummary={macroSummary}/>
                <CaloriesFromAllMeals macroSummary={macroSummary}/>
            </div>
        </div>
    )
}