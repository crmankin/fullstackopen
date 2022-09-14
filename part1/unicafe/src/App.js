import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;


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
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>Good:</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral:</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad:</td>
            <td>{bad}</td>
          </tr>
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

