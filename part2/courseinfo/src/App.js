const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} /> <Content parts={course.parts} /> <Total parts={course.parts} />
    </div>
  );
};


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  );
};

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(p => <Part key={p.id} part={p} />)}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((prior, curr) => prior + curr.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  );
};


const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      {
        name: "Rendering a collection",
        exercises: 5,
        id: 4
      }
    ]
  };

  return (
    <Course course={course} />
  );

};

export default App;