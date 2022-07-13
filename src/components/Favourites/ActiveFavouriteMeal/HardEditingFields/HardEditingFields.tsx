import React, {SyntheticEvent, useState} from "react";
import {FavouritesEntity, FavouritesProducts, UpdateValuesEntity } from "types";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {apiUrl} from "../../../../config/api";

interface Props {
    productValues: FavouritesProducts,
    favourites: FavouritesEntity[],
    activeMealIndex: number,
    setFavourites: React.Dispatch<React.SetStateAction<FavouritesEntity[] | null>>
    setIsHardEditActive:  React.Dispatch<React.SetStateAction<boolean>>

}

export const HardEditingFields = ({setIsHardEditActive, setFavourites, productValues}: Props) => {

    const [values, setValues] = useState<FavouritesProducts>({
        id: productValues.id,
        name: productValues.name,
        proteins: productValues.proteins,
        carbohydrates: productValues.carbohydrates,
        fats: productValues.fats,
        calories: productValues.calories,
        amount: productValues.amount,
        index: productValues.index,
        favouriteId: productValues.favouriteId,
    });

    const {user} = useSelector((store: RootState) => store.caloriesCalculator);

    if(!user){
        return <h2>Błąd</h2>
    }

    const updateForm = (key: string, value: any) => {
        setValues(form => ({
            ...form,
            [key]: value,
        }))
    }

    const handleEdit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const newValues: FavouritesProducts = {
            ...values,
            proteins: Number(Number(values.proteins).toFixed(2)),
            carbohydrates: Number(Number(values.carbohydrates).toFixed(2)),
            fats: Number(Number(values.fats).toFixed(2)),
            calories: Number(Number(values.calories).toFixed(2)),
            amount: Number(Number(values.amount).toFixed(2)),
        };

        const dataValues: UpdateValuesEntity = {
            product: newValues,
            userId: user.id,
            whatToChange: 'values'
        }

        setIsHardEditActive(false)

        const res = await fetch(`${apiUrl}/user/favourites`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(
                dataValues
            )
        })

        const data: FavouritesEntity[] = await res.json();
        setFavourites(data);
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
        <button type='button' className='cancel-hard-edit' onClick={cancelHardEdit}>Cancel</button>
    </form>
}