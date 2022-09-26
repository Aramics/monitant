import { useState } from "react";
import Modal from "../Modal";
import { useLockedBody } from "usehooks-ts";

type AddressFormModalProps = {
	title?: string;
	onSave: (address: string) => Promise<boolean>;
	onClose: () => void;
	isOpen: boolean;
	error: string;
};

const AddressFormModal = ({
	isOpen,
	onClose,
	onSave,
	error,
	title = "Add an address"
}: AddressFormModalProps): JSX.Element => {
	const [inputAddress, setInputAddress] = useState("");

	useLockedBody(isOpen);

	const handleSave = (): void => {
		onSave(inputAddress)
			.then((saved) => {
				if (saved) {
					setInputAddress("");
					onClose();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h3>{title}</h3>

			<div className="form-group">
				<input
					type="text"
					value={inputAddress}
					name="walletAddress"
					onChange={(e) => setInputAddress(e.target.value)}
					className="form-control"
					aria-label="Input wallet address"
					placeholder="0xab........."
				/>
			</div>

			{error !== "" && <div className="error">{error}</div>}

			<div className="form-group">
				<button onClick={handleSave} type="button" className="primary" title="Save address">
					Save
				</button>
			</div>
		</Modal>
	);
};

export default AddressFormModal;
