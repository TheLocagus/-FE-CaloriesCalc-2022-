import React, {SyntheticEvent, useState} from "react";
import {v4 as uuid} from 'uuid';
import {ProductEntity} from "types";
import {useDispatch, useSelector} from "react-redux";
import {addProductToMeal, setProductsList} from "../../../../../actions/caloriesCalclator";
import {RootState} from "../../../../../store";

import "./AddNewProductToMealForm.css";

interface Props {
    closeModal: ()=> void;
    mealIndex: number;
}

export const AddNewProductToMealForm = ({closeModal, mealIndex}: Props) => {
    const dispatch = useDispatch();
    const {productsList} = useSelector((store: RootState) => store.caloriesCalculator)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [newMeal, setNewMeal] = useState<ProductEntity>({
        name: '',
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        calories: 0,
        amount: 100,
    });

    const updateForm = (key: string, value: any) => {
        setNewMeal(form => ({
            ...form,
            [key]: value,
        }))
    }

    const confirmForm = (e: SyntheticEvent) => {
        e.preventDefault();
        const {name, proteins, carbohydrates, fats, calories} = newMeal;
        const newMealToAdd: ProductEntity = {
            ...newMeal,
            name,
            proteins: Number(proteins),
            carbohydrates: Number(carbohydrates),
            fats: Number(fats),
            calories: Number(calories),
            id: uuid(),
        }

        if (name.length === 0 || name.length > 50){
            setErrorMessage("Name of product cannot be empty either too long (max 50 char.).")
            return;
        }

        dispatch(addProductToMeal(newMealToAdd, mealIndex));
        const productsListCopy: ProductEntity[] = [...productsList, newMealToAdd]
        dispatch(setProductsList(productsListCopy))
        closeModal();
    }

    return (
        <>
            <div className="modal-error-message">
                <p style={{color: "red"}}>{errorMessage}</p>
            </div>
            <form className="modal-form" onSubmit={confirmForm}>
                <div className="modal-form-name">
                    <label> Name:
                        <input
                            maxLength={50}
                            value={newMeal.name}
                            type="text"
                            onChange={e => updateForm('name', e.target.value)}
                        />
                    </label>
                </div>
                <div className="modal-form-macronutrients">
                    <label> Proteins:
                        <input
                            min={0}
                            step={0.01}
                            value={newMeal.proteins}
                            type="number"
                            onChange={e => updateForm('proteins', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                    <label> Carbohydrates:
                        <input
                            min={0}
                            step={0.01}
                            value={newMeal.carbohydrates}
                            type="number"
                            onChange={e => updateForm('carbohydrates', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                    <label> Fats:
                        <input
                            min={0}
                            step={0.01}
                            value={newMeal.fats}
                            type="number"
                            onChange={e => updateForm('fats', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                    <label> Calories:
                        <input
                            min={0}
                            step={0.01}
                            value={newMeal.calories}
                            type="number"
                            onChange={e => updateForm('calories', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                </div>
                <div className="modal-btn">
                    <button type='submit' className='modal-confirm'>Confirm</button>
                </div>
            </form>
        </>
    )
}