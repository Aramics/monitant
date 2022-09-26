import { ButtonHTMLAttributes } from "react";

const AddressAddButton = (props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
	return (
		<button title="Open modal" className="primary" data-testid="open-modal-button" {...props}>
			+ Add address
		</button>
	);
};

export default AddressAddButton;
