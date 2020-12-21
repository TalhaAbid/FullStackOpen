import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, eventHandler }) => (
  <button onClick={eventHandler}>{text}</button>
);

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return <p>no feedback given</p>;
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={total} />
            <Statistic text="average" value={(good - bad) / total} />
            <Statistic text="positive" value={(good / total) * 100} />
          </tbody>
        </table>
      </>
    );
  }
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let total = good + bad + neutral;

  const handleGood = () => setGood(good + 1);
  const handleBad = () => setBad(bad + 1);
  const handleNeutral = () => setNeutral(neutral + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" eventHandler={handleGood} />
      <Button text="neutral" eventHandler={handleNeutral} />
      <Button text="bad" eventHandler={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
