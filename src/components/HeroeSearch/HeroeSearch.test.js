import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { HeroeSearch } from "./HeroeSearch";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { act } from "react-dom/test-utils";


test("should render input element", () => {
  const component = render(
    <Provider store={store}>
      <HeroeSearch></HeroeSearch>
    </Provider>
  );
  component.getByPlaceholderText("Search a hero");
});

test("should be able to type into input", async () => {
  let component;
  await act(async () => {
    component = render(
      <Provider store={store}>
        <HeroeSearch></HeroeSearch>
      </Provider>
    );
  });
  const input = await component.findByRole("textbox");
  await act(async () => {
    fireEvent.change(input, { target: { value: "Batman" } });
  });
  expect(input.value).toBe("Batman");
});

test("should have empty input after submit", async () => {

  let component;
  await act(async () => {
    component = render(
      <Provider store={store}>
        <HeroeSearch ></HeroeSearch>
      </Provider>
    );
  });
  let input
  await act(async () => {
    input = component.getByPlaceholderText("Search a hero");
    fireEvent.change(input, { target: { value: "Batman" } });
    
  });
  expect(input.value).toBe("Batman")

  await act(async () => {
    const submit = component.getByText("Search");
    fireEvent.click(submit);
  })
  expect(input.value).toBe("")
  
});


test("Searching Batman returns three Batmans with three images and three buttons", async () => {

  let component;
  await act(async () => {
    component = render(
      <Provider store={store}>
        <HeroeSearch ></HeroeSearch>
      </Provider>
    );
  });
  const input = component.getByPlaceholderText("Search a hero");
  await act(async () => {
    fireEvent.change(input, { target: { value: "batman" } });
  })
  const submit = component.getByText("Search");
  await act(async () => {
    fireEvent.click(submit);
  })

  const allNames = await component.findAllByText(/Batman/);
  const allImages = await component.findAllByAltText("heroeimage")
  const allButtons = await component.findAllByText("Add to my team")
  expect(allNames).toHaveLength(3)
  expect(allImages).toHaveLength(3)
  expect(allButtons).toHaveLength(3)

});

test("Searching a heroe that doesn't exist returns Not Found", async () => {

  let component;
  await act(async () => {
    component = render(
      <Provider store={store}>
        <HeroeSearch ></HeroeSearch>
      </Provider>
    );
  });
  const input = component.getByPlaceholderText("Search a hero");
  await act(async () => {
    fireEvent.change(input, { target: { value: "asdfasdf" } });
  })
  const submit = component.getByText("Search");
  await act(async () => {
    fireEvent.click(submit);
  })
  await component.findByText("Not found")

});

test("Pressing Add to my team button changes to Already in my team button", async () => {

  let component;
  await act(async () => {
    component = render(
      <Provider store={store}>
        <HeroeSearch ></HeroeSearch>
      </Provider>
    );
  });
  const input = component.getByPlaceholderText("Search a hero");
  await act(async () => {
    fireEvent.change(input, { target: { value: "Batman" } });
  })
  const submit = component.getByText("Search");
  await act(async () => {
    fireEvent.click(submit);
  })

  const addToTeamButton = await component.findByTestId("add-button-0")

  await act(async () => {
    fireEvent.click(addToTeamButton);
  })
  await component.findByText(/already in my team/)

});
