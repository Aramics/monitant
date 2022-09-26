import { TokenList } from "src/types";
import { ChainId } from "./network";

export type IERC20 = {
	symbol: string;
	address: string;
};

export const TOKENS_NETWORK_MAP: {
	[key: number]: TokenList;
} = {
	[ChainId.ETHEREUM]: {
		"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "USDC",
		"0xdAC17F958D2ee523a2206206994597C13D831ec7": "USDT",
		"0x6B175474E89094C44Da98b954EedeAC495271d0F": "DAI"
	},
	[ChainId.EVMOS_TESTNET]: {
		"0x9327f82c1c9C7e73384d91877084e5c11dc704e9": "DLP"
	}
};
