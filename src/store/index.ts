//TU BĘDZIEMY TRZYMAĆ WSZYSTKO, CO BĘDZIE TWORZYĆ GLOBALNY STAN

//npm i redux react-redux

import {combineReducers, createStore} from "redux";
import caloriesCalculatorReducer from "../reducers/caloriesCalculator-reducer";

const rootReducer = combineReducers({
    caloriesCalculator: caloriesCalculatorReducer
})

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>