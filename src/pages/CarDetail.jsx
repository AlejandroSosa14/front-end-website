import { useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SearchCarContext from "../context/SearchCarContext.jsx";

import Layout from "../components/layout/Layout";
import CarCard_V2 from "../components/carCards/CarCard_V2";
import CarCard_V3 from "../components/carCards/CarCard_V3";

import ArrowLeft from "../components/svgIcons/ArrowLeft.jsx";
import ArrowRight from "../components/svgIcons/ArrowRight.jsx";
import CarOutline from "../components/svgIcons/CarOutline.jsx";
import CarGarageOutline from "../components/svgIcons/CarGarageOutline.jsx";
import PaintBrushOutline from "../components/svgIcons/PaintBrushOutline.jsx";
import GasStationOutline from "../components/svgIcons/GasStationOutline.jsx";
import MotorOutline from "../components/svgIcons/MotorOutline.jsx";

import GalleryModal from "../components/galleryModal/GalleryModal.jsx";
import CarCardComments from "../components/carCards/CarCardComments.jsx";
import CarCalendars from "../components/carCalendars/CarCalendars.jsx";

import CarReservation from "../components/modal/CarReservation.jsx";
import Swal from "sweetalert2";

import styles from "./CarDetail.module.css";
import PageTitle from "../components/pageTitle/PageTitle.jsx";
import ShareSocialMedia from "../components/shareSocialMedia/ShareSocialMedia.jsx";
import SpecsDetail from "../components/carDetails/SpecsDetail.jsx";

// Fechas ocupadas (Ejemplo: se obtiene de una API)
import { getRandomUnavailableDates } from "../utils/getRandomUnavailableDates.js";

const CarDetail = () => {
	const { carId } = useParams();
	const { allCars, loading, error } = useContext(SearchCarContext);
	const [car, setCar] = useState(null);
	const [areGenericCarImages, setIsGenericCarImages] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showGallery, setShowGallery] = useState(false);
	const [showReservationModal, setShowReservationModal] = useState(false);
	const navigate = useNavigate();
	const genericCarImage = "/images/categories/generic_car.webp";

	const galleryImages = useMemo(() => {
		if (car?.images?.length > 0) return car.images;
		else {
			setIsGenericCarImages(true);
			return Array(5).fill(genericCarImage);
		}
	}, [car?.images, genericCarImage]);

	useEffect(() => {
		if (allCars.length > 0 && carId) {
			const foundCar = allCars.find((car) => car.id === parseInt(carId));
			setCar(foundCar);
			localStorage.setItem("CarId", carId);
		}
	}, [allCars, carId]);

	const handleThumbnailClick = (index) => setCurrentImageIndex(index);

	const handlePrevImage = () => {
		if (car && (car.images?.length > 0 || galleryImages.length === 5)) {
			const length = car.images?.length || galleryImages.length;
			setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? length - 1 : prevIndex - 1));
		}
	};

	const handleNextImage = () => {
		if (car && (car.images?.length > 0 || galleryImages.length === 5)) {
			const length = car.images?.length || galleryImages.length;
			setCurrentImageIndex((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
		}
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
					navigate("/login");
				}
			});
		} else {
			setShowReservationModal(true);
		}
	};

	let randomDates = [];

	if (loading) {
		return (
			<Layout>
				<section className={styles.carDetail}>
					<div className="container">
						<p>Cargando detalles del auto...</p>
					</div>
				</section>
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<section className={styles.carDetail}>
					<div className="container">
						<p>Error al cargar los detalles del auto: {error}</p>
					</div>
				</section>
			</Layout>
		);
	}

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
		// {
		// 	if (car.reserves.length > 0) randomDates = car.reserves;
		// 	else {
		// 		let firstRange = getRandomUnavailableDates();
		// 		randomDates = [...firstRange, ...getRandomUnavailableDates()];
		// 	}
		// }
		return (
			<Layout>
				<PageTitle title={`${car.brand.toUpperCase()} - ${car.name.toUpperCase()}`} />
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
						{/* ********** GALLERY ********** */}
						<div className={styles.carInfo_gallery}>
							<div className={styles.carInfo_galleryImage}>
								<button className={styles.carInfo_galleryLeft} onClick={handlePrevImage}>
									<ArrowLeft />
								</button>
								{/* Main Image */}
								{!areGenericCarImages ? (
									<img src={galleryImages[currentImageIndex]} alt={`${car.brand} ${car.model}`} />
								) : (
									<img
										src={galleryImages[currentImageIndex]}
										alt={`GenericImage_${currentImageIndex + 1}`}
									/>
								)}
								<button className={styles.carInfo_galleryRight} onClick={handleNextImage}>
									<ArrowRight />
								</button>
							</div>
							<div className={styles.carInfo_galleryThumbs}>
								{/* Thumbs */}
								<div className={styles.carInfo_thumbItem}>
									{galleryImages.map((image, index) =>
										!areGenericCarImages ? (
											<img
												key={index}
												src={image}
												alt={`Miniatura ${car.brand} ${index + 1}`}
												className={`${styles.carInfo_thumbImage} ${
													index === currentImageIndex ? styles.active : ""
												}`}
												onClick={() => handleThumbnailClick(index)}
											/>
										) : (
											<img
												key={index}
												src={image}
												alt={`GenericImage_${index + 1}`}
												className={`${styles.carInfo_thumbImage} ${
													index === currentImageIndex ? styles.active : ""
												}`}
												onClick={() => handleThumbnailClick(index)}
											/>
										)
									)}
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
									brand={car.brand}
									name={car.name}
									reserveCost={car.reserveCost}
									locationCity={car.locationCity}
									locationCountry={car.locationCountry}
									isFavorite={car.isFavorite}
								/>
							</div>
							<div className={styles.carInfo_cardContainer}>
								<CarCard_V3 title={"Especificaciones"}>
									<ul className={styles.cardInfo_specsList}>
										<li className={styles.cardInfo_specsItem}>
											<SpecsDetail content={car.brand} icon={<CarOutline />} title={"Marca"} />
										</li>
										<li className={styles.cardInfo_specsItem}>
											<SpecsDetail
												content={car.name}
												icon={<CarGarageOutline />}
												title={"Nombre"}
											/>
										</li>
										<li className={styles.cardInfo_specsItem}>
											<SpecsDetail
												content={car.color}
												icon={<PaintBrushOutline />}
												title={"Color"}
											/>
										</li>
										<li className={styles.cardInfo_specsItem}>
											<SpecsDetail
												content={car.fuelType}
												icon={<GasStationOutline />}
												title={"Combustible"}
											/>
										</li>
										<li className={styles.cardInfo_specsItem}>
											<SpecsDetail
												content={car.transmissionType}
												icon={<MotorOutline />}
												title={"Transmisión"}
											/>
										</li>
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
								{/* Cuando la BD proporcione un array de comentarios válido, descomentar la línea de abajo y eliminar la siguiente línea de código: {Object.keys(car.scores).length <= 0 ? ( */}
								{/* {!car?.scores?.length > 0 ? ( */}
								{Object.keys(car.scores).length <= 0 ? (
									<CarCard_V3 title={"Opiniones del auto"}>
										<p className={styles.cardInfo_noSpecs}>
											Aún no hay comentarios para éste auto.
										</p>
									</CarCard_V3>
								) : (
									<CarCard_V3 title={"Opiniones del auto"}>
										{/* Cuando la BD proporcione un array de comentarios válido, descomentar la línea de abajo y eliminar la siguiente línea de código: <CarCardComments userScores={[]} /> */}
										{/* <CarCardComments userScores={car.scores} /> */}
										<CarCardComments userScores={[]} />
									</CarCard_V3>
								)}
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
									<CarCalendars unavailableDates={randomDates} />
									<button className="main-btn" onClick={handleReservationClick}>
										Reservar
									</button>
								</CarCard_V3>
							</div>
						</div>
					</div>
				</section>
				{showGallery && (
					<GalleryModal
						brand={car.brand}
						name={car.name}
						galleryImages={galleryImages}
						areGenericCarImages={areGenericCarImages}
						onClose={() => setShowGallery(false)}
					/>
				)}
				{showReservationModal && car && (
					<CarReservation car={car} onClose={() => setShowReservationModal(false)} />
				)}
			</Layout>
		);
	}
};

export default CarDetail;
