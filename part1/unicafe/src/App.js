import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatRow = ({ descr, value }) => <tr><td>{descr}:</td><td>{value}</td></tr>;

const Feedback = ({incrGood, incrNeutral, incrBad}) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" onClick={incrGood} />
      <Button text="Neutral" onClick={incrNeutral} />
      <Button text="Bad" onClick={incrBad} />
    </div>
  );
};

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const positivePercent = (good + neutral) / total * 100;

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatRow descr="Good" value={good} />
          <StatRow descr="Neutral" value={neutral} />
          <StatRow descr="Bad" value={bad} />
          <StatRow descr="Total" value={total} />
          <StatRow descr="Average" value={avg} />
          <StatRow descr="Positive" value={positivePercent.toString() + '%'} />
        </tbody>
      </table>
    </div>
  );
};


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback incrGood={() => setGood(good + 1)} incrNeutral={() => setNeutral(neutral + 1)} incrBad={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;

