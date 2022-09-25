import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";

test("has flex header", () => {
	render(<App />);
	const element = screen.getByRole("banner");
	expect(getComputedStyle(element).display).toEqual("flex");
});

test("show modal form", () => {
	render(<App />);

	fireEvent.click(screen.getByTestId("open-modal-button"));

	expect(screen.getByText("Add an address")).toBeDefined();
});

test("show modal form", () => {
	render(<App />);

	fireEvent.click(screen.getByTestId("open-modal-button"));

	expect(screen.getByText("Add an address")).toBeDefined();
});
