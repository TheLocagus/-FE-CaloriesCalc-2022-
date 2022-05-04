import React, {useEffect, useState} from "react";
import {Meal} from "./Meal/Meal";
import {MealsSummary} from "./MealsSummary/MealsSummary";
import {AddMeal} from "./AddMeal/AddMeal";
import {ProductEntity} from 'types';
export interface MealEntity {
    id: number;
}
export const CaloriesCalculator = () => {
    const [productsList, setProductsList] = useState<ProductEntity[] | []>([]);
    const [meals, setMeals] = useState<JSX.Element[] | []>([]);
    const [id, setId] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3002');
            const data = await res.json();
            setProductsList(data);
        })()
    }, [])

    const addMeal = () => {
        const listWithNewMeal = [...meals, <Meal
            id={id}
            key={id}
            productsList={productsList}
            setMeals={setMeals}
            meals={meals}
            removeMeal={removeMeal}/>
        ]
        setId(prevState => prevState + 1)
        setMeals(prevState => listWithNewMeal)
    }

    const removeMeal = (id: number) => {
        const mealsAfterRemove = [...meals]
            .filter(meal => {
                    return meal.props.id !== id
                }
            )

        setMeals(prevState => [...mealsAfterRemove])
    }
    return (
        <>
            <div className="calc-wrap">
                {
                    meals.length > 0
                        ? [...meals].map((meal, i) =><Meal
                            id={meal.props.id}
                            key={meal.props.id}
                            productsList={productsList}
                            setMeals={setMeals}
                            meals={meals}
                            removeMeal={removeMeal}/>)
                        : null
                }
                <MealsSummary/>
                <AddMeal addMeal={addMeal}/>
            </div>
        </>
    )
}