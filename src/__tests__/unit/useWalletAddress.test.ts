import { act, renderHook } from "@testing-library/react";
import useWalletAddresses from "src/hooks/useWalletAddresses";
import { TestAddress, DefaultChainId } from "../setupTests";

describe("useWalletAddresses", () => {
	it("should start with empty list", () => {
		const { result } = renderHook(() => useWalletAddresses(DefaultChainId));

		expect(result.current.addressList.length).toBe(0);
	});

	it("should not save wrong address", async () => {
		const { result } = renderHook(() => useWalletAddresses(DefaultChainId));

		await act(async () => {
			await result.current.saveAddress(TestAddress.substring(0, TestAddress.length / 2));
		});
		expect(result.current.error.length).toBeGreaterThan(0);
	});

	it("should save unique right address", async () => {
		const { result } = renderHook(() => useWalletAddresses(DefaultChainId));

		await act(async () => {
			await result.current.saveAddress(TestAddress);
		});

		expect(result.current.addressList.length).toBe(1);
		expect(result.current.error).toBe("");

		await act(async () => {
			await result.current.saveAddress(TestAddress);
		});

		expect(result.current.error.length).toBeGreaterThan(0);
	});

	it("should remove right address", async () => {
		const { result } = renderHook(() => useWalletAddresses(DefaultChainId));

		await act(async () => {
			await result.current.saveAddress(TestAddress);
		});

		expect(result.current.addressList.length).toBe(1);

		act(() => {
			result.current.removeAddress(TestAddress);
		});
		expect(result.current.addressList.length).toBe(0);
	});
});
