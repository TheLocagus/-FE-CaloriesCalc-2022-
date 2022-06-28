import React from "react";
import Modal from "react-modal";

import "./ModalCustom.css";
import {Button} from "./Button";

interface Props {
    isModalVisible: boolean,
    closeModal: () => void,
    modalContent: JSX.Element,
    titleContent: JSX.Element
}

export const ModalCustom = ({isModalVisible, closeModal, modalContent, titleContent}: Props) => {

    const customStyles = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '45%',
        },
    };

    return (
        <>
            <div>
                <Modal
                    isOpen={isModalVisible}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    shouldCloseOnOverlayClick={false}
                >
                    <div className="modal-header">
                        {titleContent}
                        <Button className="modal-close-btn" onClick={closeModal} text="Cancel"/>
                    </div>
                    {modalContent}
                </Modal>
            </div>
        </>
    )
}