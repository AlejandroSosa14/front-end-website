import { Link } from "react-router-dom";
import styles from "./HeroMain.module.css";

const HeroMain = () => {
	return (
		<div className={styles.heroMain}>
			<section className={`container ${styles.heroMainContent}`}>
				<h1>
					Viaje sin problemas con el alquiler de automóviles <strong>RapidRide</strong>
				</h1>
				<Link to="/detalle-autos" className="main-btn">
					Ver automóviles
				</Link>
			</section>
		</div>
	);
};

export default HeroMain;
