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
							<svg className={styles.cardIcon} width="128" height="128" viewBox="0 0 24 24">
								<path
									fill="none"
									stroke="#000000"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1"
									d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"
									color="#000000"
								/>
							</svg>
							<span>{score}</span>
						</div>
						<div className="flex-row align-middle">
							<svg className={styles.cardIcon} width="256" height="256" viewBox="0 0 512 512">
								<path
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="16"
									d="m80 224l37.78-88.15C123.93 121.5 139.6 112 157.11 112h197.78c17.51 0 33.18 9.5 39.33 23.85L432 224m-352 0h352v144H80zm32 144v32H80v-32m352 0v32h-32v-32"
								/>
								<circle
									cx="144"
									cy="288"
									r="16"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="16"
								/>
								<circle
									cx="368"
									cy="288"
									r="16"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="16"
								/>
							</svg>
							<span>{quantityAvailable}</span>
						</div>
					</div>
					<div className={styles.cardaDataFavorite}>
						{!isFavorite ? (
							<button className={styles.cardFavoriteBtn}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0"
									/>
								</svg>
							</button>
						) : (
							<button className={`${styles.cardFavoriteBtn} ${styles.cardIsFavorite}`}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0"
									/>
								</svg>
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
