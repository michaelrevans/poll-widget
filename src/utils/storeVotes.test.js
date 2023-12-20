import storeVotes from "./storeVotes";

Storage.prototype.setItem = jest.fn();

test("storeVotes stores the votes in local storage", () => {
  storeVotes("pollId-abcde", { 0: 12, 1: 53, 2: 23 });
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "pollId-abcde",
    '{"0":12,"1":53,"2":23}'
  );
});

test("storeVotes does not store anything if the pollId is not given", () => {
  storeVotes(undefined, { 0: 12, 1: 53, 2: 23 });
  expect(localStorage.setItem).not.toHaveBeenCalled();
});
