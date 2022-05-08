import React, {Dispatch, SetStateAction} from "react";
import { ProductEntity } from "types";
import {MealProduct} from "./MealProduct/MealProduct";

interface Props {
    meals: ProductEntity[][]
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    mealId: number;
    productsList: ProductEntity[]
}

export const MealProducts = ({meals, mealId, setMeals, productsList}: Props) => {

    return (
        <div className="meal__product product">
            {
                [...meals][mealId].map((product, i) =>
                    <MealProduct
                        meals={meals}
                        setMeals={setMeals}
                        productId={i}
                        mealId={mealId}
                        key={`${i} - ${product.id}`}
                        product={product}
                        productsList={productsList}
                    />)
            }
        </div>
    )
}