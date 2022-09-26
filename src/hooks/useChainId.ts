import { useEffect, useState } from "react";
import { ChainId, getInjected } from "src/constants/network";

// use custom chain id for our light use. To be switch to library as needed in future
const useChainId = (): number | undefined => {
	const [chainId, setChainId] = useState<number>();

	useEffect(() => {
		let mounted = true;

		const ethereum = getInjected();
		setChainId(Number(ethereum?.chainId ?? ChainId.ETHEREUM));

		const handleChainChanged = (chainId: string | number): void => {
			if (mounted) setChainId(Number(chainId));
		};

		ethereum?.on("chainChanged", handleChainChanged);

		return (): void => {
			mounted = false;
			ethereum?.removeListener("chainChanged", handleChainChanged);
		};
	}, []);

	return chainId;
};

export default useChainId;
