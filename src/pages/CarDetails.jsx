import { useState } from "react";

import Layout from "../components/layout/Layout";

import Car from "../components/svgIcons/Car";
import Location from "../components/svgIcons/Location";
import Wallet from "../components/svgIcons/Wallet";

import CARS from "../data/cars_01.js";

import styles from "./CarDetails.module.css";
import CardSuggestion from "../components/suggestions/card/CardSuggestion";
import ArrowsRight from "../components/svgIcons/ArrowsRight.jsx";
import ArrowsLeft from "../components/svgIcons/ArrowsLeft.jsx";
import ArrowLeft from "../components/svgIcons/ArrowLeft.jsx";
import ArrowRight from "../components/svgIcons/ArrowRight.jsx";

const CarDetails = () => {
	const [location, setLocation] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		console.log("Buscando autos con los siguientes filtros:");
		console.log("Ubicación:", location);
		console.log("Marca:", brand);
		console.log("Precio:", price);
		// Lógica para mandar a la API la solicitud de búsqueda y obtener los datos
	};

	return (
		<Layout>
			<section className={styles.carDetails}>
				<h2>Automóviles</h2>
				<div className="container">
					<div className={styles.carDetailsContainer}>
						<div className={styles.carDetailsSearch}>
							<form className={styles.carDetailsSearchForm} onSubmit={handleSearch}>
								<div className={styles.carDetailsSelectContainer}>
									<Location />
									<select
										id="location"
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										className={styles.searchFormSelect}
										required>
										<option value="">Ubicación</option>
										<option value="location-1">Location 1</option>
										<option value="location-2">Location 2</option>
										<option value="location-3">Location 3</option>
										<option value="location-4">Location 4</option>
									</select>
								</div>
								<div className={styles.carDetailsSelectContainer}>
									<Car />
									<select
										id="brand"
										value={brand}
										onChange={(e) => setBrand(e.target.value)}
										className={styles.searchFormSelect}
										required>
										<option value="">Marca</option>
										<option value="audi">Audi</option>
										<option value="bmw">BMW</option>
										<option value="seat">Seat</option>
										<option value="volkswagen">Volkswagen</option>
									</select>
								</div>
								<div className={styles.carDetailsSelectContainer}>
									<Wallet />
									<select
										id="price"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
										className={styles.searchFormSelect}
										required>
										<option value="">Precio</option>
										<option value="low">$150 - $200</option>
										<option value="mid">$201 - $250</option>
										<option value="high">$251 - $300</option>
										<option value="extra">$301 - $350</option>
									</select>
								</div>
								<button type="submit" className="main-btn">
									Buscar
								</button>
							</form>
						</div>
						<div className={styles.carDetailsGrid}>
							{CARS.map((car) => (
								<CardSuggestion
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
					</div>
					<div className={styles.carDetailsPagination}>
						<button className={styles.carDetailsPaginationButton}>
							<ArrowsLeft />
						</button>
						<button className={styles.carDetailsPaginationButton}>
							<ArrowLeft />
						</button>
						<a href="#">1</a>
						<a href="#">2</a>
						<a href="#">3</a>
						<button className={styles.carDetailsPaginationButton}>
							<ArrowRight />
						</button>
						<button className={styles.carDetailsPaginationButton}>
							<ArrowsRight />
						</button>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CarDetails;
