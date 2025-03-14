import { useMemo } from "react";

import CarCard_V1 from "../carCards/CarCard_V1";

import { getBestPrices } from "../../utils/getBestPrices";

import CARS from "../../data/cars";

import styles from "./Suggestions.module.css";

// Consumir desde API para generar tarjetas actualizadas

const Suggestions = () => {
	const bestPrice = useMemo(() => {
		const rentalPrices = CARS.map((car) => car.rentalPrice);
		return getBestPrices(rentalPrices, 0.25);
	}, []);

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
							locationCity,
							locationCountry,
							isAvailable,
							score,
							quantityAvailable,
							rentalPrice,
							isFavorite,
						}) => {
							console.log(rentalPrice);
							return (
								rentalPrice <= bestPrice && (
									<CarCard_V1
										key={id}
										imageURL={images[0]}
										model={model}
										locationCity={locationCity}
										locationCountry={locationCountry}
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
