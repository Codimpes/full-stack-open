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
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
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

export default Course;
