import React from "react";
import {MealEntity} from "../CaloriesCalculator";

interface Props {
    meals: MealEntity[] | []
}

export const MealsSummary = ({meals}: Props) => {

    return (
        <div className="meals-summary">
            <header className="meals-summary__header">
                <p>Podsumowanie:</p>
            </header>
            <div className="meals-summary__proteins">
                <p>Białko: 200g</p>
            </div>
            <div className="meals-summary__carbo">
                <p>Węglowodany: 140g</p>
            </div>
            <div className="meals-summary__fats">
                <p>Tłuszcze: 50g</p>
            </div>
            <div className="meals-summary__calories">
                <p>Kalorie: 2100kcal</p>
            </div>
        </div>
    )
}