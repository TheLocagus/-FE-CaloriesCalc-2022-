import React, {useEffect} from "react";
import {FavouritesProduct} from "../views/FavouritesView";

import './FavouriteMeal.css'

interface Props {
    title: string;
    items: FavouritesProduct[];
    index: number;
    setActiveMealIndex: React.Dispatch<React.SetStateAction<number>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>
    id: string,
    removeFavouriteMeal: (id: string) => void;
}

export const FavouriteMeal = ({id, title, items, index, setActiveMealIndex, setTitle, removeFavouriteMeal}: Props) => {

    useEffect(() => {
        setActiveMealIndex(index);
        setTitle(title)
    }, [index, setActiveMealIndex, setTitle, title])
    
    const changeActiveMeal = (index: number) => {
        setActiveMealIndex(index);
        setTitle(title)
    }

    return (
        <div onClick={() => changeActiveMeal(index)} className="favourite-meal">
            <div>{title}</div>
            <button onClick={() => removeFavouriteMeal(id)}>Delete</button>
        </div>
    )
}