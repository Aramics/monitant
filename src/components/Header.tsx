type HeaderProps = {
	title?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
};

const Header = ({ children, title = "Monitant" }: HeaderProps): JSX.Element => {
	return (
		<header className="flex">
			<h2 className="intro">{title}</h2>
			{children}
		</header>
	);
};

export default Header;
