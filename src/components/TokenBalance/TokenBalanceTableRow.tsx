import { AddressTokenMap } from "../../types";

type TokenBalanceTableRowProps = {
	address: string;
	tokenAddressList: string[];
	rowBalances: AddressTokenMap | undefined;
	onDelete: (address: string) => void;
};

const TokenBalanceTableRow = ({
	address,
	tokenAddressList,
	rowBalances,
	onDelete
}: TokenBalanceTableRowProps): JSX.Element => {
	return (
		<tr key={address}>
			<td className="pin-left">{address}</td>
			{tokenAddressList.map((tokenAddress) => (
				<td key={tokenAddress}>{rowBalances?.[tokenAddress]?.balance ?? " - "}</td>
			))}
			<td className="pin-right">
				<button className="btn-sm danger" onClick={() => onDelete(address)}>
					X
				</button>
			</td>
		</tr>
	);
};

export default TokenBalanceTableRow;
