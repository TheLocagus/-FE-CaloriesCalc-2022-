import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {ProductEntity} from "types";
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";

interface Props {
    productsList: ProductEntity[] | [];
    id: number;
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    meals: ProductEntity[][] | []
    removeMeal: (id: number)=> void
}

export const Meal = ({productsList, id, setMeals, meals, removeMeal}: Props) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [meal, setMeal] = useState<ProductEntity[] | []>([])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const addNewProduct = (newProduct: ProductEntity) => {
        const oldMeal = [...meals][id]
        const actualMeal = [...oldMeal, newProduct]
        const mealsToUpdate = [...meals].map((meal, i) => {
            if(i !== id) return meal
            return actualMeal
        })
        setMeals(prevState => mealsToUpdate)
    }

    return (
        <div className="meal">
            <MealHeader
                removeMeal={removeMeal}
                id={id}
            />
            <MealAddingNewProduct
                addNewProduct={addNewProduct}
                handleInput={handleInput}
                inputValue={inputValue}
                productsList={productsList}
            />
            <MealProducts
                meals={meals}
                id={id}
                setMeals={setMeals}
            />
            <MealSummary
                id={id}
                meal={meal}
                meals={meals}
                setMeals={setMeals}
            />
        </div>
    )
}