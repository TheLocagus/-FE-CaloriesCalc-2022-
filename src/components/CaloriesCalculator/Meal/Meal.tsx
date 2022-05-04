import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {ProductEntity} from "types";
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";
import {MealEntity} from "../CaloriesCalculator";

interface Props {
    productsList: ProductEntity[] | [];
    id: number;
    setMeals: React.Dispatch<React.SetStateAction<[] | JSX.Element[]>>
    meals: JSX.Element[] | []
    removeMeal: (id: number)=> void
}

export const Meal = ({productsList, id, setMeals, meals, removeMeal}: Props) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [meal, setMeal] = useState<ProductEntity[] | []>([])
    const [numberOfMeal, setNumberOfMeal] = useState<number>(0)

    useEffect(() => {
        const foundIndexOfMeal = meals.findIndex(el => el.props.id === id)
        setNumberOfMeal(prevState => foundIndexOfMeal + 1)
    }, [id, meals])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const addNewProduct = (newProduct: ProductEntity) => {
        setMeal(prevState => [...meal, newProduct])
    }
    return (
        <div className="meal">
            <MealHeader
                removeMeal={removeMeal}
                id={id}
                numberOfMeal={numberOfMeal}
            />
            <MealAddingNewProduct
                addNewProduct={addNewProduct}
                handleInput={handleInput}
                inputValue={inputValue}
                productsList={productsList}
            />
            <MealProducts
                meal={meal}
            />
            <MealSummary
                meal={meal}
                numberOfMeal={numberOfMeal}
            />
        </div>
    )
}