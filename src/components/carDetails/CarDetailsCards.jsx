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
				let imageUrl = "";
				try {
					const imagesArray = JSON.parse(car.images || "[]");
					imageUrl = imagesArray[0] || "";
				} catch (error) {
					console.error("Error parsing images:", error);
				}

				return (
					<CarCard_V1
						key={car.id}
						id={car.id}
						imageURL={imageUrl}
						name={car.name}
						brand={car.brand}
						locationCity={car.locationCity}
						locationCountry={car.locationCountry} // Si existe en tu API
						isAvailable={car.status} //Asumiendo que status representa la disponibilidad
						score={car.score} // Si existe en tu API
						quantityAvailable={car.quantityAvailable} // Si existe en tu API
						rentalPrice={car.reserveCost} // Asumiendo que reserveCost es el precio de alquiler
						isFavorite={car.isFavorite} // Si existe en tu API
					/>
				);
			})}
		</motion.div>
	);
};

export default CarDetailsCards;
