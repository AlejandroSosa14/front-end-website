import CarCard_V1 from "../carCards/CarCard_V1";

import CARS_01 from "../../data/cars";

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
					{CARS_01.map(
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
								rentalPrice <= 150 && (
									<CarCard_V1
										key={id}
										imageURL={imageURL}
										name={name}
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
