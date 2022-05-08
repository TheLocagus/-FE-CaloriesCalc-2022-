import React from "react";
import { ProductEntity } from "types";
import {MealProduct} from "./MealProduct/MealProduct";

interface Props {
    meals: ProductEntity[][]
    id: number;
}

export const MealProducts = ({meals, id}: Props) => {

    return (
        <div className="meal__product product">
            {
                [...meals][id].map((product, i) => <MealProduct key={`${i} - ${product.id}`} product={product}/>)
            }
        </div>
    )
}