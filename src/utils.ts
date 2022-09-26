import { ethers } from "ethers";
import { NetowrkInfo } from "./types";

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export const shortenAddress = (address: string, chars = 4): string => {
	try {
		const parsed = ethers.utils.getAddress(address);
		return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
	} catch (error) {
		throw Error(`Invalid 'address' parameter '${address}'.`);
	}
};

/** Web3 Helpers **/
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getInjected = (): any => {
	return (window as any).ethereum;
};

export const getProvider = (pollingInterval = 15000): ethers.providers.Web3Provider | null => {
	const ethereum = getInjected();

	if (typeof ethereum === "undefined") return null;

	const provider = new ethers.providers.Web3Provider(ethereum);
	provider.pollingInterval = pollingInterval;
	return provider;
};

// request chain switch or add if not on wallet
export const addChainNetwork = async (network: NetowrkInfo): Promise<boolean> => {
	let chainIdHex = network.chainId.toString(16);

	if (!chainIdHex.startsWith("0x")) {
		chainIdHex = "0x" + chainIdHex;
	}

	const ethereum = getInjected();

	try {
		await ethereum.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: chainIdHex }]
		});

		return true;
	} catch (error: any) {
		if (error?.code === 4902) {
			try {
				await ethereum.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: chainIdHex,
							chainName: network.chainName,
							nativeCurrency: {
								name: network.nativeCurrency.name,
								symbol: network.nativeCurrency.symbol,
								decimals: network.nativeCurrency.decimals
							},
							rpcUrls: network.rpcUrls,
							blockExplorerUrls: network.blockExplorerUrls,
							iconUrls: network.iconUrls
						}
					]
				});

				return true;
			} catch (addError: any) {
				console.warn("Error adding network: ", addError?.message);
			}
		}
	}
	return false;
};
