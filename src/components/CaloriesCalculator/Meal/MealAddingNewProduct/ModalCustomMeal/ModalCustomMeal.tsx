import React from "react";
import Modal from "react-modal";

import "./ModalCustomMeal.css";
import {Button} from "../../../../common/Button";
import {CustomMealForm} from "./CustomMealForm/CustomMealForm";
import { ProductEntity } from "types";

interface Props {
    isModalVisible: boolean,
    closeModal: () => void,
    mealId: number
}

export const ModalCustomMeal = ({mealId, isModalVisible, closeModal}: Props) => {

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
                        <h2>Add Your own product <span><small>Values at 100g</small></span></h2>
                        <Button className="modal-close-btn" onClick={closeModal} text="Cancel"/>
                    </div>
                    <CustomMealForm mealId={mealId} closeModal={closeModal}/>
                </Modal>
            </div>
        </>
    )
}