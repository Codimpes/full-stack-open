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
      {props.name} {props.amount}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.content.map((part) => {
        return <Part name={part.name} amount={part.exercises} />;
      })}
    </div>
  );
};

const Footer = (props) => {
  const total = props.amounts.reduce((acc, num) => acc + num, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  const content = [part1, part2, part3];
  const amounts = [part1.exercises, part2.exercises, part3.exercises];

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Footer amounts={amounts} />
    </div>
  );
};

export default App;
