import "./App.css";
import AddressFormModal from "./components/AddressList/AddressAddForm";
import Header from "./components/Header";
import useWalletAddresses from "./hooks/useWalletAddresses";
import ThemeSwitch from "./components/ThemeSwitch";
import ChainSwitch from "./components/ChainSwitch";
import useChain from "./hooks/useChainId";
import { useState } from "react";
import AddressListSearch from "./components/AddressList/AddressListSearch";
import AddressAddButton from "./components/AddressList/AddressAddButton";

const App = (): JSX.Element => {
	const { saveAddress, error } = useWalletAddresses();
	const [addFormOpen, setAddFormOpen] = useState(false);
	const chainId = useChain();
	const [searchText, setSearchText] = useState<string>("");

	return (
		<main>
			<Header>
				<div className="flex">
					<ChainSwitch chainId={chainId} />
					<ThemeSwitch />
				</div>
			</Header>

			<div className="monitor">
				<div className="toolbar flex">
					<AddressListSearch search={searchText} onSearch={setSearchText} />
					<AddressAddButton onClick={() => setAddFormOpen(true)} />
				</div>
				<div className="balances"></div>
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
