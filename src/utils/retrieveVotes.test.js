import retrieveVotes from "./retrieveVotes";

test("retrieveVotes retrieves the votes when a poll id is given", () => {
  Storage.prototype.getItem = jest
    .fn()
    .mockImplementation(() => '{"1": 10, "2": 34}');

  retrieveVotes("poll-id-123");

  expect(localStorage.getItem).toHaveBeenCalledWith("poll-id-123");
});

test("retrieveVotes retrieves and parses the votes when a poll id is given", () => {
  Storage.prototype.getItem = jest
    .fn()
    .mockImplementation(() => '{"1": 10, "2": 34}');

  const votes = retrieveVotes("poll-id-123");

  expect(votes).toEqual({ 1: 10, 2: 34 });
});

test("retrieveVotes returns null when no data has been saved for the poll", () => {
  Storage.prototype.getItem = jest.fn().mockImplementation(() => null);

  const votes = retrieveVotes("poll-id-123");

  expect(votes).toBeNull();
});
