import styles from "./HeaderNav.module.css";

const NavigationToggleIcon = ({ isOpen }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={`${styles.navigationToggleIcon} ${isOpen ? styles.navigationToggleIconOpen : ""}`}>
		{isOpen ? (
			<>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M18 6l-12 12" />
				<path d="M6 6l12 12" />
			</>
		) : (
			<>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M4 6h16" />
				<path d="M7 12h13" />
				<path d="M10 18h10" />
			</>
		)}
	</svg>
);

export default NavigationToggleIcon;
