import React, {useEffect, useState} from "react";
import {Meal} from "./Meal/Meal";
import {MealsSummary} from "./MealsSummary/MealsSummary";
import {AddMeal} from "./AddMeal/AddMeal";
import {ProductEntity} from 'types';
import './CaloriesCalculator.css'
import {useDispatch} from "react-redux";
import {setProductsList} from "../../actions/caloriesCalclator";

export const CaloriesCalculator = () => {
    const [meals, setMeals] = useState<ProductEntity[][] | []>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3002');
            const data = await res.json();
            dispatch(setProductsList(data));
        })()
    }, [dispatch])

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
                            setMeals={setMeals}
                            meals={meals}
                            removeMeal={removeMeal}
                        />)
                        : null
                }
                <AddMeal addMeal={addMeal}/>
                {
                    meals.length > 0
                    ? <MealsSummary
                            meals={meals}
                        />
                    : null
                }
            </div>
        </>
    )
}