import React, {Fragment, useState} from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    
    const handleIncrement = () => {
        setCount(count + 0.1);
    };

    const handleDecrement = () => {
        setCount(count - 0.1);
    };

    return(
        <Fragment>
            <p> R Value: {count}</p>
            <button onClick={handleIncrement}> Increment </button>
            <button onClick={handleDecrement}> Decrement </button>
        </Fragment>
    )

};

export default Counter;