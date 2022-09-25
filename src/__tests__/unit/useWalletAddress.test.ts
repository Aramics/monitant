import { act, renderHook } from "@testing-library/react";
import useWalletAddresses from "src/hooks/useWalletAddresses";

let testAddress = "0x2d2aFd26a86Ad2d3E5032Fce7A0Ff0F88468Fb0C";

describe("useWalletAddresses", () => {
	it("should not save wrong address", () => {
		const { result } = renderHook(() => useWalletAddresses());
		act(() => {
			result.current.saveAddress(testAddress.substring(0, testAddress.length / 2));
		});
		expect(result.current.error).not("");
	});

	it("should save unique right address", () => {
		const { result } = renderHook(() => useWalletAddresses());
		act(() => {
			result.current.saveAddress(testAddress);
		});

		expect(result.current.addressList.length).toBe(1);
		expect(result.current.error).toBe("");

		act(() => {
			result.current.saveAddress(testAddress);
		});

		expect(result.current.error).not("");
	});

	it("should remove right address", () => {
		const { result } = renderHook(() => useWalletAddresses());
		act(() => {
			result.current.saveAddress(testAddress);
		});

		expect(result.current.addressList.length).toBe(1);

		act(() => {
			result.current.removeAddress(testAddress);
		});
		expect(result.current.addressList.length).toBe(0);
	});
});
