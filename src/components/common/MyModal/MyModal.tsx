import React from 'react';
import "./MyModal.css";
import {Button} from "../Button";
import {MdCancel} from "react-icons/md";

interface Props {
    closeModal: () => void;
    title: string;
    subtitle?: string;
    content: JSX.Element;
}

export const MyModal = ({closeModal, title, content, subtitle}: Props) => {
    return (
        <div className='modal-container'>
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title">
                        <h2>{title}</h2>
                        {
                            subtitle
                                ? <small>{subtitle}</small>
                                : null
                        }
                    </div>
                    <MdCancel className='close-modal' onClick={closeModal}/>
                </div>

                <div className="modal-content">
                    {content}
                </div>

            </div>
        </div>
    )
}