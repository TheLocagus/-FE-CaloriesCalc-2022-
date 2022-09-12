import React, {useEffect, useState} from "react";

import './FavouriteMealInList.css'
import {BsTrashFill} from "react-icons/bs";
import {FavouriteProductInterface} from "types";

interface Props {
    title: string;
    items: Omit<FavouriteProductInterface, 'favouriteMeal'>[];
    index: number;
    setActiveMealIndex: React.Dispatch<React.SetStateAction<number>>;
    id: string,
    removeFavouriteMeal: (mealId: string, userId: string) => void;
    userId: string
}

export const FavouriteMealInList = ({userId, id, title, index, setActiveMealIndex, removeFavouriteMeal, items}: Props) => {

    const [sums, setSums] = useState({
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        calories: 0,
    })

    useEffect(() => {
        const countProteins = items.map(item => item.proteins).reduce((prev, curr) => prev + curr);
        const countCarbohydrates = items.map(item => item.carbohydrates).reduce((prev, curr) => prev + curr);
        const countFats = items.map(item => item.fats).reduce((prev, curr) => prev + curr);
        const countCalories = items.map(item => item.calories).reduce((prev, curr) => prev + curr);
        setSums(prev => ({
            proteins: Number(countProteins.toFixed(1)),
            carbohydrates: Number(countCarbohydrates.toFixed(1)),
            fats: Number(countFats.toFixed(2)),
            calories: Number(countCalories.toFixed(2)),
        }))
    }, [items])

    useEffect(() => {
        setActiveMealIndex(index);
    }, [index, setActiveMealIndex, title])
    
    const changeActiveMeal = (index: number) => {
        setActiveMealIndex(index);
    }

    return (
        <div onClick={() => changeActiveMeal(index)} className="favourite-meal-in-list">
            <div className="favourite-meal-in-list-content">
                <div>{title}</div>
                <div className="favourite-meal-sums-container">
                    <div className="fms-pcf">
                        <p><small>P: {sums.proteins}g</small></p>
                        <p><small>C: {sums.carbohydrates}g</small></p>
                        <p><small>F: {sums.fats}g</small></p>
                    </div>
                    <div className="fms-cal">
                        <p><small>Cal: {sums.calories}</small></p>
                    </div>
                </div>
            </div>
            <BsTrashFill className='remove-favourite-meal-icon' onClick={() => removeFavouriteMeal(id, userId)}/>
        </div>
    )
}