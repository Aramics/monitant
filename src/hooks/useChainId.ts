import { useEffect, useState } from "react";
import { getInjected } from "src/constants/network";

// use custom chain id for our light use. To be switch to library as needed in future
const useChainId = (): number | undefined => {
	const [chainId, setChainId] = useState<number>();

	useEffect(() => {
		let mounted = true;

		const ethereum = getInjected();
		if (ethereum !== undefined) {
			setChainId(Number(ethereum.chainId));
		}

		const handleChainChanged = (chainId: string | number): void => {
			if (mounted) setChainId(Number(chainId));
		};

		if (ethereum?.on !== null) {
			ethereum.on("chainChanged", handleChainChanged);
		}

		return (): void => {
			if (ethereum.removeListener !== null) {
				ethereum.removeListener("chainChanged", handleChainChanged);
			}
			mounted = false;
		};
	}, []);

	return chainId;
};

export default useChainId;
