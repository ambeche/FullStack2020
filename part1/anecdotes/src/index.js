import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ heading }) => {
  return (
    <>
      <h1> {heading} </h1>
    </>
  );
};

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const MostVoted = ({ statesProps }) => {
  const [votes, anecdotes] = statesProps;

  if (votes.reduce((sum, e) => sum + e, 0) > 0) {
    const maxi = Math.max(...votes);
    console.log("votes:", votes);
    return (
      <>
        <p>
          {anecdotes[votes.indexOf(maxi)]} <br />
          Has {votes[votes.indexOf(maxi)]} votes
        </p>
      </>
    );
  }
  return (
    <>
      <p>No votes yet, click the button above to vote.</p>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );
  
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
    console.log(votes[selected]);
  };

  const statesProps = [votes, anecdotes];

  return (
    <div>
      <Header heading="Anecdote of The Day" />
      <p>
        {anecdotes[selected]} <br />
        Has {votes[selected]} votes
      </p>
      <Button text="Vote" handleClick={handleVotes()} />
      <Button text="Next Anecdote" handleClick={handleRanSelection()} />
      <Header heading="Anecdote With The Most Votes" />
      <MostVoted statesProps={statesProps} />
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
