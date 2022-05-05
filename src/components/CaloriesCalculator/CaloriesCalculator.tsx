import React, {useEffect, useState} from "react";
import {Meal} from "./Meal/Meal";
import {MealsSummary} from "./MealsSummary/MealsSummary";
import {AddMeal} from "./AddMeal/AddMeal";
import {ProductEntity} from 'types';
export interface MealEntity{
    id: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
    calories: number;
}

export const CaloriesCalculator = () => {
    const [productsList, setProductsList] = useState<ProductEntity[] | []>([]);
    const [meals, setMeals] = useState<MealEntity[] | []>([]);
    const [id, setId] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3002');
            const data = await res.json();
            setProductsList(data);
        })()
    }, [])
    console.log('iksde')

    const addMeal = () => {
        const newMeal: MealEntity = {
            id,
            proteins: 0,
            carbohydrates: 0,
            fats: 0,
            calories: 0,
        }
        const listWithNewMeal = [...meals, newMeal]
        setId(prevState => prevState + 1)
        setMeals(prevState => listWithNewMeal)
    }

    const removeMeal = (id: number) => {
        const mealsAfterRemove: MealEntity[] | [] = [...meals]
            .filter(meal => {
                    return meal.id !== id
                }
            )
        console.log(mealsAfterRemove)

        setMeals(mealsAfterRemove)
    }
    return (
        <>
            <div className="calc-wrap">
                {
                    meals.length > 0
                        ? [...meals].map((meal, i) =><Meal
                            id={meal.id}
                            key={meal.id}
                            productsList={productsList}
                            setMeals={setMeals}
                            meals={meals}
                            removeMeal={removeMeal}/>)
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