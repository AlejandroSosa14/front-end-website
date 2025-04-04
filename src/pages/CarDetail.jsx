import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

import CarReservation from "../components/modal/CarReservation.jsx";
import Swal from "sweetalert2"

import styles from "./CarDetail.module.css";
import PageTitle from "../components/pageTitle/PageTitle.jsx";
import ShareSocialMedia from "../components/shareSocialMedia/ShareSocialMedia.jsx";

// Fechas ocupadas (Ejemplo: se obtiene de una API)
const unavailableDates = [
	"2025-03-24",
	"2025-03-25",
	"2025-03-26",
	"2025-04-09",
	"2025-04-18",
	"2025-04-19",
	"2025-04-20",
	"2025-04-29",
	"2025-04-30",
];

const CarDetail = () => {
	const { carId } = useParams();
	const [car, setCar] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showGallery, setShowGallery] = useState(false);
	const [showReservationModal, setShowReservationModal] = useState(false); // Estado para mostrar el modal
	const navigate = useNavigate();

	useEffect(() => {
		const foundCar = CARS.find((car) => car.id === parseInt(carId));
		setCar(foundCar);
		localStorage.setItem("CarId", carId);
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

	const handleReservationClick = () => {
		const userId = localStorage.getItem("userId");
	
		if (!userId) {
		  Swal.fire({
			title: "Inicia sesión primero",
			text: "Debes iniciar sesión para reservar un auto.",
			icon: "warning",
			confirmButtonText: "Ir a Login",
		  }).then((result) => {
			if (result.isConfirmed) {
			  navigate("/login"); // Redirige al login después del SweetAlert
			}
		  });
		} else {
		  setShowReservationModal(true); // Muestra el modal si el usuario está autenticado
		}
	  };

	if (!car) {
		return (
			<Layout>
				<section className={styles.carDetail}>
					<div className="container">
						<p>Auto no encontrado</p>
					</div>
				</section>
			</Layout>
		);
	} else {
		const userComments = USER_COMMENTS.filter((comment) => comment.carId === car.id);

		return (
			<Layout>
				<PageTitle title={car.model} />
				{/* GALLERY AND INFO */}
				<div className={`container ${styles.carDetail_info}`}>
					{/* HEADER DETAIL*/}
					<div className={styles.carDetail_infoSticky}>
						<header className={styles.carDetail_infoHeader}>
							<h3>Características</h3>
							<Link to="/detalle-autos" className={styles.carDetail_headerBack}>
								<ArrowLeft />
								Regresar
							</Link>
						</header>
					</div>

					{/* NFO */}
					<div className={styles.carDetail_infoWrapper}>
						{/* GALLERY */}
						<div className={styles.carInfo_gallery}>
							<div className={styles.carInfo_galleryImage}>
								<button className={styles.carInfo_galleryLeft} onClick={handlePrevImage}>
									<ArrowLeft />
								</button>
								<img src={car.images[currentImageIndex]} alt={`${car.brand} ${car.model}`} />
								<button className={styles.carInfo_galleryRight} onClick={handleNextImage}>
									<ArrowRight />
								</button>
							</div>
							<div className={styles.carInfo_galleryThumbs}>
								<div className={styles.carInfo_thumbItem}>
									{car.images.slice(0, 4).map((image, index) => (
										<img
											key={index}
											src={image}
											alt={`Miniatura ${car.model} ${index + 1}`}
											className={`${styles.carInfo_thumbImage} ${index === currentImageIndex ? styles.active : ""
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
						{/* DETAILS AND SPECS */}
						<div className={styles.carInfo_cardsWrapper}>
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
											<p className={styles.cardInfo_noSpecs}>
												No hay especificaciones para éste auto.
											</p>
										)}
									</ul>
								</CarCard_V3>
							</div>
						</div>
					</div>
				</div>

				{/* COMMENTS, SHARE AND CALENDARS */}
				<section className="section">
					<div className="container">
						<div className={styles.carDetail_complementWrapper}>
							{/* USER RATING */}
							<div className={styles.carDetail_complementCard}>
								<CarCard_V3 title={"Opiniones del auto"}>
									{userComments[0].user && userComments[0].comment && userComments[0].date ? (
										<CarCardComments userComments={userComments} />
									) : (
										<p className={styles.cardInfo_noSpecs}>
											Aún no hay comentarios para éste auto.
										</p>
									)}
								</CarCard_V3>
							</div>
							{/* SHARE AND CALENDARS */}
							<div className={styles.carDetail_complementCards}>
								<CarCard_V3 title={"Compartir en"}>
									<ShareSocialMedia id={carId} />
								</CarCard_V3>
								<CarCard_V3 title={"Disponibilidad del auto"}>
									<div className={styles.carDetail_noAvailableTip}>
										<p>Sin disponibilidad</p>
									</div>
									<CarCalendars unavailableDates={unavailableDates} />
									<button className="main-btn" onClick={handleReservationClick}>
										Reservar
									</button>
								</CarCard_V3>
							</div>
						</div>
					</div>
				</section>
				{showGallery && <GalleryModal images={car.images} onClose={() => setShowGallery(false)} />}
				{showReservationModal && car && <CarReservation car={car} onClose={() => setShowReservationModal(false)} />}

			</Layout>

		);
	}
};

export default CarDetail;
