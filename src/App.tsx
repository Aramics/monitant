import "./App.css";
import AddressFormModal from "./components/AddressAddForm";
import Header from "./components/Header";
import useWalletAddresses from "./hooks/useWalletAddresses";
import ThemeSwitch from "./components/ThemeSwitch";
import ChainSwitch from "./components/ChainSwitch";
import useChain from "./hooks/useChainId";

const App = (): JSX.Element => {
	const { addressList, saveAddress, error } = useWalletAddresses();
	console.log(addressList);
	const chainId = useChain();

	return (
		<main>
			<Header>
				<div className="flex">
					<ChainSwitch chainId={chainId} />
					<AddressFormModal onSave={saveAddress} error={error} />
				</div>
			</Header>
			<div>Balance monitor table</div>
			<footer>Footer</footer>
			<ThemeSwitch />
		</main>
	);
};

export default App;
