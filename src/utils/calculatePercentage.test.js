import calculatePercentage from "./calculatePercentage";

test("returns the whole percentage when it's a whole number anyway", () => {
  const percentage = calculatePercentage(3, 4);
  expect(percentage).toEqual("75%");
});

test("rounds the percentage to the nearest whole number when the result is a decimal", () => {
  const percentage = calculatePercentage(1, 3);
  expect(percentage).toEqual("33%");
});

test("correctly round the percentage to the nearest whole number when the result is a decimal", () => {
  const percentage = calculatePercentage(2, 3);
  expect(percentage).toEqual("67%");
});
