import React, {useEffect, useState} from "react";
import './MealHeader.css'
import {useDispatch, useSelector} from "react-redux";
import {removeMeal} from "../../../../actions/caloriesCalclator";
import {BsStar, BsStarFill} from "react-icons/bs";
import {RootState} from "../../../../store";

interface Props {
    mealIndex: number;
    showAddFavouriteModal: () => void;
    isFavourite: boolean;
}

export const MealHeader = ({isFavourite, showAddFavouriteModal, mealIndex}: Props) => {

    const dispatch = useDispatch();


    return (
        <div className="meal__header">
            <div className="favourite-icon">
                {isFavourite
                    ? <BsStarFill className='added-favourite-star'/>
                    : <BsStar onClick={showAddFavouriteModal} className='favourite-star'/>
                }
            </div>

            <p>Posiłek {mealIndex + 1}</p>
            <button onClick={() => dispatch(removeMeal(mealIndex))} className="remove-meal">X</button>
        </div>
    )
}