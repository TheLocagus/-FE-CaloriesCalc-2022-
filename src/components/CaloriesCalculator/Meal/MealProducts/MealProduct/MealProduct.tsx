import React, {Dispatch, FormEventHandler, SetStateAction, useState} from "react";
import { ProductEntity } from "types";

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
            <div key={product.id}>
                <div className="product__name">
                    <p>Nazwa: {product.name}</p>
                </div>
                <div className="product__macronutrients-summary">
                    <div onClick={showEditInput} className="product__amount">
                        {
                            isEditInputVisible
                                ? <form onSubmit={showAndConfirmValue}>
                                    <input onChange={handleInput}
                                           className="product__edit-input"
                                           type="number"
                                           min="0"
                                           value={inputValue}
                                    />
                                </form>
                                : <p>{inputValue}g</p>
                        }
                    </div>
                    <div className="product__calories">
                        <p>Kcal: {product.calories.toFixed(2)}</p>
                    </div>
                </div>
                {/*<button  className="product__edit-product">Edytuj</button>*/}
                <button onClick={() => removeProduct(productId)} className="product__remove-product">Usuń</button>
            </div>
        </>
    )
}