import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./NavBar";

test("render content", () => {
  const component = render(
    <Router>
      <NavBar ></NavBar>
    </Router>
  );
  component.getByAltText("logo");
  component.getByRole("img")
});

test("render log out when there is a token", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE";
    const component = render(
      <Router>
        <NavBar token={token}></NavBar>
      </Router>
    );
    component.getByText("Log out");
  });
  
test("not render log out when there is not a token", () => {
    const component = render(
      <Router>
        <NavBar ></NavBar>
      </Router>
    );
    const button = component.queryByText("Log out");
    expect(button).not.toBeInTheDocument()
  });
