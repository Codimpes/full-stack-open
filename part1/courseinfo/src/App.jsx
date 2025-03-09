const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
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

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => {
        return <Part key={index} name={part.name} exercises={part.exercises} />;
      })}
    </div>
  );
};

const Footer = (props) => {
  const amounts = props.parts.map((part) => part.exercises);
  const total = amounts.reduce((acc, num) => acc + num, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Footer parts={parts} />
    </div>
  );
};

export default App;
