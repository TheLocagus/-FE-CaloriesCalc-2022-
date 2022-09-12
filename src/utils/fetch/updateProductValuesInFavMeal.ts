import {ProductToUpdateResponse, ProductToUpdateDto} from "types";
import {apiUrl} from "../../config/api";

export const updateProductValuesInFavMeal = async(dataValues: ProductToUpdateDto) => {
    const res = await fetch(`${apiUrl}/favourite/product`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(
            dataValues,
        )

    })
    const data: ProductToUpdateResponse = await res.json();

    return data;
}