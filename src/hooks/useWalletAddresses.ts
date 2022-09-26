import { ethers } from "ethers";
import { useState } from "react";
import { Web3Provider } from "src/types";
import { useLocalStorage, useUpdateEffect } from "usehooks-ts";

const useWalletAddresses = (
	chainId: number,
	provider?: Web3Provider
): {
	addressList: string[];
	saveAddress: (address: string) => Promise<boolean>;
	removeAddress: (address: string) => boolean;
	error: string;
} => {
	const storageKey = "wallet_address_list_" + String(chainId);
	const [addressList, setAddressList] = useLocalStorage<string[]>(storageKey, []);
	const [error, setError] = useState("");

	const saveAddress = async (address: string): Promise<boolean> => {
		setError("");

		const newAddress = address.trim();

		const isValid = await isValidAddress(newAddress, provider);

		if (!isValid) {
			setError("Invalid address");
			return false;
		}

		if (addressList.includes(address)) {
			setError("Address exist already !");
			return false;
		}

		setAddressList([...addressList, address]);

		return true;
	};

	const removeAddress = (address: string): boolean => {
		if (addressList.includes(address)) {
			const addresses = addressList.slice();

			addresses.splice(addressList.indexOf(address), 1);

			setAddressList(addresses);

			return true;
		}
		return false;
	};

	useUpdateEffect(() => {
		if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("local-storage"));
	}, [chainId]);

	return { addressList, saveAddress, removeAddress, error };
};

const isValidAddress = async (address: string, provider?: Web3Provider): Promise<boolean> => {
	if (!ethers.utils.isAddress(address)) return false;

	if (typeof provider !== "undefined") {
		const code = await provider?.getCode(address);
		if (code !== "0x" && code !== "0x0") return false;
	}
	return true;
};

export default useWalletAddresses;
