import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return (
    <div>
      <h1> {text} </h1>
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}> {text} </button>
    </>
  );
};

const Statistic = ({ stats, count }) => {
  return (
    <>
      <tr>
        <td> {stats} </td>
        <td> {count} </td>
      </tr>
    </>
  );
};

const Statistics = ({ feedback }) => {
  console.log('feedback', feedback);
  const [good, neutral, bad] = feedback;
  const totalCount = good + neutral + bad;
  const ave = (good - bad) / totalCount;
  const percent = (good / totalCount) * 100;

  if (totalCount === 0) {
    return (
      <>
        <p> No feedback, click a button above to give feedback </p>
      </>
    );
  }
  return (
    <>
      <table>
        <tbody>
          <Statistic stats="Good" count={good} />
          <Statistic stats="Neutral" count={neutral} />
          <Statistic stats="Bad" count={bad} />
          <Statistic stats="All" count={totalCount} />
          <Statistic stats="Average" count={ave} />
          <Statistic stats="Positive" count={`${percent} %`} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => () => setGood(good + 1);
  const handleNeutral = () => () => setNeutral(neutral + 1);
  const handleBad = () => () => setBad(bad + 1);

  const feedback = [good, neutral, bad];

  return (
    <div>
      <Header text="Give Feedback" />
      <Button text="Good" handleClick={handleGood()} />
      <Button text="Neutral" handleClick={handleNeutral()} />
      <Button text="Bad" handleClick={handleBad()} />
      <Header text="Statistics" />
      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
