import React, {Dispatch, SetStateAction} from "react";
import { ProductEntity } from "types";
import {MealProduct} from "./MealProduct/MealProduct";

interface Props {
    meals: ProductEntity[][]
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    mealId: number;
}

export const MealProducts = ({meals, mealId, setMeals}: Props) => {

    return (
        <div className="meal__product product">
            {
                [...meals][mealId].map((product, i) =>
                    <MealProduct
                        meals={meals}
                        setMeals={setMeals}
                        productId={`${i} - ${product.id}`}
                        mealId={mealId}
                        key={`${i} - ${product.id}`}
                        product={product}
                    />)
            }
        </div>
    )
}