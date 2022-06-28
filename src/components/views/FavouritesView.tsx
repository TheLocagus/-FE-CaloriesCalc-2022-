import React, {SyntheticEvent, useEffect, useState} from "react";
import {FavouriteMeal} from "../FavouriteMeal/FavouriteMeal";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

import './FavouriteView.css';
import {ActiveFavouriteMeal} from "../ActiveFavouriteMeal/ActiveFavouriteMeal";
import {Button} from "../common/Button";
import {ModalCustom} from "../common/ModalCustom";

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
    const [title, setTitle] = useState<string>('');
    const [titleInput, setTitleInput] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = useSelector((store: RootState) => store.caloriesCalculator)
    useEffect(() => {
        (async () => {
            if (user) {
                const res = await fetch(`http://localhost:3002/user/${user.id}/favourites`);
                const data: FavouritesEntity[] = await res.json();
                setFavourites(data)
            }
        })()
    }, [user])

    const closeModal = () => {
        setIsModalOpen(false);
    }
    const openModal = () => {
        setIsModalOpen(true);
    }

    const changeTitle = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(favourites)
        if (favourites) {
            const mealToUpdate: FavouritesEntity = {
                ...favourites[activeMealIndex],
                title: titleInput
            }

            console.log(mealToUpdate)

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

    const removeFavouriteMeal = async(mealId: string) => {
        const res = await fetch('http://localhost:3002/user/favourites/', {
            method: 'DELETE',
            body: JSON.stringify({
                id: mealId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();
        console.log(data)
    }

    if (favourites === null || favourites === undefined) {
        return <h2>Loading...</h2>
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
                            setTitle={setTitle}
                            removeFavouriteMeal={removeFavouriteMeal}
                        />
                    )
                }
            </div>
            <div className="actual-favourite-meal">
                <div className="actual-favourite-meal-title">
                    <div className="title">
                        <h2>{title}</h2>
                    </div>
                    <Button className="actual-favourite-meal__edit-button" text="Edit" onClick={openModal}/>

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
            <ModalCustom closeModal={closeModal} isModalVisible={isModalOpen} titleContent={<h2>Change title</h2>}
                         modalContent=
                             {<form onSubmit={changeTitle}>
                                 <input value={titleInput} onChange={e => {
                                     setTitleInput(e.target.value)
                                 }} type="text"/>
                                 <Button className='change-title-button' text='Change' onClick={() => {
                                 }}/>
                             </form>}/>
        </div>
    )
}