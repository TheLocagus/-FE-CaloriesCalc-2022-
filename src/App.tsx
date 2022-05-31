import React from 'react';
import {CaloriesCalculatorView} from "./components/views/CaloriesCalculatorView";
import {HeaderView} from "./components/views/HeaderView";
import './App.css';
import Modal from "react-modal";

export const App = () => {
    Modal.setAppElement('#root');
    return (
        <div className="App">
            <HeaderView/>
            <CaloriesCalculatorView/>
        </div>
    );
}

