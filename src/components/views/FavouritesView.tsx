import React, {SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FavouriteMealInList} from "../Favourites/FavouriteMealInList/FavouriteMealInList";
import {MyModal} from "../common/MyModal/MyModal";
import {
    ChangeTitleOfFavouriteMeal
} from "../common/MyModal/ModalContents/ChangeTitleOfFavouriteMeal/ChangeTitleOfFavouriteMeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ErrorEntity, FavouritesEntity, UpdateTitleEntity} from "types";
import {setError} from "../../actions/caloriesCalclator";
import {ActiveFavouriteMeal} from "../Favourites/ActiveFavouriteMeal/ActiveFavouriteMeal";

import './FavouriteView.css';
import {apiUrl} from "../../config/api";

interface FavouritesJsonResponse {
    favMeals: FavouritesEntity[],
    success: true,
}


export const FavouritesView = () => {
    const [favourites, setFavourites] = useState<FavouritesEntity[] | null>(null);
    const [activeMealIndex, setActiveMealIndex] = useState<number>(0);
    const [titleInput, setTitleInput] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = useSelector((store: RootState) => store.caloriesCalculator);
    const dispatch = useDispatch();
    const navigateError = useNavigate();
    useEffect(() => {
        (async () => {
            if (user) {
                const res = await fetch(`${apiUrl}/user/${user.id}/favourites`, {
                    credentials: "include",
                });
                const data: FavouritesJsonResponse | ErrorEntity = await res.json();
                if (!data.success) {
                    dispatch(setError(data))
                    navigateError('/error')
                }
                if (data.success) {
                    setFavourites(data.favMeals)
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
        if (favourites) {

            const titleData: UpdateTitleEntity = {
                title: titleInput,
                mealId: favourites[activeMealIndex].favouriteId,
                userId: user.id,
                whatToChange: 'title'
            }

            const res = await fetch(`${apiUrl}/user/favourites`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(
                    titleData,
                )
            })
            const data: FavouritesJsonResponse | ErrorEntity = await res.json();
            if (!data.success) {
                dispatch(setError(data))
            }
            if (data.success) {
                setFavourites(data.favMeals);
                setIsModalOpen(false);
            }
        }
    }

    const removeFavouriteMeal = async (mealId: string, userId: string) => {
        const res = await fetch(`${apiUrl}/user/favourites/`, {
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
        const data: FavouritesJsonResponse | ErrorEntity = await res.json();
        if(!data.success){
            dispatch(setError(data))
        }
        if(data.success){
            setFavourites(data.favMeals);
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
                            key={fav.favouriteId}
                            id={fav.favouriteId}
                            index={i}
                            title={fav.title}
                            items={fav.products}
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