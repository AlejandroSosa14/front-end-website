import CarGarageOutline from "../svgIcons/CarGarageOutline";
import CarOutline from "../svgIcons/CarOutline";
import PaintBrushOutline from "../svgIcons/PaintBrushOutline";
import GasStationOutline from "../svgIcons/GasStationOutline";
import MotorOutline from "../svgIcons/MotorOutline";

import styles from "./CarCard_V1V2V3.module.css";

const CarCard_V3 = ({ brand, model, color, fuel, transmission }) => {
	return (
		<div className={styles.card}>
			<div className={styles.cardContent}>
				<h3 className={styles.cardContent_specsTitle}>Especificaciones</h3>
				<ul className={styles.cardContent_specs}>
					<li className={styles.cardContent_specsList}>
						<CarGarageOutline />
						<p>Marca: {brand}</p>
					</li>
					<li className={styles.cardContent_specsList}>
						<CarOutline />
						<p>Modelo: {model}</p>
					</li>
					<li className={styles.cardContent_specsList}>
						<PaintBrushOutline />
						<p>Color: {color}</p>
					</li>
					<li className={styles.cardContent_specsList}>
						<GasStationOutline />
						<p>Combustible: {fuel}</p>
					</li>
					<li className={styles.cardContent_specsList}>
						<MotorOutline />
						<p>Transmisión: {transmission}</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CarCard_V3;
