import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeMeal} from "../../../../actions/caloriesCalclator";
import {BsStar, BsStarFill} from "react-icons/bs";
import {RootState} from "../../../../store";

import './MealHeader.css'

interface Props {
    mealIndex: number;
    showAddFavouriteModal: () => void;
    isFavourite: boolean;
}

export const MealHeader = ({isFavourite, showAddFavouriteModal, mealIndex}: Props) => {
    const {user} = useSelector((store: RootState) => store.caloriesCalculator);

    const dispatch = useDispatch();

    return (
        <div className="meal__header">
            {user
                ? <div className="favourite-icon">
                    {isFavourite
                        ? <BsStarFill className='added-favourite-star'/>
                        : <BsStar onClick={showAddFavouriteModal} className='favourite-star'/>
                    }
                </div>
                : null
            }
            <p>Meal #{mealIndex + 1}</p>
            <button onClick={() => dispatch(removeMeal(mealIndex))} className="remove-meal">X</button>
        </div>
    )
}