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

const App = (): JSX.Element => {
	const chainId = useChain();
	const { addressList, saveAddress, removeAddress, error } = useWalletAddresses();
	const [addFormOpen, setAddFormOpen] = useState(false);
	const [searchText, setSearchText] = useState<string>("");
	const [refreshInterval, setRefreshInterval] = useState(20);

	// momoize token address and name
	const [tokenAddressList, tokenNameList] = useMemo(() => {
		const tokenList = TOKENS_NETWORK_MAP?.[Number(chainId)];
		if (typeof tokenList !== "undefined") return [Object.keys(tokenList), Object.values<string>(tokenList)];
		return [[], []];
	}, [chainId]);

	// filter address list
	const filteredAddressList = useMemo(() => {
		return addressList.filter((address) => address.toLowerCase().includes(searchText.toLowerCase()));
	}, [searchText, addressList]);

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

				<TokenBalanceMonitor
					addressList={filteredAddressList}
					tokenAddressList={tokenAddressList}
					tokenNameList={tokenNameList}
					refreshInterval={refreshInterval * 1000}
					onAddressDelete={removeAddress}
				/>
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
