import { ethers } from "ethers";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const useWalletAddresses = (): {
	addressList: string[];
	saveAddress: (address: string) => boolean;
	removeAddress: (address: string) => boolean;
	error: string;
} => {
	const [addressList, setAddressList] = useLocalStorage<string[]>("wallet_address_list", []);
	const [error, setError] = useState("");

	const saveAddress = (address: string): boolean => {
		setError("");

		const newAddress = address.trim();

		if (!isValidAddress(newAddress)) {
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

const isValidAddress = (address: string): boolean => {
	if (!ethers.utils.isAddress(address)) return false;

	return true;
};

export default useWalletAddresses;
