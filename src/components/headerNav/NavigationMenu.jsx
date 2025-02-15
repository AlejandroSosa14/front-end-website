import styles from "./HeaderNav.module.css";

const HeaderMenu = () => {
	return (
		<>
			{/* Main navigation menu */}
			<ul className={styles.navigationMenu__list}>
				<li>
					<a href="/">Inicio</a>
				</li>
				<li>
					<a href="#">Nosotros</a>
				</li>
				<li>
					<a href="#">Automóviles</a>
				</li>
			</ul>

			{/* Call to action buttons */}
			<div className={styles.navigationMenu__cta}>
				<a href="#" className={`main-btn ${styles.navigationMenu__button}`}>
					Crear cuenta
				</a>
				<a href="#" className={`main-btn ${styles.navigationMenu__button}`}>
					Ingresar
				</a>
			</div>
		</>
	);
};

export default HeaderMenu;
