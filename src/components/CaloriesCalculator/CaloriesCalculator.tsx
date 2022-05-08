import React, {useEffect, useState} from "react";
import {Meal} from "./Meal/Meal";
import {MealsSummary} from "./MealsSummary/MealsSummary";
import {AddMeal} from "./AddMeal/AddMeal";
import {ProductEntity} from 'types';

export const CaloriesCalculator = () => {
    const [productsList, setProductsList] = useState<ProductEntity[] | []>([]);
    const [meals, setMeals] = useState<ProductEntity[][] | []>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3002');
            const data = await res.json();
            setProductsList(data);
        })()
    }, [])

    const addMeal = () => {
        const newMeal: ProductEntity[] = []
        const listWithNewMeal = [...meals, newMeal]
        setMeals(prevState => listWithNewMeal)
    }

    const removeMeal = (index: number) => {
        const mealsAfterRemove: ProductEntity[][] | [] = [...meals]
            .filter((meal, i) => i !== index)
        setMeals(mealsAfterRemove)
    }
    return (
        <>
            <div className="calc-wrap">
                {
                    meals.length > 0
                        ? [...meals].map((meal, i) =><Meal
                            mealId={i}
                            key={i}
                            productsList={productsList}
                            setMeals={setMeals}
                            meals={meals}
                            removeMeal={removeMeal}
                        />)
                        : null
                }
                {
                    meals.length > 0
                    ? <MealsSummary meals={meals}/>
                    : null
                }
                <AddMeal addMeal={addMeal}/>
            </div>
        </>
    )
}