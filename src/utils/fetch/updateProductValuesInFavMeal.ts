import {ErrorEntity, FavouritesEntity, UpdateValuesEntity } from "types";

interface FavouritesJsonResponse {
    favMeals: FavouritesEntity[],
    success: true,
}

export const updateProductValuesInFavMeal = async(dataValues: UpdateValuesEntity) => {
    const res = await fetch('http://localhost:3002/user/favourites', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(
            dataValues,
        )

    })
    const data: FavouritesJsonResponse | ErrorEntity = await res.json();

    return data;
}