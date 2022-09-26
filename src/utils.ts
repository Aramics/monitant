import { ethers } from "ethers";
import { NetowrkInfo, Web3Provider } from "./types";

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export const shortenAddress = (address: string, chars = 4): string => {
	try {
		const parsed = ethers.utils.getAddress(address);
		return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
	} catch (error) {
		throw Error(`Invalid 'address' parameter '${address}'.`);
	}
};

export const numberWithCommas = (x: string | number): string | number => {
	if (isNaN(Number(x))) return x;

	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Format a string to certain decimals without approximation
 *
 * @param num the number to format
 * @param fixed the number of decimal places
 * @returns formated string in fixed decimal places or num
 *
 */
export const toSignificant = (num: string | number, fixed = 4): string | number => {
	const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed ?? -1).toString() + "})?");
	return num.toString().match(re)?.[0] ?? num;
};

/** Web3 Helpers **/
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getInjected = (): any => {
	return (window as any).ethereum;
};

export const getProvider = (pollingInterval = 15000): Web3Provider => {
	const ethereum = getInjected();

	if (typeof ethereum === "undefined") return;

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
