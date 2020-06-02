import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  console.log(`Anecdote: ${anecdotes[selected]}\nIndex: ${selected}`);
  const handleRanSelection = () => () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVotes = () => () => {
    const votesClone = [...votes];
    votesClone[selected] += 1;
    setVotes(votesClone);
    console.log(votes);
  };

  return (
    <div>
      <p>
        {anecdotes[selected]} Has {votes[selected]} votes
      </p>
      <Button text="Vote" handleClick={handleVotes()} />
      <Button text="Next Anecdote" handleClick={handleRanSelection()} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
