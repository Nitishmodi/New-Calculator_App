import React, { useState} from 'react'
import './Button.css'
import axios from 'axios';

const Button = () => {
  const [input, setInput] = useState("");

  const calcBtns = [];
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "%"];
  numbers.forEach((item) => {
    calcBtns.push(
      <button
        onClick={(e) => {
          setInput(input + e.target.value);
        }}
        value={item}
        key={item} > {item}</button>
    );
  });

  const handleEquals = async (e) => {
    let final_Answer;
    e.preventDefault();
    try {
        const inte_Answer = String((eval(input)));
        final_Answer = input + '=' + inte_Answer;
        setInput(inte_Answer);
    } catch(err) {
      console.log(err);
    }

    const request_Calculation = {
        calculation: final_Answer
    }

    axios.post('/api', request_Calculation)
    .then(response => {
      if (response.status === 200) {
       
      } else {
        alert('Failed ');
      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div className= "flex-fill">
    <div className="wrapper">
      <div className="show-input">{input}</div>
      <div className="digits flex">{calcBtns}</div>
      <div className="modifiers subgrid">

        <button onClick={() => setInput(input.substr(0, input.length - 1))}>
          Clear
        </button>

        <button onClick={() => setInput("")} value="">
          AC
        </button>
      </div>
      <div className="operations subgrid">
        <button onClick={(e) => setInput(input + e.target.value)} value="+">
          +
        </button>

        <button onClick={(e) => setInput(input + e.target.value)} value="-">
          {" "}
          -{" "}
        </button>

        <button onClick={(e) => setInput(input + e.target.value)} value="*">
          {" "}
          *
        </button>

        <button onClick={(e) => setInput(input + e.target.value)} value="/">
          {" "}
          /
        </button>
      </div>
      <div className="equals">
        <form>
          <button className="button1" type="submit" onClick={handleEquals} value="=">=</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Button
