import "./App.css";
import AddressFormModal from "./components/AddressAddForm";
import Header from "./components/Header";
import useWalletAddresses from "./hooks/useWalletAddresses";
import ThemeSwitch from "./components/ThemeSwitch";
import ChainSwitch from "./components/ChainSwitch";
import useChain from "./hooks/useChainId";
import { useState } from "react";

const App = (): JSX.Element => {
	const { addressList, saveAddress, removeAddress, error } = useWalletAddresses();
	const [addFormOpen, setAddFormOpen] = useState(false);
	const chainId = useChain();

	return (
		<main>
			<Header>
				<div className="flex">
					<ChainSwitch chainId={chainId} />
					<div className="flex">
						<button title="Open modal" onClick={(e) => setAddFormOpen(true)} className="primary">
							+ Add address
						</button>
					</div>
					<ThemeSwitch />
				</div>
			</Header>

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
