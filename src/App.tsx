import React from 'react';
import {CaloriesCalculatorView} from "./components/views/CaloriesCalculatorView";
import {HeaderView} from "./components/views/HeaderView";
import './App.css';

export const App = () => {
    return (
        <div className="App">
            <HeaderView/>
            <CaloriesCalculatorView/>
        </div>
    );
}

