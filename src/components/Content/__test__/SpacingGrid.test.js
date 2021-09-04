import React from "react";
import ReactDOM from "react-dom";
import SpacingGrid from "./../SpacingGrid";

import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";
import axiosMock from "axios";

afterEach(cleanup);

const initialValue = "$ 0";

//Initially without any axios calls.
it("Bitcoin value is initially set to $ 0", async () => {
  const { getByTestId } = render(<SpacingGrid />);
  expect(getByTestId("bitCoinValue")).toHaveTextContent(initialValue);
});

it("Etherium value is initially set to $ 0", async () => {
  const { getByTestId } = render(<SpacingGrid />);
  expect(getByTestId("etheriumValue")).toHaveTextContent(initialValue);
});

it("Dogecoin value is initially set to $ 0", async () => {
  const { getByTestId } = render(<SpacingGrid />);
  expect(getByTestId("dogeCoinValue")).toHaveTextContent(initialValue);
});

//Mock axios for getting the rates for the different coins

it("Fetch data from api and render correctly", async () => {
  //Override mock value
  mockAxiosGetAndReturn("50.400,80");
  mockAxiosGetAndReturn("3985,68");
  mockAxiosGetAndReturn("0,2984");
  const { getByTestId } = render(<SpacingGrid />);

  const button = getByTestId("fetch-button");
  fireEvent.click(button);

  const resolvedFabForBitcoin = await waitFor(() =>
    getByTestId("bitCoinValue")
  );
  const resolvedFabForEtherium = await waitFor(() =>
    getByTestId("etheriumValue")
  );
  const resolvedFabForDogeCoin = await waitFor(() =>
    getByTestId("dogeCoinValue")
  );

  expect(resolvedFabForBitcoin).toHaveTextContent("$ 50.400,80");
  expect(resolvedFabForEtherium).toHaveTextContent("$ 3985,68");
  expect(resolvedFabForDogeCoin).toHaveTextContent("$ 0,2984");
});

const mockAxiosGetAndReturn = value => {
  axiosMock.get.mockResolvedValueOnce({
    data: {
      data: {
        rates: {
          USD: value
        }
      }
    }
  });
};
