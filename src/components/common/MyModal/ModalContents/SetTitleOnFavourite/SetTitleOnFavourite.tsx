import React, {SyntheticEvent} from "react";
import './SetTitleOnFavourite.css';
interface Props {
    addFavourite: (e: SyntheticEvent) => Promise<JSX.Element | undefined>;
    title: string;
    changeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SetTitleOnFavourite = ({addFavourite, title, changeInputValue}: Props) => {

    return (
        <form onSubmit={addFavourite}>
            <input type="text" value={title} onChange={changeInputValue}/>
            <button>Confirm</button>
        </form>
    )
}
