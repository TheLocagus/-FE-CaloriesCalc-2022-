import React, {ChangeEvent, MutableRefObject, useRef, useState} from "react";
import {Button} from "../../../common/Button";
import {DropdownInput} from "../../../common/DropdownInput/DropdownInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {addProductToMeal} from "../../../../actions/caloriesCalclator";
import {AddNewProductToMealForm} from "../../../common/MyModal/ModalContents/AddNewProductToMealForm/AddNewProductToMealForm";
import {MyModal} from "../../../common/MyModal/MyModal";

import './MealAddingNewProduct.scss';

interface Props {
    mealIndex: number;
}

export const MealAddingNewProduct = ({mealIndex}: Props) => {
    const {productsList} = useSelector((store: RootState) => store.caloriesCalculator);

    const [inputValue, setInputValue] = useState<string>('');
    const [isFindProductVisible, setIsFindProductVisible] = useState<boolean>(false);

    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => {
        setIsModalVisible(false)
    }
    const openModal = () => {
        setIsModalVisible(true)
    }

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
        <div className="meal__add-new-product">
            {
                isFindProductVisible
                    ? <div className="meal__add-new-product__dropdown">
                        <div className="meal__add-new-product__dropdown__field">
                            <DropdownInput inputRef={inputRef} className="meal__add-new-product__dropdown__field__input" onChange={handleInput}
                                           value={inputValue}/>
                            <Button className='meal__add-new-product__dropdown__field__input__clear' onClick={clearInput} text='X'/>
                        </div>

                        {
                            inputValue.length > 1
                                ?
                                <ul className="meal__add-new-product__dropdown__list">
                                    {[...productsList]
                                        .filter(product => product.name.toLowerCase().includes(inputValue.toLowerCase()))
                                        .map(product => (
                                            <li className="meal__add-new-product__dropdown__list__element" key={product.id}>
                                                <div id={product.id}>
                                                    <p>{product.name}
                                                        <span>
                                                            P: <b>{product.proteins}</b>g /
                                                            C: <b>{product.carbohydrates}</b>g /
                                                            F: <b>{product.fats}</b>g /
                                                            Cal: <b>{product.calories}</b>
                                                        </span>
                                                    </p>
                                                    <Button className='confirm' onClick={() => dispatch(addProductToMeal(product, mealIndex))}
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
            <Button className='add-own-product' onClick={openModal} text="Add own"/>

            {
                isModalVisible
                ? <MyModal closeModal={closeModal} title='Add Your own product.' subtitle='at 100g' content={<AddNewProductToMealForm closeModal={closeModal} mealIndex={mealIndex}/>}/>
                    : null
            }
        </div>
    )
}