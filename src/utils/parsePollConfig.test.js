import parsePollConfig from "./parsePollConfig";

test("parses question from valid poll config", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": ["bob","brenda","bertie"], "id": "foo"}'
  );

  expect(parsedPollConfig.question).toEqual("what is your name?");
});

test("parses answers array from valid poll config", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": ["bob","brenda","bertie"], "id": "foo"}'
  );

  expect(parsedPollConfig.answers).toEqual(["bob", "brenda", "bertie"]);
});

test("returns the answers in the same order that they are given in the config", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": ["bob","brenda","bertie"], "id": "foo"}'
  );

  expect(parsedPollConfig.answers[0]).toEqual("bob");
  expect(parsedPollConfig.answers[1]).toEqual("brenda");
  expect(parsedPollConfig.answers[2]).toEqual("bertie");
});

test("ignores redundant keys in the poll config", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": ["bob","brenda","bertie"], "id": "foo", "foo": "bar"}'
  );

  expect(parsedPollConfig.foo).toBeUndefined();
});

test("returns null if the poll config is invalid because no question is given", () => {
  const parsedPollConfig = parsePollConfig(
    '{"answers": ["bob","brenda","bertie"], "id": "foo"}'
  );

  expect(parsedPollConfig).toBeNull();
});

test("returns null if the poll config is invalid because the question is blank", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": " ", "answers": ["bob","brenda","bertie"], "id": "foo"}'
  );

  expect(parsedPollConfig).toBeNull();
});

test("returns null if the poll config is invalid because the question is the wrong data type", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": ["hello"], "answers": ["bob","brenda","bertie"], "id": "foo"}'
  );

  expect(parsedPollConfig).toBeNull();
});

test("returns null if the poll config is invalid because no answers are given", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?"}'
  );
  expect(parsedPollConfig).toBeNull();
});

test("returns null if the poll config is invalid because answers is an empty array", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": []}'
  );
  expect(parsedPollConfig).toBeNull();
});

test("returns null if the poll config is invalid because answers is the wrong data type", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": "bob, bertie, brenda", "id": "foo"}'
  );
  expect(parsedPollConfig).toBeNull();
});

test("returns the identifier when the poll config is valid", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": ["bob","brenda","bertie"], "id": "foo"}'
  );

  expect(parsedPollConfig.id).toEqual("foo");
});

test("returns null if the poll config is invalid because the id is missing", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": ["bob","brenda","bertie"]}'
  );

  expect(parsedPollConfig).toBeNull();
});

test("returns null if the poll config is invalid because the id is blank", () => {
  const parsedPollConfig = parsePollConfig(
    '{"question": "what is your name?", "answers": ["bob","brenda","bertie"], "id": " "}'
  );

  expect(parsedPollConfig).toBeNull();
});
