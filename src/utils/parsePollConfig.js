const parsePollConfig = (pollConfig) => {
  const parsedConfig = JSON.parse(pollConfig);

  const isQuestionInvalid =
    !parsedConfig.question ||
    typeof parsedConfig.question !== "string" ||
    parsedConfig.question.trim().length === 0;

  const areAnswersInvalid =
    !parsedConfig.answers ||
    typeof parsedConfig.answers !== "object" ||
    parsedConfig.answers.length === 0;

  const isIdInvalid = !parsedConfig.id || parsedConfig.id.trim().length === 0;

  if (isQuestionInvalid || areAnswersInvalid || isIdInvalid) return null;

  return {
    question: parsedConfig.question,
    answers: parsedConfig.answers,
    id: parsedConfig.id,
  };
};

export default parsePollConfig;
