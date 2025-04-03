import { useNavigate } from "react-router-dom";

import CarOutline from "../svgIcons/CarOutline";
import LocationOutline from "../svgIcons/LocationOutline";
import HeartOutline from "../svgIcons/HeartOutline";
import Star from "../svgIcons/Star";

import styles from "./CarCard_V1V2V3.module.css";

const CarCard_V1 = ({
	id,
	imageURL,
	brand,
	name,
	locationCity,
	locationCountry,
	isAvailable,
	score,
	quantityAvailable,
	reserveCost,
	isFavorite,
}) => {
	const navigate = useNavigate();

	const genericImageUrl = "/images/categories/generic_car.webp";
	const displayImageUrl = imageURL && imageURL.length > 0 ? imageURL[0] : genericImageUrl;

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleViewDetails = () => {
		navigate(`/auto/${id}`);
		scrollToTop();
	};

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
				<img className={styles.cardContent_image} src={displayImageUrl} alt={`Model ${name}`} />
				<header className={styles.cardContent_header}>
					<h3 className={styles.cardContent_title}>
						{brand} - {name}
					</h3>
					<h4 className={styles.cardContent_subtitle}>
						{isAvailable ? "Disponible" : "No disponible"}
					</h4>
				</header>
				<div className={styles.cardContent_details}>
					<div className={styles.cardContent_detailsScores}>
						<div className="flex-row align-middle">
							<Star />
							<span>{score}</span>
						</div>
						<div className="flex-row align-middle">
							<CarOutline />
							<span>{quantityAvailable}</span>
						</div>
					</div>
					<div className={styles.cardContent_detailsLocation}>
						<LocationOutline />
						<p>
							{locationCity}, {locationCountry}
						</p>
					</div>
					<div className={styles.cardContent_detailsRental}>
						<p>{`$${reserveCost} / día`}</p>
						<button className={styles.cardContent_button} onClick={handleViewDetails}>
							Ver Detalle
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarCard_V1;
