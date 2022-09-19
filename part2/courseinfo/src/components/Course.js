const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
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
        <p><strong>Number of exercises {total}</strong></p>
    );
};

export default Course;
