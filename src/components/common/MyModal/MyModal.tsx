import React from 'react';
import {MdCancel} from "react-icons/md";
import "./MyModal.scss";

interface Props {
    closeModal: () => void;
    title: string;
    subtitle?: string;
    content: JSX.Element;
}

export const MyModal = ({closeModal, title, content, subtitle}: Props) => {
    return (
        <div className='modal-container'>
            <div className="modal-container__modal">
                <div className="modal-container__modal__header">
                    <div className="modal-container__modal__header__title">
                        <h2>{title}</h2>
                        {
                            subtitle
                                ? <small>{subtitle}</small>
                                : null
                        }
                    </div>
                    <MdCancel className='modal-container__modal__header__close-modal' onClick={closeModal}/>
                </div>

                <div className="modal-container__modal__content">
                    {content}
                </div>
            </div>
        </div>
    )
}