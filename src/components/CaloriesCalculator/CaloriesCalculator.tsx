import React, {useEffect} from "react";
import {Meal} from "./Meal/Meal";
import {MealsSummary} from "./MealsSummary/MealsSummary";
import {AddMeal} from "./AddMeal/AddMeal";
import {setProductsList} from "../../actions/caloriesCalclator";
import {ProductInterfaceResponse } from "types";
import {RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";

import './CaloriesCalculator.scss'
import {apiUrl} from "../../config/api";

export const CaloriesCalculator = () => {
    const {meals} = useSelector((store: RootState) => store.caloriesCalculator)
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/product`, {
                credentials: "include",
            });
            const data: ProductInterfaceResponse = await res.json();
            if(!data.success){
                // dispatch(setError(data))
                console.log(data.message)
            }
            if(data.success){
                dispatch(setProductsList(data.products));
            }
        })()

        // return ()=> {
        //     dispatch(setMeals([]));
        // }
    }, [dispatch])


    return (
        <>
            <div className="calc-wrap">
                {
                    meals.length > 0
                        ? [...meals].map((meal, i) =><Meal
                            mealIndex={i}
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