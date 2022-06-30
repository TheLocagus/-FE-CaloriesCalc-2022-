import React, {SyntheticEvent, useState} from "react";
import {FavouritesEntity, FavouritesProduct} from "../../views/FavouritesView";
import {Button} from "../../common/Button";

interface Props {
    productValues: FavouritesProduct,
    favourites: FavouritesEntity[],
    activeMealIndex: number,
    product: FavouritesProduct,
    setFavourites: React.Dispatch<React.SetStateAction<FavouritesEntity[] | null>>
    setIsHardEditActive:  React.Dispatch<React.SetStateAction<boolean>>

}

export const HardEditingFields = ({setIsHardEditActive, setFavourites, productValues, favourites, activeMealIndex, product}: Props) => {

    const [values, setValues] = useState({
        id: productValues.id,
        name: productValues.name,
        proteins: productValues.proteins,
        carbohydrates: productValues.carbohydrates,
        fats: productValues.fats,
        calories: productValues.calories,
        amount: productValues.amount,
        index: productValues.index
    });

    const updateForm = (key: string, value: any) => {
        setValues(form => ({
            ...form,
            [key]: value,
        }))
    }

    const handleEdit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const newValues = {
            ...values,
            id: values.id,
            name: values.name,
            proteins: Number(Number(values.proteins).toFixed(2)),
            carbohydrates: Number(Number(values.carbohydrates).toFixed(2)),
            fats: Number(Number(values.fats).toFixed(2)),
            calories: Number(Number(values.calories).toFixed(2)),
            amount: Number(Number(values.amount).toFixed(2)),
        };

        const productsToSend: FavouritesProduct[] = [...[...favourites[activeMealIndex].products].filter(product => product.id !== values.id),
            {
                ...newValues,
            }];

        const dataToSend: FavouritesEntity = {
            favouriteId: favourites[activeMealIndex].favouriteId,
            products: productsToSend,
            title: favourites[activeMealIndex].title,
            userId: favourites[activeMealIndex].userId
        }

        setIsHardEditActive(false)

        const res = await fetch('http://localhost:3002/user/favourites', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                dataToSend
            )
        })

        const data: FavouritesEntity[] = await res.json();
        console.log(data)
        setFavourites(prev => data);
    }

    const cancelHardEdit = () => {
        setIsHardEditActive(false)
        setValues({
            ...values,
            id: productValues.id,
            name: productValues.name,
            proteins: productValues.proteins,
            carbohydrates: productValues.carbohydrates,
            fats: productValues.fats,
            calories: productValues.calories,
            amount: productValues.amount,
        })
    }

    return <form onSubmit={handleEdit}>
        <h3>Product: <input type="text" value={values.name} onChange={e => updateForm('name', e.target.value)}/></h3>
        <p>Proteins: <input type="number" value={values.proteins} onChange={e => updateForm('proteins', e.target.value)} step='0.01'/></p>
        <p>Carbohydrates: <input type="number" value={values.carbohydrates} onChange={e => updateForm('carbohydrates', e.target.value)} step='0.01'/></p>
        <p>Fats: <input type="number" value={values.fats} onChange={e => updateForm('fats', e.target.value)} step='0.01'/></p>
        <p>Calories: <input type="number" value={values.calories} onChange={e => updateForm('calories', e.target.value)} step='0.01'/></p>
        <div>Amount: <input type="number" value={values.amount} onChange={e => updateForm('amount', e.target.value)} step='0.01'/></div>
        <button>Confirm</button>
        {/*<Button className='cancel-hard-edit' text='Cancel' onClick={cancelHardEdit}/>*/}
        <button type='button' className='cancel-hard-edit' onClick={cancelHardEdit}>Cancel</button>
    </form>
}