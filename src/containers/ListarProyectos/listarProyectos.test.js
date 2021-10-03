import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import ListarProyectos from "./index";
import React from "react";

describe("project list component tests", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ListarProyectos />, div);
  });
  it("renders correct data", () => {
    const { container } = render(<ListarProyectos />);
    // Matches the last snapshot taken
    //expect(container).toMatchSnapshot(); //TODO: revisar inconsistencias
  });
});
