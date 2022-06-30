import {LoggedUserEntity, ProductEntity, UserEntity } from "types";
import {CaloriesCalculatorAction} from "../action-types/caloriesCalculator";

export const setProductsList = (productList: ProductEntity[]) => ({
    type: CaloriesCalculatorAction.SET_PRODUCTS_LIST,
    payload: productList,
})

export const setMeals = (meals: ProductEntity[][]) => ({
    type: CaloriesCalculatorAction.SET_MEALS,
    payload: meals,
})

export const addMeal = () => ({
    type: CaloriesCalculatorAction.ADD_MEAL,
})

export const removeMeal = (id: number) => ({
    type: CaloriesCalculatorAction.REMOVE_MEAL,
    payload: id,
})

export const addProductToMeal = (product: ProductEntity, id: number) => ({
    type: CaloriesCalculatorAction.ADD_PRODUCT,
    payload: product,
    payload2: id,
})

export const removeProductFromMeal = (productId: number, mealId: number) => ({
    type: CaloriesCalculatorAction.REMOVE_PRODUCT,
    payload: productId,
    payload2: mealId,
})

export const setUser = (user: LoggedUserEntity) => ({
    type: CaloriesCalculatorAction.SET_USER,
    payload: user,
})
