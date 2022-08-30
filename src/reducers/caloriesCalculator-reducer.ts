import {ErrorEntity, LoggedUserEntity, ProductEntity} from "types";
import {CaloriesCalculatorAction} from "../action-types/caloriesCalculator";

interface CaloriesCalculatorState {
    productsList: ProductEntity[];
    meals: ProductEntity[][];
    user: LoggedUserEntity | null;
    error: ErrorEntity | null;
}

const initialState: CaloriesCalculatorState = {
    productsList: [],
    meals: [[]],
    user:
        localStorage.getItem('username') === null ? null : {
        username: localStorage.getItem('username') as string,
        id: localStorage.getItem('id') as string
    } || null,
    error: null,
}

interface SetProductsList {
    type: CaloriesCalculatorAction.SET_PRODUCTS_LIST,
    payload: ProductEntity[]
}

interface SetMeals {
    type: CaloriesCalculatorAction.SET_MEALS,
    payload: ProductEntity[][]
}

interface AddMeal {
    type: CaloriesCalculatorAction.ADD_MEAL,
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
    payload2: number,
}

interface SetUser {
    type: CaloriesCalculatorAction.SET_USER,
    payload: LoggedUserEntity,
}

interface SetError {
    type: CaloriesCalculatorAction.SET_ERROR,
    payload: ErrorEntity | null,
}

type Action = SetProductsList | SetMeals | AddMeal | RemoveMeal | AddProduct | RemoveProduct | SetUser | SetError;

export default (state: CaloriesCalculatorState = initialState, action: Action) => {
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
                meals: [...state.meals, [] as ProductEntity[]]
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
        case CaloriesCalculatorAction.REMOVE_PRODUCT: {
            const mealAfterRemovingProduct = [...state.meals][action.payload2].filter((meal, i) => i !== action.payload)
            const refreshedMeals = [...state.meals].map((meal, i) => {
                if (action.payload2 === i) return mealAfterRemovingProduct;
                return meal
            })
            return {
                ...state,
                meals: refreshedMeals,
            }
        }
        case CaloriesCalculatorAction.SET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case CaloriesCalculatorAction.SET_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: return state;
    }
}