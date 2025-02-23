import CarOutline from "../../svgIcons/CarOutline";
import HeartOutline from "../../svgIcons/HeartOutline";
import Star from "../../svgIcons/Star";
import styles from "./CardSuggestion.module.css";

const CardSuggestion = ({
	imageURL,
	name,
	isAvailable,
	score,
	quantityAvailable,
	rentalPrice,
	isFavorite,
}) => {
	return (
		<div className={styles.card}>
			<img className={styles.cardImage} src={imageURL} alt={`Model ${name}`} />
			<div className={styles.cardContent}>
				<header className={styles.cardHeader}>
					<h3 className={styles.cardHeaderTitle}>{name}</h3>
					<h4 className={styles.cardHeaderSubtitle}>{isAvailable && "Disponible"}</h4>
				</header>
				<div className={styles.cardData}>
					<div className={styles.cardDataScores}>
						<div className="flex-row align-middle">
							<Star />
							<span>{score}</span>
						</div>
						<div className="flex-row align-middle">
							<CarOutline />
							<span>{quantityAvailable}</span>
						</div>
					</div>
					<div className={styles.cardaDataFavorite}>
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
				</div>
				<div className={styles.cardInfoRental}>
					<p>{`$ ${rentalPrice} / día`}</p>
					<button>Alquilar</button>
				</div>
			</div>
		</div>
	);
};

export default CardSuggestion;
