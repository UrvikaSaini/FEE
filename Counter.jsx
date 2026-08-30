import { useState } from 'react'
import './Counter.css'

function Counter() {
    const [count, setCount] = useState(0);
    
    function increment() {
        setCount(prevCount=>prevCount+1);
    }
    function decrement() {
        setCount(prevCount=>prevCount-1);
    }
    function reset(){
        setCount(0);
    }
    return (
        <>
            <div classname="counter">
                <h1>Counter Application</h1>
                <div className="count-value">
                    <h3>Count : {count}</h3>
                </div>
                <div className="Buttons">
                    <button className="btn dec-btn" onClick={decrement}>- Decrement</button>
                    <button className="btn reset-btn" onClick={reset}>Reset</button>
                    <button className="btn inc-btn" onClick={increment}>+ Increment</button>
                </div>
            </div>
        </>
    );
}
export default Counter