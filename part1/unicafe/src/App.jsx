import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.total}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const totalSum = props.comments.typeComments.reduce(
    (acc, comment) => acc + comment.total,
    0
  );
  if (totalSum) {
    return (
      <div>
        <h2>{props.comments.titleSectionStatistics}</h2>
        <table>
          <tbody>
            {props.comments.typeComments.map((comment, index) => {
              return (
                <StatisticLine
                  key={index}
                  name={comment.name}
                  total={comment.total}
                />
              );
            })}
            <StatisticLine name="total" total={props.comments.total} />
            <StatisticLine name="average" total={props.comments.average} />
            <StatisticLine name="positive" total={props.comments.positive} />
          </tbody>
        </table>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>{props.comments.titleSectionStatistics}</h2>
        <h5>No feedback given</h5>
      </div>
    );
  }
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
  const total = good + neutral + bad;

  const average = total ? (good - bad) / total : 0;

  const positive = total ? (good * 100) / total : 0;

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
    total: total,
    average: average,
    positive: positive,
  };
  return (
  <div>
    <FeedBack comments={sectionComments} />
    <Statistics comments={sectionComments} />
  </div>
  );
};

export default App;
