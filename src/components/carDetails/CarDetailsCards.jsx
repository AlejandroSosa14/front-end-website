import { motion } from "framer-motion";

import CarCard_V1 from "../carCards/CarCard_V1";

import styles from "./CarDetailsCards.module.css";

const CarDetailsCards = ({ cars, isAnimating }) => {
	return (
		<motion.div
			key={isAnimating}
			className={`${styles.carDetailsGrid} ${isAnimating ? styles["fade-out"] : styles["fade-in"]}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}>
			{cars.map((car) => {
				return (
					<CarCard_V1
						key={car.id}
						id={car.id}
						imageURL={car.images}
						brand={car.brand}
						name={car.name}
						locationCity={car.locationCity}
						locationCountry={car.locationCountry}
						isAvailable={car.status}
						score={car.score}
						quantityAvailable={car.quantityAvailable}
						reserveCost={car.reserveCost}
						isFavorite={car.isFavorite}
					/>
				);
			})}
		</motion.div>
	);
};

export default CarDetailsCards;
