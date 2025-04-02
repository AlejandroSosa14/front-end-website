import { useContext } from "react";
import SearchCarContext from "../../context/SearchCarContext";

import CarCard_V1 from "../carCards/CarCard_V1";

import styles from "./Suggestions.module.css";

const Suggestions = () => {
	const { getCheapCars } = useContext(SearchCarContext);

	return (
		<section className="suggestions">
			<div className="flex-row">
				<h2 className="sectionTitle">Automóviles recomendados</h2>
			</div>
			<div className={styles.suggestionsCarrousel}>
				<div className={styles.suggestionsCardsContainer}>
					{getCheapCars
						.slice(0, 8)
						.map(
							({
								id,
								brand,
								name,
								images,
								model,
								locationCity,
								locationCountry,
								status,
								score,
								quantityAvailable,
								reserveCost,
								isFavorite,
							}) => (
								<CarCard_V1
									key={id}
									id={id}
									brand={brand}
									name={name}
									imageURL={images}
									model={model}
									locationCity={locationCity}
									locationCountry={locationCountry}
									isAvailable={status}
									score={score}
									quantityAvailable={quantityAvailable}
									reserveCost={reserveCost}
									isFavorite={isFavorite}
								/>
							)
						)}
				</div>
			</div>
		</section>
	);
};

export default Suggestions;
