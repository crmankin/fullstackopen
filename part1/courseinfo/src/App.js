const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part name={props.part1} exercises={props.exer1} />
      <Part name={props.part2} exercises={props.exer2} />
      <Part name={props.part3} exercises={props.exer3} />
    </>
  );
};

const Total = (props) => {
  return (
    <p>Number of exercises {props.exer1 + props.exer2 + props.exer3}</p>
  );
};


const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exer1 = 10;
  const part2 = "Using props to pass data";
  const exer2 = 7;
  const part3 = "State of component";
  const exer3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exer1={exer1} exer2={exer2} exer3={exer3} />
      <Total exer1={exer1} exer2={exer2} exer3={exer3} />
    </div>
  );

};

export default App;
