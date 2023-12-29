import { render, screen } from "@testing-library/react";
// import App from "./App";
import Header from "./components/Header";

test("is company heading present or not", () => {
  render(<Header />);
  let heading = screen.getByText("Techwave IT Solution Pvt Ltd");
  expect(heading).toBeInTheDocument();
});
