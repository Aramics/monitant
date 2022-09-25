import { useState } from "react";
import Modal from "./Modal";
import { useLockedBody } from "usehooks-ts";

type AddressAddFormProps = {
	onSave: (address: string) => boolean;
	error: string;
};

const AddressFormModal = ({ onSave, error }: AddressAddFormProps): JSX.Element => {
	const [modalOpen, setModalOpen] = useState(false);
	const [inputAddress, setInputAddress] = useState("");

	useLockedBody(modalOpen);

	const handleSave = (): void => {
		if (onSave(inputAddress)) {
			setInputAddress("");
			setModalOpen(false);
		}
	};

	return (
		<>
			<div className="flex">
				<button
					data-testid="open-modal-button"
					title="Open modal"
					onClick={(e) => setModalOpen(true)}
					className="primary"
				>
					+ Add address
				</button>
			</div>
			<Modal isOpen={modalOpen} onClose={(e) => setModalOpen(false)}>
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
		</>
	);
};

export default AddressFormModal;
