type AddressListSearchProps = {
	search: string;
	onSearch: (keyword: string) => void;
	children?: React.ReactNode;
};

const AddressListSearch = ({ search, onSearch }: AddressListSearchProps): JSX.Element => {
	return (
		<div className="search">
			<input
				type={"text"}
				className="search"
				placeholder="search"
				aria-label="search list"
				onChange={(e) => {
					onSearch(e.target.value);
				}}
				value={search}
			/>
		</div>
	);
};

export default AddressListSearch;
