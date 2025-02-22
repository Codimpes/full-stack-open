const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {props.content.map((part) => {
        return (
          <p>
            {part.name} {part.amount}
          </p>
        );
      })}
    </>
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
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const names = [part1, part2, part3];
  const amounts = [exercises1, exercises2, exercises3];
  const content = names.map((name, index) => ({
    name: name,
    amount: amounts[index],
  }));
  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Footer amounts={amounts} />
    </div>
  );
};

export default App;
