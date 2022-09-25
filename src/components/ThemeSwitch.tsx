import { useEffect } from "react";
import { useTernaryDarkMode } from "usehooks-ts";
import ThemeIcon from "../assets/theme.svg";

const ThemeSwitch = (): JSX.Element => {
	const { ternaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode();

	useEffect(() => {
		document.documentElement.dataset.theme = ternaryDarkMode;
	}, [ternaryDarkMode]);

	return (
		<div className="theme-switch-container">
			<div className="theme-switch">
				<button className="theme" onClick={toggleTernaryDarkMode}>
					<img src={ThemeIcon} className="App-logo" alt="logo" />
					<span>{ternaryDarkMode}</span>
				</button>
			</div>
		</div>
	);
};
export default ThemeSwitch;
