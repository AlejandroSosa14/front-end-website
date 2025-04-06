import Car from "../svgIcons/Car";
import Clock from "../svgIcons/Clock";
import Savings from "../svgIcons/Savings";
import Shield from "../svgIcons/Shield";
import styles from "./Customer.module.css";

import genericHomeImage from "../../assets/images/home-customer-car.png";

const Customer = () => {
	return (
		<div className={`${styles.customer}`}>
			<div className={styles.customerBanner}>
				<img src={genericHomeImage} alt="Generic car" />
			</div>
			<div className={styles.customerContent}>
				<h2 className="sectionTitle">Disfruta de tus aventuras sin contratiempos</h2>
				<p>
					Emprenda su viaje con facilidad a través de RapidRide, su principal destino para alquilar
					automóviles. Tanto si está planeando un viaje por carretera a través del país, una
					escapada de fin de semana, o simplemente necesita un coche fiable para sus desplazamientos
					diarios, RapidRide le tiene cubierto.
				</p>
				<div className={styles.customerFeaturesContainer}>
					<div className={styles.customerFeatures}>
						<Car />
						<p>Variedad de automóviles</p>
					</div>
					<div className={styles.customerFeatures}>
						<Savings />
						<p>Precios accesibles a todos los bolsillos</p>
					</div>
					<div className={styles.customerFeatures}>
						<Clock />
						<p>Disponibilidad 24/7</p>
					</div>
					<div className={styles.customerFeatures}>
						<Shield />
						<p>Calidad y seguridad en todos sus viajes</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Customer;
