import React, {ChangeEvent, MutableRefObject, useEffect} from "react";

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    className: string;
    value: string;
    inputRef: MutableRefObject<HTMLInputElement>;
}

export const DropdownInput = ({inputRef, onChange, className, value}: Props) => {

    useEffect(()=>{
        inputRef.current.focus();
    }, [inputRef]);

    return (
        <input
            placeholder='Type atleast 2 characters to search'
            ref={inputRef}
            className={className}
            onChange={onChange}
            value={value}
            autoComplete="off"
            type="text"
            name="product"/>
    )
}