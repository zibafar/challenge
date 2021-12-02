import { act, render, screen } from "@testing-library/react";
import App from "../App";
import { arrayEquals } from "../Utils/ArrayEquals";
import axios from "axios";

let Numbers, AddNumber, MultiplyNumber;

beforeAll(async () => {
  await axios
    .get("http://localhost:5000/add")
    .then((res) => (AddNumber = res.data));
  await axios
    .get("http://localhost:5000/multiply")
    .then((res) => (MultiplyNumber = res.data));
  await axios
    .get("http://localhost:5000/numbers")
    .then((res) => (Numbers = res.data));
});
// fetch data from api for test the results

afterAll(() => {
  Numbers = null;
  AddNumber = null;
  MultiplyNumber = null;
});
// clear leak memory

describe("action list tests", () => {
  it("Renders List", async () => {
    await act(async () => render(<App />));

    expect(await screen.findAllByTestId("result-card")).toHaveLength(
      Numbers.length
    );
  });
  // ============== TEST 1 ===============
  // -------------------------------------

  it("Renders Actions Test", async () => {
    await act(async () => render(<App />));
    const ListItems = await screen.findAllByTestId("result-card");

    let jsonActions = Numbers.map((number) =>
      number.action === "add" ? "+" : "*"
    );
    let renderedActions = ListItems.map(
      (item) => item.innerHTML.match(/(\+|\-|\*|\/)/g)[0]
    );
    expect(arrayEquals(jsonActions, renderedActions));
  });
  // ============== TEST 2 ===============
  // -------------------------------------

  it("Renders Actions Result Test", async () => {
    jest.useFakeTimers();
    await act(async () => render(<App />));

    await act(async () => {
      jest.advanceTimersByTime(300);
    });
    const ListItemsResultNumber = await screen.findAllByTestId(
      "result-card-number"
    );

    let jsonActionsResultNumber = Numbers.map((number) => {
      if (number.action === "add") {
        return number.value + AddNumber.value;
      } else if (number.action === "multiply") {
        return number.value * MultiplyNumber.value;
      }
    });

    let renderedResultNumbers = ListItemsResultNumber.map(
      (item) => item.textContent
    );

    expect(arrayEquals(jsonActionsResultNumber, renderedResultNumbers));
  });
  // ============== TEST 3 ===============
  // -------------------------------------


});
