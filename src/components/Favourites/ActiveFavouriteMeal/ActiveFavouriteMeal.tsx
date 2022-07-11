import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {BsPencilSquare} from "react-icons/bs";
import {FavouritesEntity} from "types";
import {ProductInActiveFavMeal} from "./ProductInActiveFavMeal/ProductInActiveFavMeal";

import './ActiveFavouriteMeal.css';

interface Props {
    favourites: FavouritesEntity[];
    activeMealIndex: number;
    openModal: () => void;
    setFavourites: Dispatch<SetStateAction<FavouritesEntity[] | null>>
}

export const ActiveFavouriteMeal = ({favourites, activeMealIndex, openModal, setFavourites}: Props) => {

    const [sums, setSums] = useState({
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        calories: 0,
    })

    useEffect(() => {
        const countProteins = favourites[activeMealIndex].products.map(item => item.proteins).reduce((prev, curr) => prev + curr);
        const countCarbohydrates = favourites[activeMealIndex].products.map(item => item.carbohydrates).reduce((prev, curr) => prev + curr);
        const countFats = favourites[activeMealIndex].products.map(item => item.fats).reduce((prev, curr) => prev + curr);
        const countCalories = favourites[activeMealIndex].products.map(item => item.calories).reduce((prev, curr) => prev + curr);
        setSums(prev => ({
            proteins: Number(countProteins.toFixed(1)),
            carbohydrates: Number(countCarbohydrates.toFixed(1)),
            fats: Number(countFats.toFixed(2)),
            calories: Number(countCalories.toFixed(2)),
        }))
    }, [activeMealIndex, favourites])

    return (
        <div className="actual-favourite-meal">
            <div className="actual-favourite-meal-title">
                <div className="title">
                    <h2>{favourites[activeMealIndex].title}</h2>
                </div>
                <BsPencilSquare
                    className="actual-favourite-meal__edit-icon"
                    onClick={openModal}
                />

            </div>
            {favourites[activeMealIndex].products.map((product, i) =>
                <ProductInActiveFavMeal
                    key={i}
                    favourites={favourites}
                    activeMealIndex={activeMealIndex}
                    product={product}
                    setFavourites={setFavourites}
                />
            )}
            <div className="actual-favourite-meal__summary">
                <h3>Summary</h3>
                <div className="actual-favourite-meal__summary-values">
                    <div className="actual-favourite-meal__summary-pcf">
                        <p>P: {sums.proteins}g</p>
                        <p>C: {sums.carbohydrates}g</p>
                        <p>F: {sums.fats}g</p>
                    </div>
                    <div className="actual-favourite-meal__summary-cal">
                        <p>Cal: {sums.calories}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}