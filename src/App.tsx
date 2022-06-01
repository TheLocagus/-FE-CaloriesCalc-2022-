import React from 'react';
import {CaloriesCalculatorView} from "./components/views/CaloriesCalculatorView";
import {HeaderView} from "./components/views/HeaderView";
import './App.css';
import Modal from "react-modal";
import {Provider} from "react-redux";
import {store} from "./store";

export const App = () => {
    Modal.setAppElement('#root');
    return (
        <div className="App">
            <HeaderView/>
            <Provider store={store}>
                <CaloriesCalculatorView/>
            </Provider>
        </div>
    );
}

