import { useState } from "react";
import { getBalancesForEthereumAddresses } from "ethereum-erc20-token-balances-multicall";
import { Balances, AddressTokenMap, Web3Provider } from "../types";
import { useUpdateEffect } from "usehooks-ts";

const useTokenBalances = (
	tokenAddressList: string[],
	addressList: string[],
	reload: number | boolean,
	provider?: Web3Provider
): Balances | undefined => {
	const [balances, setBalances] = useState<Balances>();

	useUpdateEffect(() => {
		let mounted = true;

		const fetchDemo = async (): Promise<void> => {
			if (
				typeof provider === "undefined" ||
				provider == null ||
				addressList.length === 0 ||
				tokenAddressList.length === 0
			)
				return;

			const requestOption = {
				// erc20 tokens to query!
				contractAddresses: tokenAddressList.slice().filter((a) => !a.includes(" ")),
				// wallet addresses to get the balance for
				ethereumAddresses: addressList.slice(),
				// the web3 provider
				providerOptions: {
					ethersProvider: provider
				}
			};

			const resp = await getBalancesForEthereumAddresses(requestOption);

			// map to object structure for reliable assess
			let balancesMap: Balances = {};

			resp.forEach((balance) => {
				const tokens: AddressTokenMap = {};
				balance.tokens.forEach((token): void => {
					tokens[token.contractAddress] = token;
				});
				balancesMap = {
					...balancesMap,
					...{ [balance.ethereumAddress]: tokens }
				};
			});

			console.log(balancesMap, mounted);

			if (mounted) setBalances(balancesMap);
		};

		fetchDemo().catch(console.log);

		return () => {
			mounted = false;
		};
	}, [addressList, reload, tokenAddressList]);
	console.log(balances);
	return balances;
};

export default useTokenBalances;
