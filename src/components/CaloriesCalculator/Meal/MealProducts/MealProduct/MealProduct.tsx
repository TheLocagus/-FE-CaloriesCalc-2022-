import React, {Dispatch, FormEventHandler, SetStateAction, useState} from "react";
import { ProductEntity } from "types";
import './MealProduct.css';

interface Props {
    product: ProductEntity;
    meals: ProductEntity[][] | [];
    mealId: number;
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    productId: number;
    productsList: ProductEntity[]
}

export const MealProduct = ({product, meals, mealId, setMeals, productId, productsList}: Props) => {

    const [isEditInputVisible, setIsEditInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState<number | string>(100)

    const removeProduct = (productId: number) => {
        const mealAfterRemovingProduct = [...meals][mealId].filter((meal, i) => i !== productId)
        const refreshedMeals = [...meals].map((meal, i) => {
            if (mealId === i) return mealAfterRemovingProduct;
            return meal
        })
        setMeals(refreshedMeals)
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
        }

        const updatedMeal = [...meals][mealId].map((product, i) => {
            if(i === productId) return modifiedProduct
            return product;
        })

        const updatedMeals = [...meals].map((meal, i) => {
            if(i === mealId) return updatedMeal
            return meal;
        })

        setMeals(prevState => updatedMeals)

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
                        <button>Edytuj</button>
                        <button onClick={() => removeProduct(productId)} className="product__remove-product">Usuń</button>
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
                            : <p><small>Ilość: <span className="amount-to-click">{inputValue}g</span></small></p>
                    }
                </div>
                <div className="product__macronutrients-summary product-info">
                    <div className="protcarbfats-container">
                        <div className="product__proteins">
                            <p><small>Białko:</small> <span>{product.proteins.toFixed(2)}g</span></p>
                        </div>
                        <div className="product__carbohydrates">
                            <p><small>Węglowodany:</small> <span>{product.carbohydrates.toFixed(2)}g</span></p>
                        </div>
                        <div className="product__fats">
                            <p><small>Tłuszcze:</small> <span>{product.fats.toFixed(2)}g</span></p>
                        </div>
                    </div>
                    <div className="cal-container">
                        <div className="product__calories">
                            <p><small>Kalorie:</small> <span>{product.calories.toFixed(2)}</span></p>
                        </div>
                    </div>

                </div>
                {/*<button  className="product__edit-product">Edytuj</button>*/}
            </div>
        </>
    )
}