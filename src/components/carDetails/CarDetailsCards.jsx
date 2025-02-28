import CarCard_V1 from "../carCards/CarCard_V1";

import styles from "./CarDetailsCards.module.css";

const CarDetailsCards = ({ cars, isAnimating }) => {
	return (
		<div
			className={`${styles.carDetailsGrid} ${
				isAnimating ? styles["fade-out"] : styles["fade-in"]
			}`}>
			{cars.map((car) => (
				<CarCard_V1
					key={car.id}
					id={car.id}
					imageURL={car.images[0]}
					name={car.name}
					locationCity={car.locationCity}
					locationCountry={car.locationCountry}
					isAvailable={car.isAvailable}
					score={car.score}
					quantityAvailable={car.quantityAvailable}
					rentalPrice={car.rentalPrice}
					isFavorite={car.isFavorite}
				/>
			))}
		</div>
	);
};

export default CarDetailsCards;
