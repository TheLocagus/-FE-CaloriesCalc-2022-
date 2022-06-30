import React, {SyntheticEvent, useState} from "react";
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {v4 as uuid} from 'uuid';

import "./Meal.css"
import {FavouritesEntity, FavouritesProducts} from "types";

import {MyModal} from "../../common/MyModal/MyModal";
import {SetTitleOnFavourite} from "../../common/MyModal/ModalContents/SetTitleOnFavourite/SetTitleOnFavourite";


interface Props {
    mealIndex: number;
}

export const Meal = ({mealIndex}: Props) => {
    const {meals, user} = useSelector((store: RootState) => store.caloriesCalculator);
    const [isModalAddToFavouriteOpen, setIsModalAddToFavouriteOpen] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [isFavourite, setIsFavourite] = useState(false);

    const addFavourite = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!user) {
            return <h2>Błąd</h2>
        }

        const generatedMealId = uuid();

        const generatedCorrectMeal: FavouritesProducts[] = meals[mealIndex].map((meal, i) => ({
            ...meal,
            favouriteId: generatedMealId,
            index: i,
            id: uuid(),
        }))

        const mealToSend: FavouritesEntity = {
            title: titleInput,
            favouriteId: generatedMealId,
            userId: user.id,
            products: generatedCorrectMeal
        };

        const res = await fetch('http://localhost:3002/user/favourites', {
            method: 'POST',
            body: JSON.stringify(mealToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();
        setIsFavourite(true);
        setIsModalAddToFavouriteOpen(false);

    }

    const showAddFavouriteModal = async () => {
        setIsModalAddToFavouriteOpen(true);
    }

    const closeAddFavouriteModal = () => {
        setIsModalAddToFavouriteOpen(false);
    }

    const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitleInput(e.target.value)
    }

    return (
        <div className="meal">
            <MealHeader
                showAddFavouriteModal={showAddFavouriteModal}
                mealIndex={mealIndex}
                isFavourite={isFavourite}
            />
            {
                isModalAddToFavouriteOpen
                    // ? <ModalCustom isModalVisible={isModalAddToFavouriteOpen} closeModal={closeAddFavouriteModal} titleContent={<h2>Type Your meal's title</h2>}
                    //         modalContent={<form onSubmit={addFavourite}>
                    //             <input type="text" value={titleInput} onChange={e => setTitleInput(e.target.value)}/>
                    //             <button>Confirm</button>
                    //         </form>}/>
                    ? <MyModal closeModal={closeAddFavouriteModal} title="Type Your meal's title" content={
                        <SetTitleOnFavourite title={titleInput} addFavourite={addFavourite} changeInputValue={changeInputValue}/>}
                    />

                    : null
            }
            <MealAddingNewProduct
                mealIndex={mealIndex}
            />
            <MealProducts
                mealIndex={mealIndex}
            />
            <MealSummary
                mealIndex={mealIndex}
            />

            {
                meals.length > 1
                    ? <div className="separator"></div>
                    : null
            }
        </div>
    )
}