import React from "react";
import { ProductEntity } from "types";

interface Props {
    product: ProductEntity;
}

export const MealProduct = ({product}: Props) => {

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
            </div>
        </>
    )
}