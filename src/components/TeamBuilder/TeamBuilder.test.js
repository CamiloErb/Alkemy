import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { TeamBuilder } from "./TeamBuilder";
import { Provider } from "react-redux";
import store from "../../redux/store";

test("Pressing Add to my team button adds heroe to Team component", async () => {
  let component;
  await act(async () => {
    component = render(
      <Provider store={store}>
        <TeamBuilder></TeamBuilder>
      </Provider>
    );
  });

  const input = component.getByPlaceholderText("Search a hero");
  await act(async () => {
    fireEvent.change(input, { target: { value: "Batman" } });
  });
  const submit = component.getByText("Search");
  await act(async () => {
    fireEvent.click(submit);
  });

  const addToTeamButton = await component.findByTestId("add-button-0");

  await act(async () => {
    fireEvent.click(addToTeamButton);
  });
  fireEvent.keyDown(document.body, {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    charCode: 27,
  });

  await component.findByText("Batman");
  await component.findByText("Remove");
});

//   test("Pressing Add to my team button adds various heroes to Team component", async () => {
//     let component;
//     await act(async () => {
//       component = render(
//         <Provider store={store}>
//           <TeamBuilder></TeamBuilder>
//         </Provider>
//       );
//     });
//     const input = component.getByPlaceholderText("Search a hero");
//     await act(async () => {
//       fireEvent.change(input, { target: { value: "Batman" } });
//     });
//     const submit = component.getByText("Search");
//     await act(async () => {
//       fireEvent.click(submit);
//     });

//     const addToTeamButton1 = await component.findByTestId("add-button-0");
//     await act(async () => {
//       fireEvent.click(addToTeamButton1);
//     });
//     const addToTeamButton2 = await component.findByTestId("add-button-1");
//     await act(async () => {
//       fireEvent.click(addToTeamButton2);
//     });

//     fireEvent.keyDown(document.body, {
//       key: "Escape",
//       code: "Escape",
//       keyCode: 27,
//       charCode: 27,
//     });

//     const names = await component.findAllByRole("heading", {
//       name: "Batman",
//     });
//     const removeButton = await component.findAllByText("Remove");
//     expect(names.length).toBe(2);
//     expect(removeButton.length).toBe(2);
//   });

// test("Pressing remove button removes the heroe", async () => {
//     let component;
//     await act(async () => {
//       component = render(
//         <Provider store={store}>
//           <TeamBuilder></TeamBuilder>
//         </Provider>
//       );
//     });
  
//     const input = component.getByPlaceholderText("Search a hero");
//     await act(async () => {
//       fireEvent.change(input, { target: { value: "Batman" } });
//     });
//     const submit = component.getByText("Search");
//     await act(async () => {
//       fireEvent.click(submit);
//     });
  
//     const addToTeamButton = await component.findByTestId("add-button-0");
  
//     await act(async () => {
//       fireEvent.click(addToTeamButton);
//     });
//     fireEvent.keyDown(document.body, {
//       key: "Escape",
//       code: "Escape",
//       keyCode: 27,
//       charCode: 27,
//     });
  
//     const remove = await component.findByText("Remove");

//     await act(async ()=> {
//         fireEvent.click(remove);
//     })

//     await component.findByText("no heroes added")
//   });

