import { useNavigate } from "react-router-dom";

import CarOutline from "../svgIcons/CarOutline";
import LocationOutline from "../svgIcons/LocationOutline";
import HeartOutline from "../svgIcons/HeartOutline";
import Star from "../svgIcons/Star";

import styles from "./CarCard_V1V2V3.module.css";
import { getFavorites, removeFavorite, setFavorite } from "../../api/favorites";
import { useEffect } from "react";
import { useState } from "react";

const CarCard_V1 = ({
	id,
	imagesURL,
	brand,
	name,
	locationCity,
	locationCountry,
	isAvailable,
	score,
	quantityAvailable,
	reserveCost,
}) => {
	const navigate = useNavigate();

	let parsedImagesURL = [];
	if (imagesURL) {
		parsedImagesURL = JSON.parse(imagesURL);
	}

	// const [favorite, setFavorite] = useState(null);
	const [favoriteCars, setFavoriteCars] = useState([]);
	const username = localStorage.getItem("username");
	const [loading, setLoading] = useState(true);
	const genericImageUrl = "/images/categories/generic_car.webp";
	const displayImageUrl = parsedImagesURL.length > 0 ? parsedImagesURL[0] : genericImageUrl;

	useEffect(() => {
		const fetchFavoriteCarsByUser = async () => {
			try {
				setLoading(true);
				let fetchedCars = [];

				fetchedCars = await getFavorites(username);
				setFavoriteCars(fetchedCars);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		if (username) {
			fetchFavoriteCarsByUser();
		}
	}, [username]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleViewDetails = () => {
		navigate(`/auto/${id}`);
		scrollToTop();
	};

	const handleUpdateFavoriteCar = (idCar, favorite) => {
		if (username) {
			if (favorite) {
				setFavorite(idCar, username);
			} else if (!favorite) {
				removeFavorite(username, idCar);
			}
		} else {
			console.log("Se ocupa estar loggeado");
		}
	};

	return (
		<div className={styles.card}>
			<div className={styles.card_isFavorite}>
				{favoriteCars && !favoriteCars.find((car) => car.id == id) ? (
					<button className="favoriteButton" onClick={() => handleUpdateFavoriteCar(id, true)}>
						<HeartOutline />
					</button>
				) : (
					<button
						className="favoriteButton isFavoriteButton"
						onClick={() => handleUpdateFavoriteCar(id, false)}>
						<HeartOutline />
					</button>
				)}
			</div>
			<div className={styles.cardContent}>
				<img className={styles.cardContent_image} src={displayImageUrl} alt={`Model ${name}`} />
				<header className={styles.cardContent_header}>
					<h3 className={styles.cardContent_title}>
						{brand} - {name}
					</h3>
					<h4 className={styles.cardContent_subtitle}>
						{isAvailable ? "Disponible" : "No disponible"}
					</h4>
				</header>
				<div className={styles.cardContent_details}>
					<div className={styles.cardContent_detailsScores}>
						<div className="flex-row align-middle">
							<Star />
							<span>{score}</span>
						</div>
						<div className="flex-row align-middle">
							<CarOutline />
							<span>{quantityAvailable}</span>
						</div>
					</div>
					<div className={styles.cardContent_detailsLocation}>
						<LocationOutline />
						<p>
							{locationCity}, {locationCountry}
						</p>
					</div>
					<div className={styles.cardContent_detailsRental}>
						<p>{`$${reserveCost} / día`}</p>
						<button className={styles.cardContent_button} onClick={handleViewDetails}>
							Ver Detalle
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarCard_V1;
