import { useState } from "react";

const Total = (props) => {
  return (
  <p>{props.name} {props.total}</p>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <h2>{props.comments.titleSectionStatistics}</h2>
      {props.comments.typeComments.map((comment, index) => {
        return (
          <Total key={index} name={comment.name} total={comment.total} />
        );
      })}
    </div>
  );
};

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
  );
};

const FeedBack = (props) => {
  return (
    <div>
      <h2>{props.comments.titleSectionButtons}</h2>
      {props.comments.typeComments.map((comment, index) => {
        return (
          <Button key={index} handleClick={comment.handleClick} name={comment.name} />
        );
      })}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const sectionComments = {
    titleSectionButtons: "give feed back",
    titleSectionStatistics: "statistics",
    typeComments: [
      {
        name: "good",
        total: good,
        handleClick: () => setGood(good + 1),
      },
      {
        name: "neutral",
        total: neutral,
        handleClick: () => setNeutral(neutral + 1),
      },
      {
        name: "bad",
        total: bad,
        handleClick: () => setBad(bad + 1),
      },
    ],
  };
  return (
  <div>
    <FeedBack comments={sectionComments} />
    <Statistics comments={sectionComments} />
  </div>
  );
};

export default App;
