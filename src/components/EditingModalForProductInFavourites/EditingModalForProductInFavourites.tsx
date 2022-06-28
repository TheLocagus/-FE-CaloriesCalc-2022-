import React, {useState} from "react";
import {Button} from "../common/Button";

export const EditingModalForProductInFavourites = () => {

    const [values, setValues] = useState({
        name: '',
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        calories: 0,
        amount: 0
    })

    const updateForm = (key: string, value: any) => {
        setValues(form => ({
            ...form,
            [key]: value,
        }))
    }

    return (
        <>
            <form className="modal-form" onSubmit={()=>{}}>
                <div className="modal-form-name">
                    <label> Name:
                        <input
                            maxLength={50}
                            value={values.name}
                            type="text"
                            onChange={e => updateForm('name', e.target.value)}
                        />
                    </label>
                </div>
                <div className="modal-form-macronutrients">
                    <label> Proteins:
                        <input
                            min={0}
                            value={values.proteins}
                            type="number"
                            onChange={e => updateForm('proteins', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                    <label> Carbohydrates:
                        <input
                            min={0}
                            value={values.carbohydrates}
                            type="number"
                            onChange={e => updateForm('carbohydrates', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                    <label> Fats:
                        <input
                            min={0}
                            value={values.fats}
                            type="number"
                            onChange={e => updateForm('fats', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                    <label> Calories:
                        <input
                            min={0}
                            value={values.calories}
                            type="number"
                            onChange={e => updateForm('calories', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                    <label> Amount:
                        <input
                            min={0}
                            value={values.amount}
                            type="number"
                            onChange={e => updateForm('calories', e.target.value[0] === "0" && e.target.value.length > 1 ? e.target.value.substring(1) : e.target.value)}
                        />
                    </label>
                </div>
                <Button className='save-new-custom-meal' onClick={()=>{}} text='Save'/>
            </form>
        </>
    )
}