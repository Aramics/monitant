import { numberWithCommas, toSignificant } from "src/utils";
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
			{tokenAddressList.map((tokenAddress) => {
				const balance = rowBalances?.[tokenAddress]?.balance;

				return (
					<td key={tokenAddress}>
						{typeof balance !== "undefined" ? numberWithCommas(toSignificant(balance)) : " - "}
					</td>
				);
			})}
			<td className="pin-right">
				<button className="btn-sm danger" onClick={() => onDelete(address)}>
					X
				</button>
			</td>
		</tr>
	);
};

export default TokenBalanceTableRow;
