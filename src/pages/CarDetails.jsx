import { useState, useEffect } from "react";

import Layout from "../components/layout/Layout";

import CARS from "../data/cars.js";

import styles from "./CarDetails.module.css";
import CarDetailsCards from "../components/carDetails/CarDetailsCards.jsx";
import CarDetailsPagination from "../components/carDetails/CarDetailsPagination.jsx";
import CarDetailsSearch from "../components/carDetails/CarDetailsSearch.jsx";
import CarDetailsNoResults from "../components/carDetails/CarDetailsNoResults.jsx";

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
							<CarDetailsSearch
								handleSearch={handleSearch}
								location={location}
								setLocation={setLocation}
								brand={brand}
								setBrand={setBrand}
								price={price}
								setPrice={setPrice}
							/>
						</div>
						{filteredCars.length === 0 && !showAllCars ? (
							<CarDetailsNoResults handleShowAllCars={handleShowAllCars} />
						) : (
							<CarDetailsCards
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
					<CarDetailsPagination
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
