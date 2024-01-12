import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders Navbar component", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText("GitHub Repository")).toBeInTheDocument();
});

test("opens and closes the navigation menu", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});

