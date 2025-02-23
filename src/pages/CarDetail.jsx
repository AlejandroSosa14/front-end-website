import { useState } from "react";
import styles from "./CarDetail.module.css";
import Layout from "../components/layout/Layout";

import Star from "../components/svgIcons/Star";
import LocationOutline from "../components/svgIcons/LocationOutline";
import HeartOutline from "../components/svgIcons/HeartOutline";
import CarGarageOutline from "../components/svgIcons/CarGarageOutline";
import CarOutline from "../components/svgIcons/CarOutline";
import PaintBrushOutline from "../components/svgIcons/PaintBrushOutline";
import GasStationOutline from "../components/svgIcons/GasStationOutline";
import MotorOutline from "../components/svgIcons/MotorOutline";

// Datos de ejemplo del auto (los datos reales se obtendrán de la API)
const car = {
	id: 1,
	brand: "Toyota",
	model: "Corolla",
	rating: 4.5,
	rentalPrice: 300,
	year: 2022,
	color: "Rojo",
	location: "Florida, EEUU",
	fuel: "Gasolina",
	transmission: "Automática",
	description: "Un auto confiable y eficiente.",
	images: [
		"/src/assets/images/mazda-cx-3.png",
		"/src/assets/images/mazda-cx-3.png",
		"/src/assets/images/mazda-cx-3.png",
		"/src/assets/images/mazda-cx-3.png",
	],
	isFavorite: false,
};

const CarDetail = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Función para cambiar la imagen principal al hacer clic en una miniatura
	const handleThumbnailClick = (index) => {
		setCurrentImageIndex(index);
	};

	// Función para navegar a la imagen anterior
	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? car.images.length - 1 : prevIndex - 1));
	};

	// Función para navegar a la siguiente imagen
	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === car.images.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<Layout>
			<section className="section">
				<div className="container">
					<div className={styles.carDetail}>
						{/* Columna izquierda: Galería de imágenes */}
						<div className={styles.carDetailGallery}>
							<div className={styles.mainImageContainer}>
								<img
									src={car.images[currentImageIndex]}
									alt={`${car.brand} ${car.model}`}
									className={styles.mainImage}
								/>
								<button className={styles.navButtonLeft} onClick={handlePrevImage}>
									&lt;
								</button>
								<button className={styles.navButtonRight} onClick={handleNextImage}>
									&gt;
								</button>
							</div>
							<div className={styles.thumbnails}>
								{car.images.slice(0, 3).map((image, index) => (
									<img
										key={index}
										src={image}
										alt={`Miniatura ${index + 1}`}
										className={`${styles.thumbnail} ${
											index === currentImageIndex ? styles.active : ""
										}`}
										onClick={() => handleThumbnailClick(index)}
									/>
								))}
							</div>
						</div>

						{/* Columna derecha: Detalles del auto */}
						<div className={styles.carDetailInfo}>
							<div className={styles.carDetailData}>
								<div className={styles.carDetailsDataInfo}>
									<div className={styles.carDetailSpecsData}>
										<Star />
										<span>{car.rating}</span>
									</div>
									<h3>{car.model}</h3>
									<p>$ {car.rentalPrice} / dia</p>
									<div className={styles.carDetailSpecsData}>
										<LocationOutline />
										<p>Ubicación {car.location}</p>
									</div>
								</div>
								<div className={styles.carDetailDataButtons}>
									<button className="favoriteButton">
										<HeartOutline />
									</button>
									<button className="main-btn">Alquilar</button>
								</div>
							</div>
							<div className={styles.carDetailSpecs}>
								<h4>Especificaciones</h4>
								<div className={styles.carDetailSpecsData}>
									<CarGarageOutline />
									<p>Marca: {car.brand}</p>
								</div>
								<div className={styles.carDetailSpecsData}>
									<CarOutline />
									<p>Modelo: {car.model}</p>
								</div>
								<div className={styles.carDetailSpecsData}>
									<PaintBrushOutline />
									<p>Color: {car.color}</p>
								</div>
								<div className={styles.carDetailSpecsData}>
									<GasStationOutline />
									<p>Combustible: {car.fuel}</p>
								</div>
								<div className={styles.carDetailSpecsData}>
									<MotorOutline />
									<p>Transmisión: {car.transmission}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CarDetail;
