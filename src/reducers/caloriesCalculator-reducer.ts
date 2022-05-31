import {ProductEntity} from "types";
import {CaloriesCalculatorAction} from "../action-types/caloriesCalculator";

interface CaloriesCalculatorState  {
    productsList: ProductEntity[] | [];
    meals: ProductEntity[][] | [];
}

const initialState = {
    productsList: [],
    meals: [],
}

interface SetProductsList {
    type: CaloriesCalculatorAction.SET_PRODUCTS_LIST,
    payload: ProductEntity | ProductEntity[]
}

interface SetMeals {
    type: CaloriesCalculatorAction.SET_MEALS,
    payload: ProductEntity[] | ProductEntity[][]
}

interface AddMeal {
    type: CaloriesCalculatorAction.ADD_MEAL,
    payload: ProductEntity[]
}

interface RemoveMeal {
    type: CaloriesCalculatorAction.REMOVE_MEAL,
    payload: number,
}

interface AddProduct {
    type: CaloriesCalculatorAction.ADD_PRODUCT,
    payload: ProductEntity,
    payload2: number,
}

interface RemoveProduct {
    type: CaloriesCalculatorAction.REMOVE_PRODUCT,
    payload: number,
}

type Action = SetProductsList | SetMeals | AddMeal | RemoveMeal | AddProduct | RemoveProduct;

export default (state = initialState, action: Action) => {
    switch(action.type){
        case CaloriesCalculatorAction.SET_PRODUCTS_LIST: {
            return {
                ...state,
                productsList: action.payload
            }
        }
        case CaloriesCalculatorAction.SET_MEALS: {
            return {
                ...state,
                meals: action.payload
            }
        }
        case CaloriesCalculatorAction.ADD_MEAL: {
            return {
                ...state,
                meals: [...state.meals, action.payload]
            }
        }
        case CaloriesCalculatorAction.REMOVE_MEAL: {
            return {
                ...state,
                meals: [...state.meals as ProductEntity[][]].filter((meal, i) => i !== action.payload),
            }
        }
        case CaloriesCalculatorAction.ADD_PRODUCT: {
            const oldMeal = [...state.meals][action.payload2];
            const changedMeal = [...oldMeal, action.payload];
            const mealsAfterAddingProduct = [...state.meals].map((meal, i) => {
                if(i !== action.payload2) return meal
                return changedMeal
            })
            return {
                ...state,
                meals: mealsAfterAddingProduct,
            }
        }
        default: return state;
    }
}