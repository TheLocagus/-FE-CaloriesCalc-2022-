import React from "react";
import {MealProduct} from "./MealProduct/MealProduct";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

interface Props {
    mealId: number;
}

export const MealProducts = ({mealId}: Props) => {
    const {meals} = useSelector((store: RootState) => store.caloriesCalculator)
    return (
        <div className="meal__products products">
            {
                [...meals][mealId].map((product, i) =>
                    <MealProduct
                        productId={i}
                        mealId={mealId}
                        key={`${i} - ${product.id}`}
                        product={product}
                        amount={product.amount}
                    />)
            }
        </div>
    )
}