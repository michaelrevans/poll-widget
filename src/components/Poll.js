import { useEffect, useState } from "react";
import storeVotes from "../utils/storeVotes";
import retrieveVotes from "../utils/retrieveVotes";
import calculatePercentage from "../utils/calculatePercentage";
import "./Poll.css";

const Poll = ({ question, answers, id }) => {
  const storedVotes = retrieveVotes(id);
  const initialVotes =
    storedVotes ??
    answers.reduce((acc, _answer, index) => {
      acc[index] = 0;
      return acc;
    }, {});

  const [votes, setVotes] = useState(initialVotes);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const totalVoteCount = Object.values(votes).reduce(
    (acc, vote) => acc + vote,
    0
  );

  const countVote = (answerIndex) => () => {
    const answerVotes = votes[answerIndex];
    const newVotes = { ...votes, [answerIndex]: answerVotes + 1 };
    setVotes(newVotes);
    setSelectedAnswer(answerIndex);
    storeVotes(id, newVotes);
    setShowResults(true);
  };

  return (
    <div className="poll-container">
      <p className="poll__subheading">Live poll | {totalVoteCount} votes</p>

      <h1 className="poll__question">{question}</h1>

      {showResults ? (
        <AnsweredPoll
          answers={answers}
          votes={votes}
          totalVoteCount={totalVoteCount}
          selectedIndex={selectedAnswer}
        />
      ) : (
        <OpenPoll answers={answers} countVote={countVote} />
      )}
    </div>
  );
};

const OpenPoll = ({ answers, countVote }) => {
  return (
    <>
      {answers.map((answer, index) => {
        return (
          <div key={answer} className="poll__answer">
            <input
              id={answer}
              type="checkbox"
              value={answer}
              onClick={countVote(index)}
              className="poll__answer-checkbox"
            />
            <label htmlFor={answer} className="poll__answer-label">
              {answer}
            </label>
          </div>
        );
      })}
    </>
  );
};

const AnsweredPoll = ({ answers, votes, totalVoteCount, selectedIndex }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <ul className="poll__answer-list">
      {answers.map((answer, index) => {
        const percentageVote = calculatePercentage(
          votes[index],
          totalVoteCount
        );
        return (
          <li key={answer} className="poll__answer">
            {answer} ({percentageVote}) {selectedIndex === index && "✔"}
            <span
              className="poll__answer-percentage"
              style={animate ? { right: `calc(100% - ${percentageVote})` } : {}}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Poll;
