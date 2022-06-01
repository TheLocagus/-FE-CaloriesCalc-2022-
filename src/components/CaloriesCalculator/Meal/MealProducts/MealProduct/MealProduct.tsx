import React, {Dispatch, FormEventHandler, SetStateAction, useEffect, useState} from "react";
import { ProductEntity } from "types";
import './MealProduct.css';
import {Button} from "../../../../common/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {setMeals} from "../../../../../actions/caloriesCalclator";

interface Props {
    product: ProductEntity;
    mealId: number;
    productId: number;
    amount: number;
}

export const MealProduct = ({amount, product, mealId, productId}: Props) => {

    const {productsList, meals} = useSelector((store: RootState) => store.caloriesCalculator)
    const [isEditInputVisible, setIsEditInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState<number | string>(amount)

    const dispatch = useDispatch();

    useEffect(() => {
        setInputValue(amount)
    }, [amount])

    const removeProduct = (productId: number) => {
        const mealAfterRemovingProduct = [...meals][mealId].filter((meal, i) => i !== productId)
        const refreshedMeals = [...meals].map((meal, i) => {
            if (mealId === i) return mealAfterRemovingProduct;
            return meal
        })
        dispatch(setMeals(refreshedMeals))
    }

    const showEditInput = () => {
        if(!isEditInputVisible){
            setIsEditInputVisible(prevState => !prevState);
        }
    }
    const showAndConfirmValue = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inputValue === ''){
            setInputValue(0);
        }

        const productToModifie = [...productsList].filter(productFromList => productFromList.id === product.id)[0];

        const modifiedProduct: ProductEntity = {
            ...productToModifie,
            proteins: productToModifie.proteins * (Number(inputValue)/100),
            carbohydrates: productToModifie.carbohydrates * (Number(inputValue)/100),
            fats: productToModifie.fats * (Number(inputValue)/100),
            calories: productToModifie.calories * (Number(inputValue)/100),
            amount: Number(inputValue),
        }

        const updatedMeal = [...meals][mealId].map((product, i) => {
            if(i === productId) return modifiedProduct
            return product;
        })

        const updatedMeals = [...meals].map((meal, i) => {
            if(i === mealId) return updatedMeal
            return meal;
        })

        dispatch(setMeals(updatedMeals))

        if(isEditInputVisible){
            setIsEditInputVisible(prevState => !prevState);
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        return Number(e.target.value) === 0 ? setInputValue('') : setInputValue(Number(e.target.value))
    }

    return (
        <>
            <div className="product" key={product.id}>
                <div className="product__name product-info">
                    <div className="name-container">
                        <p>{product.name}</p>
                    </div>
                    <div className="buttons-container">
                        <Button className="product__edit-product" onClick={()=>{}} text="Edit"/>
                        <button onClick={() => removeProduct(productId)} className="product__remove-product">Usuń</button>
                        {/*<Button className="product__remove-product" onClick={() => removeProduct(productId)} text="Delete"/>*/}
                    </div>
                </div>
                <div onClick={showEditInput} className="product__amount product-info">
                    {
                        isEditInputVisible
                            ? <form onSubmit={showAndConfirmValue}>
                                <label>
                                    <p><small>Ilość: </small></p>
                                    <input onChange={handleInput}
                                           className="product__edit-input"
                                           type="number"
                                           min="0"
                                           value={inputValue}
                                    />
                                </label>

                            </form>
                            : <p><small>Ilość: <span className="amount-to-click">{amount}g</span></small></p>
                    }
                </div>
                <div className="product__macronutrients-summary product-info">
                    <div className="protcarbfats-container">
                        <div className="product__proteins">
                            <p><small>Białko:</small> <span>{Number(product.proteins.toFixed(2))}g</span></p>
                        </div>
                        <div className="product__carbohydrates">
                            <p><small>Węglowodany:</small> <span>{Number(product.carbohydrates.toFixed(2))}g</span></p>
                        </div>
                        <div className="product__fats">
                            <p><small>Tłuszcze:</small> <span>{Number(product.fats.toFixed(2))}g</span></p>
                        </div>
                    </div>
                    <div className="cal-container">
                        <div className="product__calories">
                            <p><small>Kalorie:</small> <span>{Number(product.calories.toFixed(2))}</span></p>
                        </div>
                    </div>

                </div>
                {/*<button  className="product__edit-product">Edytuj</button>*/}
            </div>
        </>
    )
}