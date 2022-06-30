import React, {useEffect} from "react";
import {FavouritesProduct} from "../../views/FavouritesView";

import './FavouriteMeal.css'
import {BsTrashFill} from "react-icons/bs";

interface Props {
    title: string;
    items: FavouritesProduct[];
    index: number;
    setActiveMealIndex: React.Dispatch<React.SetStateAction<number>>;
    // setTitle: React.Dispatch<React.SetStateAction<string>>
    id: string,
    removeFavouriteMeal: (mealId: string, userId: string) => void;
    userId: string
}

export const FavouriteMeal = ({userId, id, title, items, index, setActiveMealIndex, removeFavouriteMeal}: Props) => {

    useEffect(() => {
        setActiveMealIndex(index);
        // setTitle(title)
    }, [index, setActiveMealIndex,  title])
    
    const changeActiveMeal = (index: number) => {
        setActiveMealIndex(index);
        // setTitle(title)
    }

    return (
        <div onClick={() => changeActiveMeal(index)} className="favourite-meal">
            <div>{title}</div>
            <BsTrashFill className='remove-favourite-meal-icon' onClick={() => removeFavouriteMeal(id, userId)}/>
        </div>
    )
}