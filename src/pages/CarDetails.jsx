import { useState, useEffect } from "react";

import Layout from "../components/layout/Layout";

import CARS from "../data/cars_01.js";

import Car from "../components/svgIcons/Car";
import Location from "../components/svgIcons/Location";
import Wallet from "../components/svgIcons/Wallet";

import styles from "./CarDetails.module.css";
import AllCars from "../components/allCars/AllCars.jsx";
import AllCarsPagination from "../components/allCars/AllCarsPagination.jsx";

const CarDetails = () => {
	const [location, setLocation] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [shuffledCars, setShuffledCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [isAnimating, setIsAnimating] = useState(false);
	const [showAllCars, setShowAllCars] = useState(false);

	useEffect(() => {
		const shuffled = [...CARS].sort(() => Math.random() - 0.5);
		setShuffledCars(shuffled);
		setFilteredCars(shuffled);
	}, []);

	const filterCars = () => {
		let filtered = [...CARS];

		if (location) filtered = filtered.filter((car) => car.location === location);
		if (brand) filtered = filtered.filter((car) => car.brand === brand);
		if (price) {
			switch (price) {
				case "low":
					filtered = filtered.filter((car) => car.rentalPrice >= 150 && car.rentalPrice <= 200);
					break;
				case "mid":
					filtered = filtered.filter((car) => car.rentalPrice >= 201 && car.rentalPrice <= 250);
					break;
				case "high":
					filtered = filtered.filter((car) => car.rentalPrice >= 251 && car.rentalPrice <= 300);
					break;
				case "extra":
					filtered = filtered.filter((car) => car.rentalPrice >= 301 && car.rentalPrice <= 350);
					break;
				default:
					break;
			}
		}

		setFilteredCars(filtered);
		setCurrentPage(1);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setShowAllCars(false);
		filterCars();
		setBrand("");
		setLocation("");
		setPrice("");
	};

	const handleShowAllCars = () => {
		setShowAllCars(true);
		setFilteredCars(shuffledCars);
		changePage(1);
	};

	const cardsPerPage = 9;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	// const currentCars = filteredCars.slice(indexOfFirstCard, indexOfLastCard);

	// Cambiar de página con animación
	const changePage = (newPage) => {
		setIsAnimating(true);
		setTimeout(() => {
			setCurrentPage(newPage);
			setIsAnimating(false);
		}, 300);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleNextPage = () => {
		if (currentPage < Math.ceil(filteredCars.length / cardsPerPage)) {
			changePage(currentPage + 1);
			scrollToTop();
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			changePage(currentPage - 1);
			scrollToTop();
		}
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
						{filteredCars.length === 0 && !showAllCars ? (
							<div className={`${styles.noResults} ${styles.visible}`}>
								<b>No se encontraron autos que coincidan con los filtros seleccionados.</b>
								<button onClick={handleShowAllCars} className="main-btn">
									Regresar
								</button>
							</div>
						) : (
							<AllCars
								cars={
									showAllCars
										? shuffledCars.slice(indexOfFirstCard, indexOfLastCard)
										: filteredCars.slice(indexOfFirstCard, indexOfLastCard)
								}
								cardsPerPage={cardsPerPage}
								currentPage={currentPage}
								isAnimating={isAnimating}
							/>
						)}
					</div>
					<AllCarsPagination
						cars={showAllCars ? shuffledCars : filteredCars}
						cardsPerPage={cardsPerPage}
						currentPage={currentPage}
						handlePrevPage={handlePrevPage}
						handleNextPage={handleNextPage}
						changePage={changePage}
						scrollToTop={scrollToTop}
					/>
				</div>
			</section>
		</Layout>
	);
};

export default CarDetails;
