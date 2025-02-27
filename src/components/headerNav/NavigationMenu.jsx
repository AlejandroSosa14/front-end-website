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
					<a href="/detalle-autos">Automóviles</a>
				</li>
				<li>
					<a href="/dashboard">Dashboard</a>
				</li>
			</ul>

			{/* Call to action buttons */}
			<div className={styles.navigationMenu__cta}>
				<a href="#" className="main-btn">
					Crear cuenta
				</a>
				<a href="#" className="main-btn">
					Ingresar
				</a>
			</div>
		</>
	);
};

export default HeaderMenu;
