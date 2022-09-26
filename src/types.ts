import ethers from "ethers";

export type NetowrkInfo = {
	chainId: string | number;
	chainName: string;
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls: string[];
	blockExplorerUrls?: string[];
	iconUrls?: string[];
};

export type Token = {
	contractAddress: string;
	symbol: string;
	decimals: number;
	name: string;
	balance: string;
};

export type AddressTokenMap = {
	[tokenAddress: string]: Token;
};

export type Balances = { [address: string]: AddressTokenMap };

export type TokenList = { [address: string]: string };

export type Web3Provider = ethers.providers.Web3Provider | undefined;
