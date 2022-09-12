import React, {Dispatch, MutableRefObject, SetStateAction, SyntheticEvent} from "react";
import {FavouriteProductInterface} from "types";

import './ProductValuesInActiveFavMeal.scss';
interface Props {
    productValues: Omit<FavouriteProductInterface, 'favouriteMeal'>;
    isEditInputVisible: boolean;
    changeAmount: (e: SyntheticEvent) => void;
    inputValue: number;
    setInputValue: Dispatch<SetStateAction<number>>;
    inputRef: MutableRefObject<HTMLInputElement>;
    setIsEditInputVisible:  Dispatch<SetStateAction<boolean>>
    showInput: () => void;
}

export const ProductValuesInActiveFavMeal = ({productValues, isEditInputVisible, changeAmount, inputValue, setInputValue, inputRef, setIsEditInputVisible, showInput}: Props) => {

    return (
        <div className='active-favourite-product-values'>
            <h3>Product: {productValues.name}</h3>
            <p>Proteins: {productValues.proteins}g</p>
            <p>Carbohydrates: {productValues.carbohydrates}g</p>
            <p>Fats: {productValues.fats}g</p>
            <p>Calories: {productValues.calories}</p>
            <div>Amount:
                {
                    isEditInputVisible
                        ? <form className='active-favourite-product-values__form' onSubmit={changeAmount}>
                            <input value={inputValue} onChange={e => setInputValue(Number(e.target.value))}
                                   type="number" ref={inputRef} onBlur={() => setIsEditInputVisible(false)} step='0.01'/>
                        </form>
                        : <span onClick={showInput}> {productValues.amount}g</span>
                }
            </div>
        </div>

    )
}