const retrieveVotes = (pollId) => {
  const votes = localStorage.getItem(pollId);

  if (!votes) return null;

  return JSON.parse(votes);
};

export default retrieveVotes;
