import React from "react";
import './MealHeader.css'
import {useDispatch} from "react-redux";
import {removeMeal} from "../../../../actions/caloriesCalclator";
import {BsStar, BsStarFill} from "react-icons/bs";

interface Props {
    mealId: number;
    showAddFavouriteModal: () => void;
    isMealFavourite: boolean
}

export const MealHeader = ({mealId, showAddFavouriteModal, isMealFavourite}: Props) => {

    const dispatch = useDispatch();

    return (
        <div className="meal__header">
            {isMealFavourite
                ? <BsStarFill className='added-favourite-star'/>
                : <BsStar onClick={showAddFavouriteModal} className='favourite-star'/>

            }
            <p>Posiłek {mealId + 1}</p>
            <button onClick={() => dispatch(removeMeal(mealId))} className="remove-meal">X</button>
        </div>
    )
}