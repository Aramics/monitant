import { useState } from "react";
import Modal from "../Modal";
import { useLockedBody } from "usehooks-ts";

type AddressFormModalProps = {
	onSave: (address: string) => boolean;
	onClose: () => void;
	isOpen: boolean;
	error: string;
};

const AddressFormModal = ({ isOpen, onClose, onSave, error }: AddressFormModalProps): JSX.Element => {
	const [inputAddress, setInputAddress] = useState("");

	useLockedBody(isOpen);

	const handleSave = (): void => {
		if (onSave(inputAddress)) {
			setInputAddress("");
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h3>Add an address</h3>

			<div className="form-group">
				<input
					type="text"
					value={inputAddress}
					name="modalInputName"
					onChange={(e) => setInputAddress(e.target.value)}
					className="form-control"
					aria-label="Input wallet address"
					placeholder="0xab........."
				/>
			</div>

			{error !== "" && <div className="error">{error}</div>}

			<div className="form-group">
				<button onClick={handleSave} type="button" className="primary">
					Save
				</button>
			</div>
		</Modal>
	);
};

export default AddressFormModal;
