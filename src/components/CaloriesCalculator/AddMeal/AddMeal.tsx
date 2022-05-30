import React from "react";
import {Button} from "../../common/Button";
import "./AddMeal.css";

interface Props {
    addMeal: () => void;
}
export const AddMeal = ({addMeal}: Props) => {
    return (
        <Button className="add-meal" onClick={addMeal} text="Add new meal"/>
    )
}