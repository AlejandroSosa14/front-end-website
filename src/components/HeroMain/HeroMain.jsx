import styles from "./HeroMain.module.css";

const HeroMain = () => {
	return (
		<div className={styles.heroMain}>
			<section className={`container ${styles.heroMainContent}`}>
				<h1>
					Viaje sin problemas con el alquiler de automóviles <strong>RapidRide</strong>
				</h1>
				<a className="main-btn" href="#">
					Ver automóviles
				</a>
			</section>
		</div>
	);
};

export default HeroMain;
