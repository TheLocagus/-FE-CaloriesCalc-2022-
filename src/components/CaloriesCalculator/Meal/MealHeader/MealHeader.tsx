import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeMeal} from "../../../../actions/caloriesCalclator";
import {BsStar, BsStarFill} from "react-icons/bs";
import {RootState} from "../../../../store";

import './MealHeader.scss'

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
                ? <div className="meal__header__favourite-icon">
                    {isFavourite
                        ? <BsStarFill className='meal__header__favourite-icon__star-added'/>
                        : <BsStar onClick={showAddFavouriteModal} className='meal__header__favourite-icon__star'/>
                    }
                </div>
                : null
            }
            <p>Meal #{mealIndex + 1}</p>
            <button onClick={() => dispatch(removeMeal(mealIndex))} className="meal__header__remove-meal">X</button>
        </div>
    )
}