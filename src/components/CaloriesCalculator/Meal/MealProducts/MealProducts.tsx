import React from "react";
import {MealProduct} from "./MealProduct/MealProduct";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

interface Props {
    mealIndex: number;
}

export const MealProducts = ({mealIndex}: Props) => {
    const {meals} = useSelector((store: RootState) => store.caloriesCalculator)
    return (
        <div className="meal__products products">
            {
                [...meals][mealIndex].map((product, i) =>
                    <MealProduct
                        productId={i}
                        mealIndex={mealIndex}
                        key={`${i} - ${product.id}`}
                        product={product}
                        amount={product.amount}
                    />)
            }
        </div>
    )
}