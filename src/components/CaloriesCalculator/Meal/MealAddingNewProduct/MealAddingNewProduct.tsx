import React, {ChangeEvent} from "react";
import {ProductEntity} from "types";

interface Props {
    inputValue: string,
    productsList: ProductEntity[] | [];
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
    addNewProduct: (newProduct: ProductEntity) => void;
}

export const MealAddingNewProduct = ({addNewProduct, handleInput, inputValue, productsList}: Props) => {

    return (
        <div className="meal__add-new-product add-new-product">
            <div className="meal__dropdown dropdown">
                <input onChange={handleInput} value={inputValue} type="text" name="product"/>
                {
                    inputValue.length > 1
                        ?
                        <ul>
                            {[...productsList]
                                .filter(product => product.name.toLowerCase().includes(inputValue.toLowerCase()))
                                .map(product => (
                                    <li className="dropdown__result" key={product.id}>
                                        <div id={product.id}>
                                            <p>{product.name}</p>
                                            <button onClick={() => addNewProduct(product)} className="confirm">Confirm</button>
                                        </div>
                                </li>
                                ))
                            }
                        </ul>
                        : null
                }
            </div>

            <button>Find</button>
            <button>Add own</button>
        </div>
    )
}