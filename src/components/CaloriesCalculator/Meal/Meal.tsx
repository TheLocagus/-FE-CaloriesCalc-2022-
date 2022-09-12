import React, {SyntheticEvent, useState} from "react";
import {v4 as uuid} from 'uuid';
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {
  AddToFavouriteDto,
  AddToFavouriteResponse,
  FavouriteProductToAddDto
} from "types";
import "./Meal.scss"

import {MyModal} from "../../common/MyModal/MyModal";
import {SetTitleOnFavourite} from "../../common/MyModal/ModalContents/SetTitleOnFavourite/SetTitleOnFavourite";
import {apiUrl} from "../../../config/api";

interface Props {
  mealIndex: number;
}

export const Meal = ({mealIndex}: Props) => {
  const {meals, user} = useSelector((store: RootState) => store.caloriesCalculator);
  const [isModalAddToFavouriteOpen, setIsModalAddToFavouriteOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);

  const addFavourite = async (e: SyntheticEvent): Promise<void | JSX.Element> => {
    e.preventDefault();

    if (!user) {
      return <h2>Błąd</h2>
    }

    const generatedMealId = uuid();

    // const generatedCorrectProductsInMeal: FavouriteProductWithIdInterface[] = meals[mealIndex].map((meal, i) => ({
    //     ...meal,
    //     favouriteId: generatedMealId,
    //     index: i,
    //     id: uuid(),
    // }))
    //
    // const mealToSend: FavouriteMealWithProductsInterface = {
    //     id: generatedMealId,
    //     title: titleInput,
    //     userId: user.id,
    //     favouritesProducts: generatedCorrectProductsInMeal
    // };

    const productsInNewFavouriteMeal: FavouriteProductToAddDto[] = meals[mealIndex].map((meal, i) => ({
      ...meal,
      index: i,
      id: uuid(),
    }))

    const newFavouriteMeal: AddToFavouriteDto = {
      mealId: generatedMealId,
      title: titleInput,
      userId: user.id,
      products: productsInNewFavouriteMeal,
    }

    const res = await fetch(`${apiUrl}/favourite`, {
      method: 'POST',
      body: JSON.stringify(newFavouriteMeal),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: AddToFavouriteResponse = await res.json();
    if(data.success){
      setIsFavourite(true);
      setIsModalAddToFavouriteOpen(false);
    } else {
      console.log(data.message)
    }
  }

  const showAddFavouriteModal = () => {
    if (meals[mealIndex].length !== 0) {
      setIsModalAddToFavouriteOpen(true);
    }
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
          ? <MyModal closeModal={closeAddFavouriteModal} title="Title" content={
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