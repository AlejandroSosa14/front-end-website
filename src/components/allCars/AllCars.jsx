import CarCard_V1 from "../carCards/CarCard_V1";

import styles from "./AllCars.module.css";

const AllCars = ({ cars, isAnimating }) => {
	return (
		<div
			className={`${styles.carDetailsGrid} ${
				isAnimating ? styles["fade-out"] : styles["fade-in"]
			}`}>
			{cars.map((car) => (
				<CarCard_V1
					key={car.id}
					imageURL={car.imageURL}
					name={car.name}
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

export default AllCars;
