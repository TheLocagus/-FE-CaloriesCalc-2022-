import React from "react";
import { ProductEntity } from "types";
import {MealProduct} from "./MealProduct/MealProduct";

interface Props {
    meal: ProductEntity[]
}

export const MealProducts = ({meal}: Props) => {

    return (
        <div className="meal__product product">
            {
                [...meal].map((product, i) => <MealProduct key={`${i} - ${product.id}`} product={product}/>)
            }
        </div>
    )
}