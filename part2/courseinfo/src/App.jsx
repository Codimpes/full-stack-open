const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      {props.course.parts.map((part) => {
        return <Part key={part.id} name={part.name} exercises={part.exercises} />;
      })}
      <Footer course={props.course} />
    </div>
  );
};

const Footer = (props) => {
  const amounts = props.course.parts.map((part) => part.exercises);
  const total = amounts.reduce((acc, num) => acc + num, 0);
  return (
    <>
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
