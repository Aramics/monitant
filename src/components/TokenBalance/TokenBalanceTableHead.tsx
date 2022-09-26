const TokenBalanceTableHead = ({
	tokenAddressList,
	tokenNameList
}: {
	tokenAddressList: string[];
	tokenNameList: string[];
}): JSX.Element => {
	return (
		<thead>
			<tr>
				<th className="pin-left">Address</th>
				{tokenAddressList.map((address, index) => (
					<th key={address}>{tokenNameList[index]}</th>
				))}
				<th></th>
			</tr>
		</thead>
	);
};

export default TokenBalanceTableHead;
