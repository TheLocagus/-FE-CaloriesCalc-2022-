import { ProductEntity } from "types";
import {CaloriesCalculatorAction} from "../action-types/caloriesCalculator";

export const setProductsList = (productList: ProductEntity[]) => ({
    type: CaloriesCalculatorAction.SET_PRODUCTS_LIST,
    payload: productList,
})

export const setMeals = (meals: ProductEntity[][]) => ({
    type: CaloriesCalculatorAction.SET_MEALS,
    payload: meals,
})

export const AddMeal = (meals: ProductEntity[]) => ({
    type: CaloriesCalculatorAction.ADD_MEAL,
    payload: meals,
})

export const RemoveMeal = (id: number) => ({
    type: CaloriesCalculatorAction.REMOVE_MEAL,
    payload: id,
})

export const addProductToMeal = (product: ProductEntity, id: number) => ({
    type: CaloriesCalculatorAction.ADD_PRODUCT,
    payload: product,
    payload2: id,
})