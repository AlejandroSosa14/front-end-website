// import { useState, useEffect } from "react";

import CardSuggestion from "./card/CardSuggestion";
import styles from "./Suggestions.module.css";

// Consumir desde API para generar tarjetas actualizadas
const suggestedCars = [
	{
		id: 1,
		imageURL: "/src/assets/images/mazda-cx-3.png",
		name: "Toyota Corolla",
		isAvailable: true,
		score: 4.5,
		quantityAvailable: 5,
		rentalPrice: 250,
		isFavorite: false,
	},
	{
		id: 2,
		imageURL: "/src/assets/images/mazda-cx-3.png",
		name: "Chevrolet Spark",
		isAvailable: true,
		score: 4.3,
		quantityAvailable: 3,
		rentalPrice: 150,
		isFavorite: true,
	},
	{
		id: 3,
		imageURL: "/src/assets/images/mazda-cx-3.png",
		name: "Hyundai Accent",
		isAvailable: true,
		score: 4.7,
		quantityAvailable: 2,
		rentalPrice: 200,
		isFavorite: false,
	},
	{
		id: 4,
		imageURL: "/src/assets/images/mazda-cx-3.png",
		name: "Kia Rio",
		isAvailable: true,
		score: 4.6,
		quantityAvailable: 4,
		rentalPrice: 180,
		isFavorite: false,
	},
];

const Suggestions = () => {
	// const [startIndex, setStartIndex] = useState(0);
	// const [visibleCards, setVisibleCards] = useState(4);

	// const updateVisibleCards = () => {
	// 	const width = window.innerWidth;

	// 	if (width < 482) {
	// 		setVisibleCards(1); // Smartphones: 1 card
	// 		// setGap(1);
	// 	} else if (width >= 482 && width < 768) {
	// 		setVisibleCards(2); // Tablets: 2 cards
	// 		// setGap(9);
	// 	} else if (width >= 768 && width < 1024) {
	// 		setVisibleCards(3); // Monitores < 1280px: 3 cards
	// 		// setGap(13);
	// 	} else {
	// 		setVisibleCards(4); // Monitores >= 1280px: 4 cards
	// 	}
	// };

	// useEffect(() => {
	// 	updateVisibleCards();
	// 	window.addEventListener("resize", updateVisibleCards);
	// 	return () => window.removeEventListener("resize", updateVisibleCards);
	// }, []);

	// Función para mostrar las siguientes cards
	// const handleNext = () => {
	// 	setStartIndex((prevIndex) =>
	// 		Math.min(prevIndex + visibleCards, suggestedCars.length - visibleCards)
	// 	);
	// };

	// Función para mostrar las cards anteriores
	// const handlePrev = () => {
	// 	setStartIndex((prevIndex) => Math.max(prevIndex - visibleCards, 0));
	// };

	return (
		<section className="suggestions">
			<div className="container">
				<div className="flex-row">
					<h2 className={styles.suggestionsTitle}>Recomendaciones de automóviles</h2>
				</div>
				<div className={styles.suggestionsCarrousel}>
					{/* <button
						className={`${styles.suggestionsBtn} ${styles.suggestionsLeftBtn}`}
						onClick={handlePrev}
						disabled={startIndex === 0}>
						&lt;
					</button> */}
					<div className={styles.suggestionsCardsContainer}>
						{suggestedCars.map(
							({
								id,
								imageURL,
								name,
								isAvailable,
								score,
								quantityAvailable,
								rentalPrice,
								isFavorite,
							}) => {
								return (
									<CardSuggestion
										key={id}
										imageURL={imageURL}
										name={name}
										isAvailable={isAvailable}
										score={score}
										quantityAvailable={quantityAvailable}
										rentalPrice={rentalPrice}
										isFavorite={isFavorite}
									/>
								);
							}
						)}
					</div>
					{/* <button
						className={`${styles.suggestionsBtn} ${styles.suggestionsRightBtn}`}
						onClick={handleNext}
						disabled={startIndex + visibleCards >= suggestedCars.length}>
						&gt;
					</button> */}
				</div>
			</div>
		</section>
	);
};

export default Suggestions;
