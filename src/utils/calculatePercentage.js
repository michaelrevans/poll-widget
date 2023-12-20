const calculatePercentage = (numerator, denominator) => {
  const percentage = Math.round((numerator * 100) / denominator);
  return `${percentage}%`;
};

export default calculatePercentage;
