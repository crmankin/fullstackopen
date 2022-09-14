import { useState } from "react";

const Display = ({ counter }) => <span>{counter}</span>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const History = (props) => {
  if(props.allClicks.length === 0) {
    return <div>The app is used by pressing the buttons.</div>;
  }
  return <div>Button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setLeft(left + 1);
    setAll(allClicks.concat("L"));
  };
  const handleRightClick = () => {
    setRight(right + 1);
    setAll(allClicks.concat("R"));
  };

  return (
    <div>
      <Display counter={left} />
      <Button text="left" onClick={handleLeftClick} />
      <Button text="right" onClick={handleRightClick} />
      <Display counter={right} />
      <History allClicks={allClicks} />
    </div>
  );
}

export default App;
