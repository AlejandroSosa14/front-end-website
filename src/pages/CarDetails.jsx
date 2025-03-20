import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Layout from "../components/layout/Layout";

import CARS from "../data/cars.js";

import CardSkeletonV1 from "../components/ui/CardSkeletonV1.jsx";
import FormSearch from "../components/search/FormSearch.jsx";
import CarDetailsCards from "../components/carDetails/CarDetailsCards.jsx";
import CarDetailsNoResults from "../components/carDetails/CarDetailsNoResults.jsx";
import CarDetailsPagination from "../components/carDetails/CarDetailsPagination.jsx";

import { normalizeText } from "../utils/textUtils.js";

import styles from "./CarDetails.module.css";
import cardGrid from "../components/carDetails/CarDetailsCards.module.css";
import PageTitle from "../components/pageTitle/PageTitle.jsx";

const CarDetails = () => {
	const [filteredCars, setFilteredCars] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);

	const cardsPerPage = 9;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;

	useEffect(() => {
		setLoading(true);
		window.scrollTo({ top: 0, behavior: "smooth" });

		const brand = searchParams.get("brand") || "";
		const locationCity = searchParams.get("locationCity") || "";
		const carBody = searchParams.get("carBody") || "";
		const searchTerm = searchParams.get("searchTerm") || "";
		const startDate = searchParams.get("startDate") || "";
		const endDate = searchParams.get("endDate") || "";

		const normalizedBrand = normalizeText(brand);
		const normalizedLocationCity = normalizeText(locationCity);
		const normalizedCarBody = normalizeText(carBody);
		const normalizedSearchTerm = normalizeText(searchTerm);

		const results = CARS.filter((car) => {
			const matchesBrand = normalizedBrand === "" || normalizeText(car.brand) === normalizedBrand;
			const matchesLocationCity =
				normalizedLocationCity === "" || normalizeText(car.locationCity) === normalizedLocationCity;
			const matchesCarBody =
				normalizedCarBody === "" || normalizeText(car.carBody) === normalizedCarBody;

			const matchesSearchTerm =
				normalizedSearchTerm === "" ||
				Object.values(car).some((value) =>
					normalizeText(String(value)).includes(normalizedSearchTerm)
				);

			const matchesStartDate = startDate === "" || new Date(car.postDate) >= new Date(startDate);
			const matchesEndDate = endDate === "" || new Date(car.postDate) <= new Date(endDate);

			return (
				matchesBrand &&
				matchesLocationCity &&
				matchesCarBody &&
				matchesSearchTerm &&
				matchesStartDate &&
				matchesEndDate
			);
		});

		const randomResults = results.sort(() => Math.random() - 0.5);
		setIsAnimating(true);
		setLoading(true);

		setTimeout(() => {
			setFilteredCars(randomResults);
			setCurrentPage(1);
			setIsAnimating(false);
			setLoading(false);
		}, 500);
	}, [searchParams]);

	const handleShowAllCars = () => {
		const randomCars = [...CARS].sort(() => Math.random() - 0.5);
		setIsAnimating(true);
		setLoading(true);

		setTimeout(() => {
			setSearchParams({});
			setFilteredCars(randomCars);
			setCurrentPage(1);
			setIsAnimating(false);
		}, 500);
	};

	const changePage = (newPage) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setIsAnimating(true);
		setLoading(true);
		setTimeout(() => {
			setCurrentPage(newPage);
			setIsAnimating(false);
			setLoading(false);
		}, 500);
	};

	return (
		<Layout>
			<section className={styles.carDetails}>
				<PageTitle title={"Automóviles"} />
				<div className="container">
					<div className={styles.carDetailsContainer}>
						<div className={styles.carDetailsSearch}>
							<h3>Búsqueda</h3>
							<FormSearch />
						</div>
						{loading ? (
							<div className={cardGrid.carDetailsGrid}>
								{Array.from({ length: 6 }).map((_, index) => (
									<CardSkeletonV1 key={index} />
								))}
							</div>
						) : filteredCars.length === 0 ? (
							<div className={cardGrid.carDetailsGrid}>
								<CarDetailsNoResults handleShowAllCars={handleShowAllCars} />
							</div>
						) : (
							<CarDetailsCards
								cars={filteredCars.slice(indexOfFirstCard, indexOfLastCard)}
								cardsPerPage={cardsPerPage}
								currentPage={currentPage}
								isAnimating={isAnimating}
							/>
						)}
					</div>

					{!loading && filteredCars.length > 0 && (
						<CarDetailsPagination
							cars={filteredCars}
							cardsPerPage={cardsPerPage}
							currentPage={currentPage}
							changePage={changePage}
							setIsAnimating={setIsAnimating}
							setIsLoading={setLoading}
						/>
					)}
				</div>
			</section>
		</Layout>
	);
};

export default CarDetails;
