import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import CarCard_V2 from "../components/carCards/CarCard_V2";
import CarCard_V3 from "../components/carCards/CarCard_V3";

import ArrowLeft from "../components/svgIcons/ArrowLeft.jsx";
import ArrowRight from "../components/svgIcons/ArrowRight.jsx";

import CARS from "../data/cars.js";
import USER_COMMENTS from "../data/userComments.js";

import GalleryModal from "../components/galleryModal/GalleryModal.jsx";
import CarCardComments from "../components/carCards/CarCardComments.jsx";
import CarCalendars from "../components/carCalendars/CarCalendars.jsx";

import styles from "./CarDetail.module.css";
import PageTitle from "../components/pageTitle/PageTitle.jsx";

// Fechas ocupadas (Ejemplo: se obtiene de una API)
const unavailableDates = ["2025-03-17", "2025-03-25", "2025-04-11"];

const CarDetail = () => {
	const { carId } = useParams();
	const [car, setCar] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showGallery, setShowGallery] = useState(false);

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

	const handleThumbnailClick = (index) => setCurrentImageIndex(index);

	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? car.images.length - 1 : prevIndex - 1));
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === car.images.length - 1 ? 0 : prevIndex + 1));
	};

	if (car) {
		const userComments = USER_COMMENTS.filter((comment) => comment.carId === car.id);

		return (
			<Layout>
				<section className={styles.carDetail}>
					<PageTitle title={car.model} />
					<div className="container">
						{/* HEADER */}
						<div className={styles.carDetail_stickyTop}>
							<header className={styles.carDetail_header}>
								<h3>Características</h3>
								<Link to="/detalle-autos" className={styles.carDetail_backLink}>
									<ArrowLeft />
									Regresar
								</Link>
							</header>
						</div>

						{/* GALLERY AND DETAILS */}
						<div className={styles.carDetail_content}>
							<div className={styles.carGallery}>
								<div className={styles.carGallery_image}>
									<button className={styles.carGallery_leftButton} onClick={handlePrevImage}>
										<ArrowLeft />
									</button>
									<img src={car.images[currentImageIndex]} alt={`${car.brand} ${car.model}`} />
									<button className={styles.carGallery_rightButton} onClick={handleNextImage}>
										<ArrowRight />
									</button>
								</div>
								<div className={styles.carGallery_grid}>
									<div className={styles.carGallery_gridItem}>
										{car.images.slice(0, 4).map((image, index) => (
											<img
												key={index}
												src={image}
												alt={`Miniatura ${car.model} ${index + 1}`}
												className={`${styles.carGallery_gridImage} ${
													index === currentImageIndex ? styles.active : ""
												}`}
												onClick={() => handleThumbnailClick(index)}
											/>
										))}
									</div>
									<button className="main-btn" onClick={() => setShowGallery(true)}>
										Ver Más
									</button>
								</div>
							</div>
							<div className={styles.carInfo_cards}>
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
									<CarCard_V3 title={"Especificaciones"}>
										<ul className={styles.cardInfo_specsList}>
											{car.specs.length > 0 ? (
												car.specs.map((spec) => (
													<li key={spec.id} className={styles.cardInfo_specsItem}>
														<img src={spec.icon} alt={spec.detail} />
														<p>
															<span>{spec.type}:</span> {spec.detail}
														</p>
													</li>
												))
											) : (
												<p className={styles.cardContent_noData}>
													No hay especificaciones para éste auto.
												</p>
											)}
										</ul>
									</CarCard_V3>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="container">
						<div className={styles.carDetail_info}>
							{/* USER RATING */}
							<div className={styles.carDetail_infoRating}>
								<CarCard_V3 title={"Opiniones del auto"}>
									<CarCardComments userComments={userComments} />
								</CarCard_V3>
							</div>
							{/* AVAILABILITY CALENDAR */}
							<div className={styles.carDetail_infoDates}>
								<CarCard_V3 title={"Disponibilidad del auto"}>
									<div className={styles.carDetail_infoTip}>
										<span></span>
										<p>No disponible</p>
									</div>
									<CarCalendars unavailableDates={unavailableDates} />
								</CarCard_V3>
							</div>
						</div>
					</div>
				</section>
				{showGallery && <GalleryModal images={car.images} onClose={() => setShowGallery(false)} />}
			</Layout>
		);
	}

	return (
		<Layout>
			<section className={styles.carDetail}>
				<div className="container">
					<p>Auto no encontrado</p>
				</div>
			</section>
		</Layout>
	);
};

export default CarDetail;
