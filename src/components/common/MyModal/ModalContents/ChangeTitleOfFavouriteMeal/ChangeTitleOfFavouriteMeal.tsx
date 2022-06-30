import React, {SyntheticEvent} from 'react';
import './ChangeTitleOfFavouriteMeal.css';

interface Props {
    changeTitle: (e: SyntheticEvent) => Promise<void>;
    title: string;
    changeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChangeTitleOfFavouriteMeal = ({changeTitle, title, changeInputValue}: Props) => {

    return (
        <form onSubmit={changeTitle}>
            <input value={title} onChange={changeInputValue} type="text"/>
            <div className="modal-btn">
                <button type='submit' className='modal-confirm'>Confirm</button>
            </div>
        </form>
    )

}