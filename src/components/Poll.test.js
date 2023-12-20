import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Poll from "./Poll";
import retrieveVotes from "../utils/retrieveVotes";

jest.mock("../utils/retrieveVotes");

test("Poll shows the question", () => {
  render(<Poll question="How are you feeling today?" answers={[]} />);

  expect(screen.getByText("How are you feeling today?")).toBeVisible();
});

test("Poll shows the answers", () => {
  render(
    <Poll question="How are you feeling today?" answers={["good", "bad"]} />
  );

  expect(screen.getByText("good")).toBeVisible();
  expect(screen.getByText("bad")).toBeVisible();
});

test("Poll shows 0 votes if no votes have been stored", () => {
  retrieveVotes.mockReturnValue(null);

  render(
    <Poll question="How are you feeling today?" answers={["good", "bad"]} />
  );

  expect(screen.getByText("Live poll | 0 votes")).toBeVisible();
});

test("Poll shows the previously stored vote count", () => {
  retrieveVotes.mockReturnValue({ 0: 10, 1: 12 });

  render(
    <Poll question="How are you feeling today?" answers={["good", "bad"]} />
  );

  expect(screen.getByText("Live poll | 22 votes")).toBeVisible();
});

test("Poll shows the updated vote count once an answer has been selected", async () => {
  retrieveVotes.mockReturnValue({ 0: 10, 1: 12 });
  const user = userEvent.setup();

  render(
    <Poll question="How are you feeling today?" answers={["good", "bad"]} />
  );

  expect(screen.getByText("Live poll | 22 votes")).toBeVisible();

  const goodAnswer = screen.getByText("good");
  user.click(goodAnswer);

  expect(await screen.findByText("Live poll | 23 votes")).toBeVisible();
});

test("Poll shows the percentage of the votes that each answer received once an answer has been selected", async () => {
  retrieveVotes.mockReturnValue({ 0: 2, 1: 1 });
  const user = userEvent.setup();

  render(
    <Poll question="How are you feeling today?" answers={["good", "bad"]} />
  );

  expect(screen.getByText("Live poll | 3 votes")).toBeVisible();

  const goodAnswer = screen.getByText("good");
  user.click(goodAnswer);

  expect(await screen.findByText("Live poll | 4 votes")).toBeVisible();
  expect(await screen.findByText("good (75%)", { exact: false })).toBeVisible();
  expect(await screen.findByText("bad (25%)")).toBeVisible();
});

test("Poll highlights the chosen answer with a check mark", async () => {
  retrieveVotes.mockReturnValue({ 0: 2, 1: 1 });
  const user = userEvent.setup();

  render(
    <Poll question="How are you feeling today?" answers={["good", "bad"]} />
  );

  expect(screen.getByText("Live poll | 3 votes")).toBeVisible();

  const goodAnswer = screen.getByText("good");
  user.click(goodAnswer);

  expect(await screen.findByText("good (75%) ✔")).toBeVisible();
});
