import { useState } from "react";

import NavigationLogo from "./NavigationLogo";
import NavigationToggleIcon from "./NavigationToggleIcon";
import NavigationMenu from "./NavigationMenu";

import styles from "./HeaderNav.module.css";

const HeaderNav = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleToggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const handleCloseMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<header className={styles.header}>
			<div className={`container ${styles.headerNav}`}>
				{/* LOGO */}
				<div className={styles.navigationLogo}>
					<NavigationLogo />
				</div>

				{/* TOGGLE MOBILE */}
				<div onClick={handleToggleMenu}>
					<NavigationToggleIcon isOpen={isMenuOpen} />
				</div>

				{/* NAVIGATION */}
				<nav
					className={`${styles.navigationMenu} ${
						isMenuOpen ? styles.navigationMenuMobileOpen : ""
					}`}
					onClick={handleCloseMenu}>
					<NavigationMenu />
				</nav>
			</div>
		</header>
	);
};

export default HeaderNav;
