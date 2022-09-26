import { getInjected } from "./constants/network";
import { NetowrkInfo } from "./types";

/**
 * Add default nextwork from config
 */
export async function addChainNetwork(network: NetowrkInfo): Promise<boolean> {
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
}
