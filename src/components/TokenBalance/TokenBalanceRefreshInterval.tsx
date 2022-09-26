import RefreshIcon from "../../assets/refresh.svg";
const intervals = [
	{ value: 20, label: "20 sec." },
	{ value: 40, label: "40 sec." },
	{ value: 60, label: "1 min." },
	{ value: 120, label: "2 min." }
];

type IntervalProps = {
	refreshInterval: number | null;
	onChange: (v: number) => void;
};
const TokenBalanceRefreshInterval = ({ refreshInterval, onChange }: IntervalProps): JSX.Element => {
	return (
		<div className="refresh flex" aria-label="Refresh interval" title="Refresh interval">
			<select value={Number(refreshInterval)} onChange={(e) => onChange(Number(e.target.value))}>
				{intervals.map((interval) => (
					<option key={interval.value} value={interval.value}>
						{interval.label}
					</option>
				))}
			</select>
			<img src={RefreshIcon} alt="refresh" />
		</div>
	);
};

export default TokenBalanceRefreshInterval;
