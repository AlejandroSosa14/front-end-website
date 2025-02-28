import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import CarCard_V2 from "../components/carCards/CarCard_V2";
import CarCard_V3 from "../components/carCards/CarCard_V3";

import CARS from "../data/cars.js";

import styles from "./CarDetail.module.css";

const CarDetail = () => {
	const { carId } = useParams();
	const [car, setCar] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const foundCar = CARS.find((car) => car.id === parseInt(carId));
		setCar(foundCar);
	}, [carId]);

	// Ejemplo de llamada a la API (sustituir en lugar del useEffect anterior)
	// useEffect(() => {
	// 	fetch(`https://tu-api.com/autos/${carId}`)
	// 		.then((res) => res.json())
	// 		.then((data) => setCar(data))
	// 		.catch((err) => console.error(err));
	// }, [carId]);

	if (!car) {
		return (
			<Layout>
				<section className="section">
					<div className="container">
						<h2>Auto no encontrado</h2>
					</div>
				</section>
			</Layout>
		);
	}

	const handleThumbnailClick = (index) => setCurrentImageIndex(index);

	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? car.images.length - 1 : prevIndex - 1));
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === car.images.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<Layout>
			<section className="section">
				<div className="container">
					<div className={styles.carDetail_container}>
						<div className={styles.carGallery}>
							<div className={styles.carGallery_mainImageContainer}>
								<button className={styles.carGallery_navButtonLeft} onClick={handlePrevImage}>
									&lt;
								</button>
								<img
									src={car.images[currentImageIndex]}
									alt={`${car.brand} ${car.model}`}
									className={styles.carGallery_mainImage}
								/>
								<button className={styles.carGallery_navButtonRight} onClick={handleNextImage}>
									&gt;
								</button>
							</div>
							<div className={styles.carGallery_thumbnails}>
								{car.images.slice(0, 3).map((image, index) => (
									<img
										key={index}
										src={image}
										alt={`Miniatura ${car.model} ${index + 1}`}
										className={`${styles.carGallery_thumbnail} ${
											index === currentImageIndex ? styles.active : ""
										}`}
										onClick={() => handleThumbnailClick(index)}
									/>
								))}
							</div>
						</div>
						<div className={styles.carInfo}>
							<h2>Características</h2>
							<div className={styles.carInfo_cardContainer}>
								<CarCard_V2
									score={car.score}
									model={car.model}
									rentalPrice={car.rentalPrice}
									locationCity={car.locationCity}
									locationCountry={car.locationCountry}
									isFavorite={car.isFavorite}
								/>
							</div>
							<div className={styles.carInfo_cardContainer}>
								<CarCard_V3
									brand={car.brand}
									model={car.model}
									color={car.color}
									fuel={car.fuel}
									transmission={car.transmission}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CarDetail;
