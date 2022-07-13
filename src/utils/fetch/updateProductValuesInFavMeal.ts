import {ErrorEntity, FavouritesEntity, UpdateValuesEntity } from "types";
import {apiUrl} from "../../config/api";

interface FavouritesJsonResponse {
    favMeals: FavouritesEntity[],
    success: true,
}

export const updateProductValuesInFavMeal = async(dataValues: UpdateValuesEntity) => {
    const res = await fetch(`${apiUrl}/user/favourites`, {
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