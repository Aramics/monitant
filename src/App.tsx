import "./App.css";
import AddressFormModal from "./components/AddressList/AddressAddForm";
import Header from "./components/Header";
import useWalletAddresses from "./hooks/useWalletAddresses";
import ThemeSwitch from "./components/ThemeSwitch";
import ChainSwitch from "./components/ChainSwitch";
import useChain from "./hooks/useChainId";
import { useMemo, useState } from "react";
import AddressListSearch from "./components/AddressList/AddressListSearch";
import AddressAddButton from "./components/AddressList/AddressAddButton";
import { TOKENS_NETWORK_MAP } from "./constants/addresses";
import TokenBalanceMonitor from "./components/TokenBalance/TokenBalanceMonitor";
import TokenBalanceRefreshInterval from "./components/TokenBalance/TokenBalanceRefreshInterval";
import { getProvider } from "./utils";
import { useDebounce } from "usehooks-ts";

const App = ({ skipProviderCheck = false }: { skipProviderCheck?: boolean }): JSX.Element => {
	const chainId = useChain();
	const provider = getProvider();

	const { addressList, saveAddress, removeAddress, error } = useWalletAddresses(provider);
	const [addFormOpen, setAddFormOpen] = useState(false);
	const [searchText, setSearchText] = useState<string>("");
	const [refreshInterval, setRefreshInterval] = useState(20);
	const searchTextDebounced = useDebounce<string>(searchText, 1000);

	// momoize token address and name
	const [tokenAddressList, tokenNameList] = useMemo(() => {
		const tokenList = TOKENS_NETWORK_MAP?.[Number(chainId)];
		if (typeof tokenList !== "undefined") return [Object.keys(tokenList), Object.values<string>(tokenList)];
		return [[], []];
	}, [chainId]);

	// filter address list
	const filteredAddressList = useMemo(() => {
		return addressList.filter((address) => address.toLowerCase().includes(searchTextDebounced.toLowerCase()));
	}, [searchTextDebounced, addressList]);

	return (
		<main>
			<Header>
				<div className="flex">
					<ChainSwitch chainId={chainId} />
					<ThemeSwitch />
				</div>
			</Header>

			<div className="monitor">
				<div className="toolbar flex" aria-label="control bar">
					<AddressListSearch search={searchText} onSearch={setSearchText} />
					<div className="flex">
						<TokenBalanceRefreshInterval refreshInterval={refreshInterval} onChange={setRefreshInterval} />
						<AddressAddButton onClick={() => setAddFormOpen(true)} />
					</div>
				</div>

				{provider != null || skipProviderCheck ? (
					<TokenBalanceMonitor
						addressList={filteredAddressList}
						tokenAddressList={tokenAddressList}
						tokenNameList={tokenNameList}
						refreshInterval={refreshInterval * 1000}
						provider={provider}
						onAddressDelete={removeAddress}
					/>
				) : (
					<div className="error"> Kindly install a web3 wallet i.e MetaMask to continue</div>
				)}
			</div>

			<AddressFormModal
				isOpen={addFormOpen}
				onClose={() => setAddFormOpen(false)}
				onSave={saveAddress}
				error={error}
			/>
		</main>
	);
};

export default App;
