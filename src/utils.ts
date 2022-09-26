import { ethers } from "ethers";
import { NetowrkInfo } from "./types";

/** Web3 Helpers **/
export const getInjected = (): any => {
	return (window as any).ethereum;
};

export const getProvider = (pollingInterval = 15000): ethers.providers.Web3Provider | null => {
	let ethereum = getInjected();

	if (typeof ethereum === "undefined") return null;

	const provider = new ethers.providers.Web3Provider(ethereum);
	provider.pollingInterval = pollingInterval;
	return provider;
};

//request chain switch or add if not on wallet
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
