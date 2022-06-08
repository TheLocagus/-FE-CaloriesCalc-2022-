import React, {ChangeEvent, MutableRefObject, useEffect, useLayoutEffect, useRef} from "react";

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
            ref={inputRef}
            className={className}
            onChange={onChange}
            value={value}
            autoComplete="off"
            type="text"
            name="product"/>
    )
}