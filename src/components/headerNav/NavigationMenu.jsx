import { Link, NavLink } from "react-router-dom";

import MENU_LINKS from "../../data/menuLinks";

import styles from "./HeaderNav.module.css";

const HeaderMenu = () => {
	return (
		<>
			{/* Main navigation menu */}
			<ul className={styles.navigationMenu__list}>
				{MENU_LINKS.map((link) => (
					<li key={link.id}>
						<NavLink
							to={link.path}
							className={({ isActive }) => (isActive ? styles.activeLink : "")}>
							{link.label}
						</NavLink>
					</li>
				))}
			</ul>

			{/* Call to action buttons */}
			<div className={styles.navigationMenu__cta}>
				<Link to="/registro" className="main-btn">
					Crear cuenta
				</Link>
				<Link href="#" className="main-btn">
					Ingresar
				</Link>
			</div>
		</>
	);
};

export default HeaderMenu;
