import { useState } from 'react';

const DailyAnecdote = ({ anecdote, vote, handleVote, handleNext }) => {
  return (
    <div>
      <h1>DAILY Anecdote</h1>
      <p>{anecdote}</p>
      <p>Has {vote} votes.</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>Next Anecdote</button>
    </div>
  );
};

const WinningAnecdote = ({ anecdotes, votes }) => {
  let bestIndex = 0, bestVotes = 0;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > bestVotes) {
      bestVotes = votes[i];
      bestIndex = i;
    }
  }

  return (
    <div>
      <h1>BEST Anecdote</h1>
      <p>{anecdotes[bestIndex]}</p>
      <p>Has {bestVotes} votes.</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNext = () => {
    const choice = Math.floor(Math.random() * anecdotes.length);
    setSelected(choice);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  return (
    <div>
      <DailyAnecdote anecdote={anecdotes[selected]} vote={votes[selected]} handleNext={handleNext} handleVote={handleVote} />
      <WinningAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
