import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {ProductEntity} from "types";
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";
import "./Meal.css"

interface Props {
    productsList: ProductEntity[] | [];
    mealId: number;
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    meals: ProductEntity[][] | []
    removeMeal: (id: number)=> void
}

export const Meal = ({productsList, mealId, setMeals, meals, removeMeal}: Props) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const addNewProduct = (newProduct: ProductEntity) => {
        const oldMeal = [...meals][mealId]
        const actualMeal = [...oldMeal, newProduct]
        const mealsToUpdate = [...meals].map((meal, i) => {
            if(i !== mealId) return meal
            return actualMeal
        })
        setMeals(prevState => mealsToUpdate)
    }

    return (
        <div className="meal">
            <MealHeader
                removeMeal={removeMeal}
                mealId={mealId}
            />
            <MealAddingNewProduct
                addNewProduct={addNewProduct}
                handleInput={handleInput}
                inputValue={inputValue}
                productsList={productsList}
            />
            <MealProducts
                meals={meals}
                mealId={mealId}
                setMeals={setMeals}
                productsList={productsList}
            />
            <MealSummary
                mealId={mealId}
                meals={meals}
                setMeals={setMeals}
            />

            {
                meals.length > 1
                    ? <div className="separator"></div>
                    : null
            }
        </div>
    )
}