import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import {ProductEntity} from "types";
import {MealEntity} from "../../CaloriesCalculator";

interface Props {
    numberOfMeal: number
    meal: ProductEntity[]
    setMeals: Dispatch<SetStateAction<[] | MealEntity[]>>
    meals: MealEntity[]
    id: number
}

enum ProductEnum {
    Proteins,
    Carbohydrates,
    Fats,
    Calories,
}

export const MealSummary = ({numberOfMeal, meal, setMeals, id, meals}: Props) => {

    const macroSummary = useCallback((macro: ProductEnum) => {
        switch (macro) {
            case ProductEnum.Proteins:
                return meal.length !== 0 ?
                    Number([...meal]
                        .map((product) => product.proteins)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Carbohydrates:
                return meal.length !== 0 ?
                    Number([...meal]
                        .map((product) => product.carbohydrates)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Fats:
                return meal.length !== 0 ?
                    Number([...meal]
                        .map((product) => product.fats)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            case ProductEnum.Calories:
                return meal.length !== 0 ?
                    Number([...meal]
                        .map((product) => product.calories)
                        .reduce((prev, curr) => prev + curr)
                        .toFixed(2))
                    : 0
            default:
                return 0
        }
    }, [meal])
    useEffect(()=>{
        const macroInMeal: MealEntity = {
            id,
            proteins: macroSummary(ProductEnum.Proteins),
            carbohydrates: macroSummary(ProductEnum.Carbohydrates),
            fats: macroSummary(ProductEnum.Fats),
            calories: macroSummary(ProductEnum.Calories)
        }

        const newState = [...meals]
            .map(meal => {
                if(meal.id !== id) return meal;
                return macroInMeal
            })
        setMeals(prevState => newState)

    }, [id, macroSummary, meals, setMeals])

    return (
        <div className="meal__meal-summary meal-summary">
            <div className="meal-summary__header">
                <p>Posiłek {numberOfMeal} zawiera łącznie: </p>
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