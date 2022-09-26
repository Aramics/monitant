import { ethers } from "ethers";
import { NetowrkInfo } from "src/types";

export enum ChainId {
	ETHEREUM = 1,
	ROPSTEN = 3,
	RINKEBY = 4,
	MATIC = 137,
	MATIC_TESTNET = 80001,
	FANTOM = 250,
	FANTOM_TESTNET = 4002,
	BSC = 56,
	BSC_TESTNET = 97,
	EVMOS = 9001,
	EVMOS_TESTNET = 9000
}

export const SUPPORTED_NETWORKS: {
	[chainId in ChainId as number]?: NetowrkInfo;
} = {
	[ChainId.ETHEREUM]: {
		chainId: ChainId.ETHEREUM,
		chainName: "Ethereum",
		nativeCurrency: {
			name: "Ethereum",
			symbol: "ETH",
			decimals: 18
		},
		rpcUrls: ["https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"]
	},
	[ChainId.EVMOS_TESTNET]: {
		chainId: ChainId.EVMOS_TESTNET,
		chainName: "Evmos Testnet",
		nativeCurrency: {
			name: "Evmos",
			symbol: "EVMOS",
			decimals: 18
		},
		rpcUrls: ["https://eth.bd.evmos.dev:8545"],
		blockExplorerUrls: ["https://evm.evmos.dev/"],
		iconUrls: ["https://docs.evmos.org/evmos-black.svg"]
	},
	[ChainId.BSC_TESTNET]: {
		chainId: ChainId.BSC_TESTNET,
		chainName: "BSC Testnet",
		nativeCurrency: {
			name: "tBNB",
			symbol: "TBNB",
			decimals: 18
		},
		rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
		blockExplorerUrls: ["https://testnet.bscscan.com"],
		iconUrls: []
	}
};

export const getInjected = (): any => {
	return (window as any).ethereum;
};

export const getProvider = (pollingInterval = 15000): ethers.providers.Web3Provider | null => {
	if (typeof window === "undefined") {
		return null;
	}

	const provider = new ethers.providers.Web3Provider(getInjected());
	provider.pollingInterval = pollingInterval;
	return provider;
};
