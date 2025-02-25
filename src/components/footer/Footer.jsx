import NavigationLogo from "../headerNav/NavigationLogo";

import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={`container flex-row section ${styles.footerContent}`}>
				<div className={styles.footerTop}>
					<div className={styles.footerTopLeft}>
						<NavigationLogo />
						<p className={styles.footerTopLeftText}>
							Ofrecemos los mejores automóviles con los mejores precios. Somos expertos en alquiler
							de coches. Disfruta de tus vacaciones con nosotros. Hacemos que su viaje sea
							memorable. Y nos preocupamos por tu seguridad.
						</p>
					</div>
					<div className={styles.footerTopRight}>
						<h3>Enlaces</h3>
						<nav>
							<ul>
								<li>
									<a href="/">Inicio</a>
								</li>
								<li>
									<a href="#">Nosotros</a>
								</li>
								<li>
									<a href="/autos">Automóviles</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>
						© 2025 Todos los derechos reservados <strong>RapidRide</strong>.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
