import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const initialText =
  "You can only do what you have to do and is is important to do at least one at a time and is only to do so";
function App() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState({ wpm: 0, accuracy: 0 });
  const [timer, setTimer] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);

  const handleChangeInText = (e) => {
    setUserInput(e.target.value);
  };

  const startTest = () => {
    setText(initialText);
    setUserInput("");
    setResult({ wpm: 0, accuracy: 0 });
    setTimer(5);
    setTimeStart(Date.now());
  };
  const calculateResult = () => {
    const word = userInput.trim().split(/\s+/).length;
    const elapsedTimeInSeconds = (timeEnd - timeStart) / 1000;
    console.log(-elapsedTimeInSeconds);
    const wpm = Math.round((word / -elapsedTimeInSeconds) * 60);
    console.log(wpm);
    const initial = initialText.length;
    const userInitial = userInput.length;
    const accuracy = Math.round(initial - userInitial) * 100;
    console.log(accuracy);
    setResult({ wpm, accuracy });
  };
  const stopTest = () => {
    setUserInput("");
    setTimer(null);
    setTimeStart(null);
    setTimeEnd(null);
    setText(null);
  };

  const prevTimer = useRef();
  prevTimer.current = timer;
  useEffect(() => {
    if (timer > 0) {
      const countDown = setInterval(() => {
        setTimer((prevTimer.current = prevTimer.current - 1));
      }, 1000);
      return () => clearInterval(countDown);
    } else if (timer === 0) {
      clearInterval(timer);
      setTimer(null);
      setText(null);
      calculateResult();
      setTimeEnd(Date.now());
    }
  }, [timer]);
  return (
    <div className="App">
      <div className="container">
        {" "}
        {timer}
        <p>{text}</p>
        <input
          type="text"
          value={userInput}
          placeholder="Start test"
          onChange={handleChangeInText}
        />
        <br />
        {!timer && (
          <button className="btn btn-primary" onClick={startTest}>
            Start Test
          </button>
        )}
        {timer && <button onClick={stopTest}>Stop</button>}
        <>
          <p> Your WMP = {result.wpm}</p>
          <p>Your Accuracy = {result.accuracy}</p>
        </>
      </div>
    </div>
  );
}

export default App;
