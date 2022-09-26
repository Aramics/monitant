type TokenBalanceTablePaginationProp = {
	dataSize: number;
	pageSize: number;
	page: number;
	onPaginationChange: (page: number) => void;
};

const TokenBalanceTablePagination = ({
	dataSize,
	pageSize,
	page,
	onPaginationChange
}: TokenBalanceTablePaginationProp): JSX.Element => {
	const totalPages = dataSize > 0 && dataSize > pageSize ? Math.ceil(dataSize / pageSize) : 1;

	const data = Array(totalPages).fill(0);

	return (
		<div className="flex">
			<div>Total Pages: {totalPages}</div>

			<div className="flex gap-4">
				{data.map((_: number, index: number) => (
					<button
						key={index}
						type="button"
						className={`btn-sm ${page === index ? "active" : ""}`}
						onClick={() => onPaginationChange(index)}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default TokenBalanceTablePagination;
