import React, {Dispatch, SetStateAction} from "react";
import { ProductEntity } from "types";
import {MealProduct} from "./MealProduct/MealProduct";

interface Props {
    meals: ProductEntity[][]
    setMeals: Dispatch<SetStateAction<[] | ProductEntity[][]>>
    id: number;
}

export const MealProducts = ({meals, id, setMeals}: Props) => {

    return (
        <div className="meal__product product">
            {
                [...meals][id].map((product, i) => <MealProduct meals={meals} setMeals={setMeals} productId={`${i} - ${product.id}`} id={id} key={`${i} - ${product.id}`} product={product}/>)
            }
        </div>
    )
}