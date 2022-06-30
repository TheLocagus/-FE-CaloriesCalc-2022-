import React, {SyntheticEvent, useEffect, useState} from "react";
import {FavouriteMeal} from "../Favourites/FavouriteMeal/FavouriteMeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {ActiveFavouriteMeal} from "../Favourites/ActiveFavouriteMeal/ActiveFavouriteMeal";

import './FavouriteView.css';
import {BsPencilSquare} from "react-icons/bs";
import {MyModal} from "../common/MyModal/MyModal";
import {
    ChangeTitleOfFavouriteMeal
} from "../common/MyModal/ModalContents/ChangeTitleOfFavouriteMeal/ChangeTitleOfFavouriteMeal";

export interface FavouritesProduct {
    id: string,
    name: string,
    proteins: number,
    carbohydrates: number,
    fats: number,
    calories: number,
    amount: number,
    index: number
}

export interface FavouritesEntity {
    title: string;
    favouriteId: string;
    userId: string;
    products: FavouritesProduct[]
}

export const FavouritesView = () => {
    const [favourites, setFavourites] = useState<FavouritesEntity[] | null>(null);
    const [activeMealIndex, setActiveMealIndex] = useState<number>(0);
    const [titleInput, setTitleInput] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = useSelector((store: RootState) => store.caloriesCalculator);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            if (user) {
                const res = await fetch(`http://localhost:3002/user/${user.id}/favourites`);
                const data: FavouritesEntity[] = await res.json();
                setFavourites(data)
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
            const mealToUpdate: FavouritesEntity = {
                ...favourites[activeMealIndex],
                title: titleInput
            }

            const res = await fetch('http://localhost:3002/user/favourites', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    mealToUpdate
                )

            })
            const data: FavouritesEntity[] = await res.json();
            setFavourites(data);
            setIsModalOpen(false);
        }
    }

    const removeFavouriteMeal = async (mealId: string, userId: string) => {
        const res = await fetch('http://localhost:3002/user/favourites/', {
            method: 'DELETE',
            body: JSON.stringify({
                mealId,
                userId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();
        setFavourites(data.meals);
        setActiveMealIndex(0);
        console.log(data.message)
        console.log(data.status)

    }

    const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value)
    }


    return (
        <div className='favourite-meals-wrapper'>
            <div className='favourite-meals-list'>
                {
                    favourites.map((fav, i) =>
                        <FavouriteMeal
                            key={fav.favouriteId}
                            id={fav.favouriteId}
                            index={i}
                            title={fav.title}
                            items={fav.products}
                            setActiveMealIndex={setActiveMealIndex}
                            // setTitle={setTitle}
                            removeFavouriteMeal={removeFavouriteMeal}
                            userId={user.id}
                        />
                    )
                }
            </div>
            <div className="actual-favourite-meal">
                <div className="actual-favourite-meal-title">
                    <div className="title">
                        <h2>{favourites[activeMealIndex].title}</h2>
                    </div>
                    <BsPencilSquare className="actual-favourite-meal__edit-icon" onClick={openModal}/>

                </div>
                {favourites[activeMealIndex].products.map((product, i) =>
                    <ActiveFavouriteMeal
                        key={i}
                        favourites={favourites}
                        activeMealIndex={activeMealIndex}
                        product={product}
                        setFavourites={setFavourites}
                    />
                )}
            </div>
            {
                isModalOpen

                    ? <MyModal
                        closeModal={closeModal}
                        title='Change title'
                        content={<ChangeTitleOfFavouriteMeal changeTitle={changeTitle} title={titleInput} changeInputValue={changeInputValue}/>
                    }/>
                    : null
            }

        </div>
    )
}