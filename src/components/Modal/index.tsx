import "./style.css";

type ModalProps = {
	isOpen: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	style?: React.CSSProperties;
};

const Modal = ({ onClose, isOpen, children, style = {} }: ModalProps): JSX.Element | null => {
	const showHideClassName = `modal ${isOpen ? "open" : ""}`;

	return (
		<div className={showHideClassName} style={style} aria-label="Modal popup">
			<div className="modal-container">
				{children}
				{onClose != null && (
					<button className="modal-close" onClick={onClose} title="close modal">
						X
					</button>
				)}
			</div>
		</div>
	);
};

export default Modal;
