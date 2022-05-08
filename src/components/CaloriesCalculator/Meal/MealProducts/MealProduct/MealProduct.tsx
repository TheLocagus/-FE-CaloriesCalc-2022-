import React, {Dispatch, SetStateAction} from "react";
import { ProductEntity } from "types";

interface Props {
    product: ProductEntity;
    meals: ProductEntity[][] | [];
    mealId: number;
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    productId: string;
}

export const MealProduct = ({product, meals, mealId, setMeals, productId}: Props) => {

    const removeProduct = (productId: string) => {
        const mealAfterRemovingProduct = [...meals][mealId].filter((meal, i) => `${i} - ${meal.id}` !== productId)
        const refreshedMeals = [...meals].map((meal, i) => {
            if (mealId === i) return mealAfterRemovingProduct;
            return meal
        })
        setMeals(refreshedMeals)
    }

    return (
        <>
            <div key={product.id}>
                <div className="product__name">
                    <p>Nazwa: {product.name}</p>
                </div>
                <div className="product__calories">
                    <p>Kcal: {product.calories}</p>
                </div>
                <button className="product__edit-product">Edytuj</button>
                <button onClick={() => removeProduct(productId)} className="product__remove-product">Usuń</button>
            </div>
        </>
    )
}