import React, {SyntheticEvent} from "react";
import './SetTitleOnFavourite.css';

interface Props {
    addFavourite: (e: SyntheticEvent) => Promise<JSX.Element | void>;
    title: string;
    changeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SetTitleOnFavourite = ({addFavourite, title, changeInputValue}: Props) => {

    return (
        <form onSubmit={addFavourite}>
            <input
                className='set-title-input'
                type="text"
                value={title}
                onChange={changeInputValue}
                placeholder='Name Your meal'/>
            <button>Confirm</button>
        </form>
    )
}
