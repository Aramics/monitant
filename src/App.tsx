import AddressFormModal from "./components/AddressAddForm";
import Header from "./components/Header";
import useWalletAddresses from "./hooks/useWalletAddresses";
import "./App.css";
import ThemeSwitch from "./components/ThemeSwitch";

const App = (): JSX.Element => {
	const { addressList, saveAddress, error } = useWalletAddresses();
	console.log(addressList);
	return (
		<main>
			<Header>
				<AddressFormModal onSave={saveAddress} error={error} />
			</Header>
			<div>Balance monitor table</div>
			<footer>Footer</footer>
			<ThemeSwitch />
		</main>
	);
};

export default App;
