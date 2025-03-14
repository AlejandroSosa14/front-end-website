import CarCard_V1 from "../carCards/CarCard_V1";

import CARS from "../../data/cars";

import styles from "./Suggestions.module.css";

// Consumir desde API para generar tarjetas actualizadas

const Suggestions = () => {
	return (
		<section className="suggestions">
			<div className="flex-row">
				<h2 className="sectionTitle">Recomendaciones de automóviles</h2>
			</div>
			<div className={styles.suggestionsCarrousel}>
				<div className={styles.suggestionsCardsContainer}>
					{CARS.map(
						({
							id,
							images,
							model,
							isAvailable,
							score,
							quantityAvailable,
							rentalPrice,
							isFavorite,
						}) => {
							console.log(rentalPrice);
							return (
								rentalPrice <= 250 && (
									<CarCard_V1
										key={id}
										imageURL={images[0]}
										name={model}
										isAvailable={isAvailable}
										score={score}
										quantityAvailable={quantityAvailable}
										rentalPrice={rentalPrice}
										isFavorite={isFavorite}
									/>
								)
							);
						}
					)}
				</div>
			</div>
		</section>
	);
};

export default Suggestions;
