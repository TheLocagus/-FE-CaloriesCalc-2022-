import React, {ChangeEvent, MutableRefObject, useRef, useState} from "react";
import {ProductEntity} from "types";
import './MealAddingNewProduct.css'
import {Button} from "../../../common/Button";
import {DropdownInput} from "./DropdownInput/DropdownInput";

interface Props {
    productsList: ProductEntity[] | [];
    addNewProduct: (newProduct: ProductEntity) => void;
}

export const MealAddingNewProduct = ({addNewProduct, productsList}: Props) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isFindProductVisible, setIsFindProductVisible] = useState<boolean>(false);

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const changeFindProductVisibility = () => {
        setIsFindProductVisible(prevState => !prevState)
        setInputValue('');
    }

    const clearInput = () => {
        inputRef.current.focus();
        setInputValue('')
    }

    return (
        <div className="meal__add-new-product add-new-product">
            {
                isFindProductVisible
                    ? <div className="meal__dropdown dropdown">
                        <div className="dropdown-field">
                            <DropdownInput inputRef={inputRef} className="dropdown-input" onChange={handleInput} value={inputValue}/>
                            <Button className='dropdown-input-clear' onClick={clearInput} text='X'/>
                        </div>

                        {
                            inputValue.length > 1
                                ?
                                <ul className="dropdown-list">
                                    {[...productsList]
                                        .filter(product => product.name.toLowerCase().includes(inputValue.toLowerCase()))
                                        .map(product => (
                                            <li className="dropdown-record" key={product.id}>
                                                <div id={product.id}>
                                                    <p>{product.name}
                                                        <span>
                                                            B: <b>{product.proteins}</b>g /
                                                            W: <b>{product.carbohydrates}</b>g /
                                                            T: <b>{product.fats}</b>g /
                                                            Kcal: <b>{product.calories}</b>
                                                        </span>
                                                    </p>
                                                    <Button className='confirm' onClick={() => addNewProduct(product)}
                                                            text='Confirm'/>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                                : null
                        }
                    </div>
                    : null
            }

            {
                isFindProductVisible
                    ? <Button className='find-product' onClick={changeFindProductVisibility} text="Hide"/>
                    : <Button className='find-product' onClick={changeFindProductVisibility} text="Find product"/>

            }
            <Button className='add-own-product' onClick={() => {}} text="Add own"/>
        </div>
    )
}