import { ethers } from "ethers";
import { useState } from "react";
import { Web3Provider } from "src/types";
import { useLocalStorage } from "usehooks-ts";

const useWalletAddresses = (
	provider?: Web3Provider
): {
	addressList: string[];
	saveAddress: (address: string) => Promise<boolean>;
	removeAddress: (address: string) => boolean;
	error: string;
} => {
	const [addressList, setAddressList] = useLocalStorage<string[]>("wallet_address_list", []);
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
