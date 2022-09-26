import App from "../App";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { TestAddress } from "./setupTests";
import useWalletAddresses from "src/hooks/useWalletAddresses";
import { shortenAddress } from "src/utils";

test("has flex header", () => {
	render(<App />);
	const element = screen.getByRole("banner");
	expect(element).toBeDefined();
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

	const input = screen.getByLabelText("Input wallet address");
	const saveButton = screen.getByText("Save");

	expect(saveButton).toBeDefined();
	expect(input).toBeDefined();
});

test("show token balance monitor table with search box", async () => {
	const { result } = renderHook(() => useWalletAddresses());
	act(() => {
		result.current.saveAddress(TestAddress);
	});

	render(<App />);

	const firstTableBodyCell = screen.getAllByRole("cell")[0];

	expect([TestAddress, shortenAddress(TestAddress)].includes(String(firstTableBodyCell?.textContent))).toBeTruthy();

	const input = screen.getByLabelText("search list");
	expect(input).toBeDefined();
});
