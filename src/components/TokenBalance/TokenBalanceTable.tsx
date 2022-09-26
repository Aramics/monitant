type TokenBalanceTableProp = {
	tokenAddressList: string[];
	children: React.ReactNode;
};

const TokenBalanceTable = ({ children }: TokenBalanceTableProp): JSX.Element => {
	return (
		<div className="responsive-table">
			<table className="fixed-header">{children}</table>
		</div>
	);
};

export default TokenBalanceTable;
