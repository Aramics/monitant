import { useMemo, useState } from "react";
import useTokenBalances from "../../hooks/useTokensBalances";
import TokenBalanceTable from "./TokenBalanceTable";
import TokenBalanceTableHead from "./TokenBalanceTableHead";
import TokenBalanceTablePagination from "./TokenBalanceTablePagination";
import TokenBalanceTableRow from "./TokenBalanceTableRow";
import { useInterval, useCounter, useMediaQuery } from "usehooks-ts";
import { shortenAddress } from "../../utils";
import { Provider } from "src/types";

type TokenBalanceMonitorProps = {
	addressList: string[];
	tokenAddressList: string[];
	tokenNameList: string[];
	refreshInterval: number | null;
	provider: Provider;
	onAddressDelete: (address: string) => void;
};

const TokenBalanceMonitor = ({
	addressList,
	tokenAddressList,
	tokenNameList,
	refreshInterval,
	provider,
	onAddressDelete
}: TokenBalanceMonitorProps): JSX.Element => {
	// filterables
	const [page, setPage] = useState(0);
	const pageSize = 20; // @TODO: make this selectable from UI

	// filtering
	const filteredAddressList = useMemo(() => {
		return addressList.slice(page * pageSize, page * pageSize + pageSize);
	}, [addressList, page]);

	const empty = filteredAddressList.length < 1;

	const { count: reload, increment } = useCounter(0);
	useInterval(increment, refreshInterval);

	// get balances
	const balances = useTokenBalances(tokenAddressList, filteredAddressList, provider, reload);

	const notMobileDevice = useMediaQuery("(min-width: 768px)");

	return (
		<div className="flex-col">
			<TokenBalanceTable tokenAddressList={tokenAddressList}>
				<TokenBalanceTableHead tokenAddressList={tokenAddressList} tokenNameList={tokenNameList} />

				{!empty && (
					<tbody>
						{filteredAddressList.map((address) => {
							return (
								<TokenBalanceTableRow
									key={address}
									address={notMobileDevice ? address : shortenAddress(address)}
									rowBalances={balances?.[address]}
									tokenAddressList={tokenAddressList}
									onDelete={(address) => onAddressDelete(address)}
								/>
							);
						})}
					</tbody>
				)}
			</TokenBalanceTable>

			{empty && <div className="error">{"Address list or match is empty"}</div>}

			{/* pagination */}
			{!empty && (
				<TokenBalanceTablePagination
					page={page}
					dataSize={addressList.length}
					pageSize={pageSize}
					onPaginationChange={(pageNumber) => {
						setPage(pageNumber);
					}}
				/>
			)}
		</div>
	);
};

export default TokenBalanceMonitor;
