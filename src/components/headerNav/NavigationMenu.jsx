import styles from "./HeaderNav.module.css";

const HeaderMenu = () => {
	return (
		<ul className={styles.navigationMenu__list}>
			<li>
				<a href="#">Crear cuenta</a>
			</li>
			<li>
				<a href="#">Iniciar sesión</a>
			</li>
		</ul>
	);
};

export default HeaderMenu;
