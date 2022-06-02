import React, {useEffect} from "react";
import {Meal} from "./Meal/Meal";
import {MealsSummary} from "./MealsSummary/MealsSummary";
import {AddMeal} from "./AddMeal/AddMeal";
import {ProductEntity} from 'types';
import './CaloriesCalculator.css'
import {useDispatch, useSelector} from "react-redux";
import {setMeals, setProductsList} from "../../actions/caloriesCalclator";
import {RootState} from "../../store";

export const CaloriesCalculator = () => {
    const {meals} = useSelector((store: RootState) => store.caloriesCalculator)
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3002');
            const data = await res.json();
            dispatch(setProductsList(data));
        })()
    }, [dispatch])

    return (
        <>
            <div className="calc-wrap">
                {
                    meals.length > 0
                        ? [...meals].map((meal, i) =><Meal
                            mealId={i}
                            key={i}
                        />)
                        : null
                }
                <AddMeal />
                {
                    meals.length > 0
                    ? <MealsSummary
                        />
                    : null
                }
            </div>
        </>
    )
}