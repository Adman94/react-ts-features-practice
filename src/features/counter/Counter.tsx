import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  reset,
  increment,
  decrement,
  squareroot,
  incrementByAmount,
  decrementByAmount,
  selectCount,
  multiplyByAmount,
  divideByAmount,
  powerByAmount,
} from "./counterSlice";
import "../../styles/Counter.css";

const Counter = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>(0);

  const inputValue = amount === null ? "" : String(amount);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setAmount(0);
    } else {
      const parsedIntValue = Number(value);
      if (!isNaN(parsedIntValue)) {
        setAmount(parsedIntValue);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Simple Redux ToolKit Calculator</h1>
      <h1 className="count">{count}</h1>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(squareroot())}>√</button>
      </div>
      <div className="input">
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          + by {inputValue}
        </button>
        <button onClick={() => dispatch(decrementByAmount(amount))}>
          - by {inputValue}
        </button>
        <button onClick={() => dispatch(multiplyByAmount(amount))}>
          * by {inputValue}
        </button>
        <button onClick={() => dispatch(divideByAmount(amount))}>
          / by {inputValue}
        </button>
        <button onClick={() => dispatch(powerByAmount(amount))}>
          raise by {inputValue}
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(reset())}> RESET</button>
      </div>
    </div>
  );
};

export default Counter;
