const storeVotes = (pollId, votes) => {
  if (!pollId) return;

  localStorage.setItem(pollId, JSON.stringify(votes));
};

export default storeVotes;
