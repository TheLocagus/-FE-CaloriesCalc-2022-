import React, {SyntheticEvent, useState} from "react";
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {v4 as uuid} from 'uuid';

import "./Meal.css"
import {FavouritesEntity, FavouritesJoinedInDatabase, FavouritesProducts } from "types";
import {ModalCustom} from "../../common/ModalCustom";


interface Props {
    mealId: number;
}

export const Meal = ({ mealId}: Props) => {
    const {meals, user} = useSelector((store: RootState) => store.caloriesCalculator);
    const [isModalAddToFavouriteOpen, setIsModalAddToFavouriteOpen] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [isMealFavourite, setIsMealFavourite] = useState(false);

    if(!user){
        return <h2>Błąd</h2>
    }

    const addFavourite = async(e: SyntheticEvent) => {
        e.preventDefault();
        const generatedFavouriteMealId = uuid();
        const generatedCorrectMeal: FavouritesProducts[] = meals[mealId].map((meal, i) => ({
            ...meal,
            favouriteId: generatedFavouriteMealId,
            index: i,
            id: uuid(),
        }))


        const mealToSend: FavouritesEntity = {
            title: titleInput,
            favouriteId: generatedFavouriteMealId,
            userId: user.id,
            products: generatedCorrectMeal
        };

        console.log(mealToSend)

        const res = await fetch('http://localhost:3002/user/favourites', {
            method: 'POST',
            body: JSON.stringify(mealToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })


        const data = await res.json();
        console.log(data.status)
        setIsMealFavourite(true);
        setIsModalAddToFavouriteOpen(false);

    }

    const showAddFavouriteModal = async() => {
        setIsModalAddToFavouriteOpen(true);
    }

    const closeAddFavouriteModal = () => {
        setIsModalAddToFavouriteOpen(false);
    }

    return (
        <div className="meal">
            <MealHeader
                showAddFavouriteModal={showAddFavouriteModal}
                mealId={mealId}
                isMealFavourite={isMealFavourite}
            />
            {
                isModalAddToFavouriteOpen
                ? <ModalCustom isModalVisible={isModalAddToFavouriteOpen} closeModal={closeAddFavouriteModal} titleContent={<h2>Type Your meal's title</h2>}
                        modalContent={<form onSubmit={addFavourite}>
                            <input type="text" value={titleInput} onChange={e => setTitleInput(e.target.value)}/>
                            <button>Confirm</button>
                        </form>}/>
                    : null
            }
            <MealAddingNewProduct
                mealId={mealId}
            />
            <MealProducts
                mealId={mealId}
            />
            <MealSummary
                mealId={mealId}
            />

            {
                meals.length > 1
                    ? <div className="separator"></div>
                    : null
            }
        </div>
    )
}