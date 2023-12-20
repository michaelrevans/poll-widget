import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import parsePollConfig from "./utils/parsePollConfig";
import Poll from "./components/Poll";

const pollElements = document.getElementsByClassName("poll");

Array.from(pollElements).forEach((pollElement) => {
  const root = ReactDOM.createRoot(pollElement);
  const { question, answers, id } = parsePollConfig(pollElement.dataset.pollConfig);

  root.render(
    <React.StrictMode>
      <Poll question={question} answers={answers} id={id} />
    </React.StrictMode>
  );
});
