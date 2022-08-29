import React from "react";
import {Button} from "../../common/Button";
import {addMeal} from "../../../actions/caloriesCalclator";
import {useDispatch} from "react-redux";

import "./AddMeal.scss";

export const AddMeal = () => {
    const dispatch = useDispatch();

    return (
        <Button className="add-meal" onClick={() => dispatch(addMeal())} text="Add new meal"/>
    )
}