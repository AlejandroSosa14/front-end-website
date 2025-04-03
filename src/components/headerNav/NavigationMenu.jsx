import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MENU_LINKS from "../../data/menuLinks";
import styles from "./HeaderNav.module.css";
import UserProfile from "./UserProfile";

const HeaderMenu = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [username, setUsername] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const hasRun = useRef(false);

	useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;

		const token = localStorage.getItem("authToken");
		const storedUsername = localStorage.getItem("username");

		if (token && storedUsername) {
			setIsAuthenticated(true);
			setUsername(storedUsername);

			try {
				const payload = JSON.parse(atob(token.split(".")[1]));
				if (payload.authorities?.includes("ROLE_admin")) {
					setIsAdmin(true);
				}
			} catch (error) {
				setIsAdmin(false);
				console.log("Error en autenticación", error);
			}
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const handleLogout = () => {
		setIsAuthenticated(false);
		setUsername("");
		setIsAdmin(false);
	};

	const filteredLinks = isAdmin
		? MENU_LINKS
		: MENU_LINKS.filter(
				(link) => link.label !== "Dashboard Automóviles" && link.label !== "Dashboard Categorías" && link.label !== "Dashboard Reservas"
		  );

	return (
		<>
			<ul className={styles.navigationMenu__list}>
				{filteredLinks.map((link) => (
					<li key={link.id}>
						<NavLink
							to={link.path}
							className={({ isActive }) => (isActive ? styles.activeLink : "")}>
							{link.label}
						</NavLink>
					</li>
				))}
			</ul>

			<div className={styles.navigationMenu__cta}>
				{isAuthenticated === null ? null : isAuthenticated ? (
					<UserProfile username={username} onLogout={handleLogout} />
				) : (
					<>
						<Link to="/registro" className="main-btn">
							Crear cuenta
						</Link>
						<Link to="/login" className="main-btn">
							Ingresar
						</Link>
					</>
				)}
			</div>
		</>
	);
};

export default HeaderMenu;
