import React, {MutableRefObject, SyntheticEvent, useEffect, useRef, useState} from "react";
import {Button} from "../../../common/Button";
import {HardEditingFields} from "../HardEditingFields/HardEditingFields";
import {TiPencil} from "react-icons/ti";
import {FavouritesEntity, FavouritesProducts, UpdateValuesEntity} from "types";
import {ProductValuesInActiveFavMeal} from "./ProductValuesInActiveFavMeal/ProductValuesInActiveFavMeal";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {updateProductValuesInFavMeal} from "../../../../utils/fetch/updateProductValuesInFavMeal";

import './ProductInActiveFavMeal.css';

interface Props {
    product: FavouritesProducts,
    favourites: FavouritesEntity[],
    activeMealIndex: number,
    setFavourites: React.Dispatch<React.SetStateAction<FavouritesEntity[] | null>>
}

export const ProductInActiveFavMeal = ({product, favourites, activeMealIndex, setFavourites}: Props) => {

    const [productValues, setProductValues] = useState<FavouritesProducts>({
        id: '',
        name: '',
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        calories: 0,
        amount: 0,
        index: 0,
        favouriteId: '',
    });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isEditInputVisible, setIsEditInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState<number>(product.amount);
    const [didUserChangeBasicValue, setDidUserChangeBasicValue] = useState(false)
    const [isHardEditActive, setIsHardEditActive] = useState(false);
    const {user} = useSelector((store: RootState) => store.caloriesCalculator);
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

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
            index: product.index,
            favouriteId: product.favouriteId,
        }))
    }, [product.amount, product.calories, product.carbohydrates, product.fats, product.favouriteId, product.id, product.index, product.name, product.proteins])

    useEffect(() => {
        setInputValue(inputValue);
        if (isEditInputVisible) inputRef.current.focus()
    }, [inputValue, isEditInputVisible])

    useEffect(() => {
        setErrorMessage('')
    }, [activeMealIndex, isHardEditActive, inputValue])

    if (!user) return <h2>Error</h2>

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

    const changeAmount = (e: SyntheticEvent) => {
        e.preventDefault();
        try{
            if (inputValue.toString().length > 6){
                throw new Error("Too large value.")
            }
            const initialValue = product.amount;
            setProductValues(prevState => ({
                ...prevState,
                amount: inputValue,
            }))

            changeValues();

            inputValue !== initialValue ? setDidUserChangeBasicValue(true) : setDidUserChangeBasicValue(false);
        } catch(err: any){
            setErrorMessage(err.message)
        }

    }
    const saveChangedByAmount = async () => {
        const dataValues: UpdateValuesEntity = {
            product: productValues,
            userId: user.id,
            whatToChange: 'values'
        }

        if(dataValues.product.amount.toString().length > 6){
            throw new Error('Too large number');
        }
        setDidUserChangeBasicValue(false);
        setIsEditInputVisible(false);

        const data = await updateProductValuesInFavMeal(dataValues);
        if (!data.success) {
            setErrorMessage(data.message)
        }
        if (data.success) {
            setFavourites(prev => data.favMeals);
        }
    }

    return (
        <>
            {
                errorMessage.length > 0 ? <div className='error-message'>
                    <p>{errorMessage}</p>
                </div> : null
            }
            <div key={product.name} className="active-favourite-product">
                {
                    isHardEditActive
                        ? <>
                            <div className="active-favourite-product-edit-button">
                                <TiPencil className='active-favourite-product__edit-button'
                                          onClick={() => {setIsHardEditActive(false)}}
                                />
                            </div>
                            <HardEditingFields setIsHardEditActive={setIsHardEditActive}
                                               setFavourites={setFavourites}
                                               activeMealIndex={activeMealIndex}
                                               favourites={favourites}
                                               productValues={productValues}
                            />
                        </>
                        : <>
                            <div className="active-favourite-product-edit-button">
                                <TiPencil className='active-favourite-product__edit-button'
                                          onClick={() => {setIsHardEditActive(true)}}
                                />
                            </div>
                            <ProductValuesInActiveFavMeal
                                changeAmount={changeAmount}
                                inputRef={inputRef}
                                inputValue={inputValue}
                                isEditInputVisible={isEditInputVisible}
                                productValues={productValues}
                                setInputValue={setInputValue}
                                setIsEditInputVisible={setIsEditInputVisible}
                                showInput={showInput}
                            />
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
