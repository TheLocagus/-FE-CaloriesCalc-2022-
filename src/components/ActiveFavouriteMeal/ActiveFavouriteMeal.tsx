import React, {SyntheticEvent, useEffect, useState} from "react";
import {FavouritesEntity, FavouritesProduct} from "../views/FavouritesView";

import './ActiveFavouriteMeal.css';
import {Button} from "../common/Button";
import {ModalCustom} from "../common/ModalCustom";
import {
    EditingModalForProductInFavourites
} from "../EditingModalForProductInFavourites/EditingModalForProductInFavourites";
import {HardEditingFields} from "../HardEditingFields/HardEditingFields";

interface Props {
    product: FavouritesProduct,
    favourites: FavouritesEntity[],
    activeMealIndex: number,
    setFavourites: React.Dispatch<React.SetStateAction<FavouritesEntity[] | null>>
}

export const ActiveFavouriteMeal = ({product, favourites, activeMealIndex, setFavourites}: Props) => {

    const [productValues, setProductValues] = useState<FavouritesProduct>({
        id: '',
        name: '',
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        calories: 0,
        amount: 0,
        index: 0
    });
    const [isEditInputVisible, setIsEditInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState<number>(product.amount);
    const [didUserChangeBasicValue, setDidUserChangeBasicValue] = useState(false)

    const [isHardEditActive, setIsHardEditActive] = useState(false);

    useEffect(() => {
        setInputValue(product.amount);
        setProductValues(({
            id: product.id,
            name: product.name,
            proteins: Number(product.proteins.toFixed(2)),
            carbohydrates: Number(product.carbohydrates.toFixed(2)),
            fats: Number(product.fats.toFixed(2)),
            calories: Number(product.calories.toFixed(2)),
            amount: product.amount,
            index: product.index
        }))
    }, [product.amount, product.calories, product.carbohydrates, product.fats, product.id, product.index, product.name, product.proteins])

    const showInput = () => {
        setIsEditInputVisible(true);
    }

    const changeValues = () => {
        setProductValues(prevState => ({
            ...prevState,
            name: product.name,
            proteins: Number((product.proteins * (inputValue / product.amount)).toFixed(2)),
            carbohydrates: Number((product.carbohydrates * (inputValue / product.amount)).toFixed(2)),
            fats: Number((product.fats * (inputValue / product.amount)).toFixed(2)),
            calories: Number((product.calories * (inputValue / product.amount)).toFixed(2)),
        }));
    }

    function changeAmount(e: SyntheticEvent) {
        e.preventDefault();
        const initialValue = product.amount;
        setProductValues(prevState => ({
            ...prevState,
            amount: inputValue,
        }))

        changeValues();

        inputValue !== initialValue ? setDidUserChangeBasicValue(true) : setDidUserChangeBasicValue(false);
    }

    const saveChangedByAmount = async () => {
        const productsToSend: FavouritesProduct[] = [...[...favourites[activeMealIndex].products].filter(product => product.id !== productValues.id),
        {
            ...productValues,
            index: product.index
        }];

        const newValues: FavouritesEntity = {
            favouriteId: favourites[activeMealIndex].favouriteId,
            products: productsToSend,
            title: favourites[activeMealIndex].title,
            userId: favourites[activeMealIndex].userId
        }

        console.log(newValues)


        setDidUserChangeBasicValue(false);
        setIsEditInputVisible(false);

        const res = await fetch('http://localhost:3002/user/favourites', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                newValues
            )

        })
        const data: FavouritesEntity[] = await res.json();

        setFavourites(prev => data);

    }

    return (
        <>
            <div className="active-favourite-product__header">
                <Button className='active-favourite-product__edit-button' text='Edit' onClick={() => {
                    setIsHardEditActive(true)
                }}/>
            </div>
            <div key={product.name} className="active-favourite-product">
                {
                    isHardEditActive
                        ? <HardEditingFields setIsHardEditActive={setIsHardEditActive} setFavourites={setFavourites} product={product} activeMealIndex={activeMealIndex} favourites={favourites} productValues={productValues}/>
                        : <>
                            <h3>Product: {productValues.name}</h3>
                            <p>Proteins: {productValues.proteins}</p>
                            <p>Carbohydrates: {productValues.carbohydrates}</p>
                            <p>Fats: {productValues.fats}</p>
                            <p>Calories: {productValues.calories}</p>
                            <div>Amount:
                                {
                                    isEditInputVisible
                                        ? <form onSubmit={changeAmount}>
                                            <input value={inputValue} onChange={e => setInputValue(Number(e.target.value))}
                                                   type="number" step='0.01'/>
                                        </form>
                                        : <span onClick={showInput}>{productValues.amount}</span>
                                }
                            </div>
                        </>
                }

            </div>
            <div>
                {
                    didUserChangeBasicValue
                        ? <Button className='save-changes' text='Save changes' onClick={saveChangedByAmount}/>
                        : null
                }
            </div>

        </>
    )
}