import LocationOutline from "../svgIcons/LocationOutline";
import Star from "../svgIcons/Star";
import HeartOutline from "../svgIcons/HeartOutline";

import styles from "./CarCard_V1V2V3.module.css";

const CardCard_V2 = ({ score, model, rentalPrice, locationCity, locationCountry, isFavorite }) => {
	return (
		<div className={styles.card}>
			<div className={styles.card_isFavorite}>
				{!isFavorite ? (
					<button className="favoriteButton">
						<HeartOutline />
					</button>
				) : (
					<button className="favoriteButton isFavoriteButton">
						<HeartOutline />
					</button>
				)}
			</div>
			<div className={styles.cardContent}>
				<h3 className={styles.cardContent_detailsTitle}>Detalles</h3>
				<div className="flex-row align-middle">
					<Star />
					<span>{score}</span>
				</div>
				<h4 className={styles.cardContent_title}>{model}</h4>
				<div className={styles.cardContent_detailsLocation}>
					<LocationOutline />
					<p>
						{locationCity}, {locationCountry}
					</p>
				</div>
				<div className={styles.cardContent_detailsRental}>
					<p>{`$${rentalPrice} / día`}</p>
					<button className={styles.cardContent_button}>Alquilar</button>
				</div>
			</div>
		</div>
	);
};

export default CardCard_V2;
