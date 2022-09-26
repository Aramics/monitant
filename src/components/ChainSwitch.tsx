import { SUPPORTED_NETWORKS } from "src/constants/network";
import { addChainNetwork } from "src/utils";

type ChainSwitchProps = {
	chainId: number | undefined;
};

const ChainSwitch = ({ chainId }: ChainSwitchProps): JSX.Element => {
	const selectedChainInfo = chainId !== undefined ? SUPPORTED_NETWORKS[chainId] : undefined;

	const handleChainChange = (id: number): void => {
		const chainInfo = SUPPORTED_NETWORKS[id];

		if (chainInfo != null) {
			addChainNetwork(chainInfo).catch((error) => {
				console.warn(error);
			});
		}
	};

	return (
		<div>
			<select
				className="form-group"
				value={selectedChainInfo?.chainId}
				onChange={(e) => {
					handleChainChange(Number(e.target.value));
				}}
			>
				{Object.keys(SUPPORTED_NETWORKS).map((id) => {
					const cId = id as unknown as number;
					const chainInfo = SUPPORTED_NETWORKS[cId];
					return (
						<option value={cId} key={id}>
							{chainInfo?.chainName}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default ChainSwitch;
