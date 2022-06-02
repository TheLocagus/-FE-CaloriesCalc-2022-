import React from "react";
import {Button} from "../../common/Button";
import "./AddMeal.css";
import {useDispatch} from "react-redux";
import {addMeal} from "../../../actions/caloriesCalclator";


export const AddMeal = () => {
    const dispatch = useDispatch();

    return (
        <Button className="add-meal" onClick={() => dispatch(addMeal())} text="Add new meal"/>
    )
}