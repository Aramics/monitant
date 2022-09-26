import { ButtonHTMLAttributes } from "react";

const AddressAddButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button title="Open modal" className="primary" {...props}>
			+ Add address
		</button>
	);
};

export default AddressAddButton;
