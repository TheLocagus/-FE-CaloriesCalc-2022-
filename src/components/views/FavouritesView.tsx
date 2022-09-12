import React, {SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FavouriteMealInList} from "../Favourites/FavouriteMealInList/FavouriteMealInList";
import {MyModal} from "../common/MyModal/MyModal";
import {
  ChangeTitleOfFavouriteMeal
} from "../common/MyModal/ModalContents/ChangeTitleOfFavouriteMeal/ChangeTitleOfFavouriteMeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {
  FavouritesMealsResponse,
  FavouriteMealWithProductsInterface,
  ChangeTitleMealResponse,
  ChangeTitleMealAndUpdateDto,
  RemoveFavouriteMealResponse
} from "types";
// import {setError} from "../../actions/caloriesCalclator";
import {ActiveFavouriteMeal} from "../Favourites/ActiveFavouriteMeal/ActiveFavouriteMeal";

import './FavouriteView.css';
import {apiUrl} from "../../config/api";


export const FavouritesView = () => {
  const [favourites, setFavourites] = useState<FavouriteMealWithProductsInterface[] | null>(null);
  const [activeMealIndex, setActiveMealIndex] = useState<number>(0);
  const [titleInput, setTitleInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useSelector((store: RootState) => store.caloriesCalculator);
  const dispatch = useDispatch();
  const navigateError = useNavigate();
  useEffect(() => {
    (async () => {
      if (user) {
        const res = await fetch(`${apiUrl}/favourite/${user.id}/`, {
          credentials: "include",
        });
        const data: FavouritesMealsResponse = await res.json();
        if (!data.success) {
          // dispatch(setError(data))
          // navigateError('/error')
          console.log(data.message)
        }
        if (data.success) {
          setFavourites(data.meals)
        }
      }
    })()
  }, [user])
  if (!user) {
    return <h1>Error</h1>
  }
  if (favourites === null || favourites === undefined) {
    return <h2>Loading...</h2>
  }

  if (favourites.length === 0) {
    return <h2>Lista jest pusta</h2>
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  const openModal = () => {
    setIsModalOpen(true);
  }

  const changeTitle = async (e: SyntheticEvent) => {
    e.preventDefault();


    const titleData: ChangeTitleMealAndUpdateDto = {
      mealId: favourites[activeMealIndex].id,
      title: titleInput,
      userId: favourites[activeMealIndex].userId
    }

    const res = await fetch(`${apiUrl}/favourite/title`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(
        titleData,
      )
    })
    const data: ChangeTitleMealResponse = await res.json();
    if (!data.success) {
      // dispatch(setError(data))
      console.log(data.message)
    }
    if (data.success) {
      setIsModalOpen(false);
      setFavourites(prev => data.meals)
    }

  }

  const removeFavouriteMeal = async (mealId: string, userId: string) => {
    const res = await fetch(`${apiUrl}/favourite`, {
      method: 'DELETE',
      body: JSON.stringify({
        mealId,
        userId,
      }),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data: RemoveFavouriteMealResponse = await res.json();
    if (!data.success) {
      // dispatch(setError(data))
      console.log(data.message)
    }
    if (data.success) {
      setFavourites(data.meals);
      setActiveMealIndex(0);
    }
  }

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value)
  }

  return (
    <div className='favourite-meals-wrapper'>
      <div className='favourite-meals-list'>
        {
          favourites.map((fav, i) =>
            <FavouriteMealInList
              key={fav.id}
              id={fav.id}
              index={i}
              title={fav.title}
              items={fav.favouritesProducts}
              setActiveMealIndex={setActiveMealIndex}
              removeFavouriteMeal={removeFavouriteMeal}
              userId={user.id}
            />
          )
        }
      </div>
      <ActiveFavouriteMeal
        favourites={favourites}
        activeMealIndex={activeMealIndex}
        setFavourites={setFavourites}
        openModal={openModal}
      />
      {
        isModalOpen

          ? <MyModal
            closeModal={closeModal}
            title='Change title'
            content={<ChangeTitleOfFavouriteMeal
              changeTitle={changeTitle}
              title={titleInput}
              changeInputValue={changeInputValue}/>
            }/>
          : null
      }
    </div>
  )
}