import { useState, useEffect } from "react";

import Layout from "../components/layout/Layout";

import CARS from "../data/cars.js";

import styles from "./CarDetails.module.css";
import CarDetailsCards from "../components/carDetails/CarDetailsCards.jsx";
import CarDetailsPagination from "../components/carDetails/CarDetailsPagination.jsx";
import CarDetailsSearch from "../components/carDetails/CarDetailsSearch.jsx";
import CarDetailsNoResults from "../components/carDetails/CarDetailsNoResults.jsx";

const CarDetails = () => {
	// const [allCars, setAllCars] = useState([]); // Autos desde la API
	const [randomCars, setRandomCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [locations, setLocations] = useState([]);
	const [brands, setBrands] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const [showAllCars, setShowAllCars] = useState(false);
	const [locationCity, setLocationCity] = useState("");
	const [brand, setBrand] = useState("");

	// Obtener autos desde el archivo cars.js
	useEffect(() => {
		const shuffled = [...CARS].sort(() => Math.random() - 0.5);
		setRandomCars(shuffled);
		setFilteredCars(shuffled);

		setLocations([...new Set(CARS.map((car) => car.locationCity))]);
		setBrands([...new Set(CARS.map((car) => car.brand))]);
	}, []);

	// // Obtener autos desde la API
	// useEffect(() => {
	// 	const fetchCars = async () => {
	// 		try {
	// 			const response = await fetch("https://api.example.com/cars");
	// 			const data = await response.json();
	// 			setAllCars(data);
	// 			setFilteredCars(data);

	// 			setLocations ([...new Set(data.map((car) => car.locationCity))]);
	// 			setBrands ([...new Set(data.map((car) => car.brand))]);
	// 		} catch (error) {
	// 			console.error("Error al obtener autos:", error);
	// 		}
	// 	};

	// 	fetchCars();
	// }, []);

	const handleSearch = ({ locationCity, brand }) => {
		// const results = allCars.filter( // Autos desde la API
		const results = CARS.filter(
			(car) =>
				(locationCity === "" || car.locationCity === locationCity) &&
				(brand === "" || car.brand === brand)
		);
		setFilteredCars(results);
	};

	const handleShowAllCars = () => {
		setLocationCity("");
		setBrand("");
		setShowAllCars(false);
		setFilteredCars(randomCars);
		changePage(1);
	};

	const cardsPerPage = 9;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;

	const changePage = (newPage) => {
		setIsAnimating(true);
		setTimeout(() => {
			setCurrentPage(newPage);
			setIsAnimating(false);
		}, 300);
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
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
			<section className={`section ${styles.carDetails}`}>
				<h2>Automóviles</h2>
				<div className="container">
					<div className={styles.carDetailsContainer}>
						<div className={styles.carDetailsSearch}>
							<CarDetailsSearch
								handleSearch={handleSearch}
								locations={locations}
								brands={brands}
								locationCity={locationCity}
								setLocationCity={setLocationCity}
								brand={brand}
								setBrand={setBrand}
							/>
						</div>
						{filteredCars.length === 0 && !showAllCars ? (
							<CarDetailsNoResults handleShowAllCars={handleShowAllCars} />
						) : (
							<CarDetailsCards
								cars={
									showAllCars
										? randomCars.slice(indexOfFirstCard, indexOfLastCard)
										: filteredCars.slice(indexOfFirstCard, indexOfLastCard)
								}
								cardsPerPage={cardsPerPage}
								currentPage={currentPage}
								isAnimating={isAnimating}
							/>
						)}
					</div>
					<CarDetailsPagination
						cars={showAllCars ? randomCars : filteredCars}
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
