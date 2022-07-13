import React, {useEffect} from "react";
import {Meal} from "./Meal/Meal";
import {MealsSummary} from "./MealsSummary/MealsSummary";
import {AddMeal} from "./AddMeal/AddMeal";
import {setError, setMeals, setProductsList} from "../../actions/caloriesCalclator";
import {ErrorEntity, ProductEntity } from "types";
import {RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";

import './CaloriesCalculator.css'
import {apiUrl} from "../../config/api";

interface ProductsJsonResponse {
    products: ProductEntity[];
    success: true,
}

export const CaloriesCalculator = () => {
    const {meals} = useSelector((store: RootState) => store.caloriesCalculator)
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const res = await fetch(apiUrl);
            const data: ProductsJsonResponse | ErrorEntity = await res.json();
            if(!data.success){
                dispatch(setError(data))
            }
            if(data.success){
                dispatch(setProductsList(data.products));
            }
        })()

        return ()=> {
            dispatch(setMeals([]));
        }
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