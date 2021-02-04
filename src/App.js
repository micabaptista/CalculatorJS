import React, {useState, useEffect, useCallback} from "react"
import './App.css';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {ClearButton} from "./components/ClearButton";
import * as math from 'mathjs';

function App() {
    const [state, setState] = useState('');


    const addToInput = val => {
        setState(state + val);
    }

    const handleEqual = () => {
        setState(math.evaluate(state));
    }

    const handleUserKeyPress = useCallback(event => {

        const {key, keyCode} = event;
        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 187 && keyCode < 191)) {
            setState(prevUserText => `${prevUserText}${key}`);
        } else if (keyCode === 13) {

            //math.evaluate(`${prevUserText}`)
            setState(prevUserText => `${isValidExpression(prevUserText) ? math.evaluate(`${prevUserText}`)
                : prevUserText}`);

        } else if (keyCode === 8) {
            setState(prevUserText => prevUserText.toString().slice(0, -1))
        }else if (keyCode === 67) {
            setState('')
        }
    }, []);

    useEffect(() => {

        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };

    }, [handleUserKeyPress]);

    const isValidExpression = expression => {
        const lastChar = expression.substr(expression.length - 1);
        const firstChar = expression.charAt(0);
        return !isNaN(lastChar) && !isNaN(firstChar);

    }




    return (
        <div className="app">
            <div className="calc-wrapper">
                <Input input={state}/>

                <div className="row">
                    <Button handleClick={addToInput}>7</Button>
                    <Button handleClick={addToInput}>8</Button>
                    <Button handleClick={addToInput}>9</Button>
                    <Button handleClick={addToInput}>/</Button>
                </div>
                <div className="row">
                    <Button handleClick={addToInput}>4</Button>
                    <Button handleClick={addToInput}>5</Button>
                    <Button handleClick={addToInput}>6</Button>
                    <Button handleClick={addToInput}>*</Button>
                </div>
                <div className="row">
                    <Button handleClick={addToInput}>1</Button>
                    <Button handleClick={addToInput}>2</Button>
                    <Button handleClick={addToInput}>3</Button>
                    <Button handleClick={addToInput}>+</Button>
                </div>
                <div className="row">
                    <Button handleClick={addToInput}>.</Button>
                    <Button handleClick={addToInput}>0</Button>
                    <Button handleClick={() => handleEqual()}>=</Button>
                    <Button handleClick={addToInput}>-</Button>
                </div>
                <div className="row">
                    <ClearButton handleClear={() => setState('')}>
                        Clear
                    </ClearButton>
                </div>
            </div>
        </div>
    );
}

export default App;
