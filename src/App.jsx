import React, { useState } from 'react';
import * as math from 'mathjs';

//import { calcData } from './assets/calcData';

import './App.css';


function App() {
  const [output, setOutput] = useState('0');

  const handleClear = () => {
    setOutput('0');
  }

  const handleDelete = () => {
    let newOutput = output.trimEnd().slice(0, -1);
    setOutput(newOutput.trimEnd());
  }

  const handleNum = (e) => {
    const number = e.target.value;
    
    if (output === '0') {
      setOutput(number);
    } else {
      setOutput(output + number);
    }
  };

  const handleOperator = (e) => {
    const operator = e.target.value;
    let arr = output.trimEnd().split(' ');
    
    let lastVal = arr[arr.length-1];
    let beforeLast = arr[arr.length-2];

    let lastValIsOp = /[+x÷-]/.test(lastVal);
    let beforeLastIsOp = /[+x÷-]/.test(beforeLast);

    if (!lastValIsOp) {
      setOutput(output + ' ' + operator + ' ');
    } else if (lastValIsOp && !beforeLastIsOp) {
      if (operator === '-') {
        arr.push(operator);
        setOutput(arr.join(' ') + '');
      } else {
        arr.pop();
        arr.push(operator);
        setOutput(arr.join(' ')+ ' ');
      }
    } else if (lastValIsOp && beforeLastIsOp) {
      if (lastVal === '-' && operator !== '-') {
        arr.splice(-2);
        arr.push(operator);
        setOutput(arr.join(' ') + ' ');
      } else {
        arr.splice(-2, 1);
        arr.push(operator);
        setOutput(arr.join(' ') + ' ');
      }
    }  
  }

  const handleEquals = () => {
    let newOutput = output.replace(/÷/g, '/').replace(/x/g, '*');
    setOutput(math.evaluate(newOutput).toString());
  }

  const handleDecimal = () => {
    let arr = output.trimEnd().split(' ');
    let lastVal = arr[arr.length-1];
    let lastValIsOp = /[+x÷-]/.test(lastVal);
    
    if (lastValIsOp) {
      setOutput(output + '0.');
    } else if (!lastVal.includes('.')) {
      setOutput(output + '.');
    } 
  } 

  return (
    <div className='calculator'>
      <div id='display' className='row'>{output}</div>
      <button id='clear' value='AC' onClick={handleClear} className='span-two'>AC</button>
      <button id='delete' value='C' onClick={handleDelete}>C</button>
      <button id='divide' value='÷' onClick={handleOperator}>÷</button>
      <button id='seven' value='7' onClick={handleNum}>7</button>
      <button id='eight' value='8' onClick={handleNum}>8</button>
      <button id='nine' value='9' onClick={handleNum}>9</button>
      <button id='multiply' value='x' onClick={handleOperator}>x</button>
      <button id='four' value='4' onClick={handleNum}>4</button>
      <button id='five' value='5' onClick={handleNum}>5</button>
      <button id='six' value='6' onClick={handleNum}>6</button>
      <button id='subtract' value='-' onClick={handleOperator}>-</button>
      <button id='one' value='1' onClick={handleNum}>1</button>
      <button id='two' value='2' onClick={handleNum}>2</button>
      <button id='three' value='3' onClick={handleNum}>3</button>
      <button id='add' value='+' onClick={handleOperator}>+</button>
      <button id='zero' value='0' onClick={handleNum}>0</button>
      <button id='decimal' value='.' onClick={handleDecimal}>.</button>
      <button id='equals' value='=' onClick={handleEquals} className='span-two'>=</button>
    </div>  
  )
}

export default App;
