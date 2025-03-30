import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { getCars } from "../api/cars.js";
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
	const [currentPage, setCurrentPage] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [allCars, setAllCars] = useState([]); // Estado para almacenar todos los autos
	const [filteredCars, setFilteredCars] = useState([]);

	const cardsPerPage = 9;

	useEffect(() => {
		setLoading(true);
		window.scrollTo({ top: 0, behavior: "smooth" });

		const fetchAllCars = async () => {
			try {
				let page = 0;
				let size = 10; // Tamaño de página inicial
				let fetchedCars = [];
				let totalPagesFromApi = 1;

				while (page < totalPagesFromApi) {
					const res = await getCars(page, size);
					if (res && res.content) {
						fetchedCars = fetchedCars.concat(res.content);
						totalPagesFromApi = res.totalPages;
						page++;
					} else {
						totalPagesFromApi = 0;
					}
				}
				setAllCars(fetchedCars);
			} catch (error) {
				console.error("Error fetching all cars:", error);
				setAllCars([]);
			} finally {
				setIsAnimating(false);
				setLoading(false);
			}
		};

		setIsAnimating(true);
		fetchAllCars();
	}, [searchParams]);

	const normalizedBrand = useMemo(
		() => normalizeText(searchParams.get("brand") || ""),
		[searchParams]
	);
	const normalizedLocationCity = useMemo(
		() => normalizeText(searchParams.get("locationCity") || ""),
		[searchParams]
	);
	const normalizedCategory = useMemo(
		() => normalizeText(searchParams.get("category") || ""),
		[searchParams]
	);
	const normalizedSearchTerm = useMemo(
		() => normalizeText(searchParams.get("searchTerm") || ""),
		[searchParams]
	);
	const startDate = useMemo(() => searchParams.get("startDate") || "", [searchParams]);
	const endDate = useMemo(() => searchParams.get("endDate") || "", [searchParams]);

	useEffect(() => {
		const filterByBrand = (car) =>
			normalizedBrand === "" || normalizeText(car.brand) === normalizedBrand;
		const filterByLocationCity = (car) =>
			normalizedLocationCity === "" || normalizeText(car.locationCity) === normalizedLocationCity;
		const filterByCategory = (car) =>
			normalizedCategory === "" || normalizeText(car.category?.name) === normalizedCategory;
		const filterBySearchTerm = (car) =>
			normalizedSearchTerm === "" ||
			Object.values(car).some((value) =>
				normalizeText(String(value)).includes(normalizedSearchTerm)
			);
		const filterByStartDate = (car) =>
			startDate === "" || new Date(car.postDate) >= new Date(startDate);
		const filterByEndDate = (car) => endDate === "" || new Date(car.postDate) <= new Date(endDate);

		const filters = [
			filterByBrand,
			filterByLocationCity,
			filterByCategory,
			filterBySearchTerm,
			filterByStartDate,
			filterByEndDate,
		];

		const filtered = allCars.filter((car) => filters.every((filter) => filter(car)));
		setFilteredCars(filtered);
		setTotalPages(Math.ceil(filtered.length / cardsPerPage)); // Cálculo de totalPages en el frontend
	}, [
		allCars,
		normalizedBrand,
		normalizedLocationCity,
		normalizedCategory,
		normalizedSearchTerm,
		startDate,
		endDate,
		cardsPerPage,
	]);

	const handleShowAllCars = () => {
		setSearchParams({});
		setCurrentPage(1);
	};

	const handlePageChange = (newPage) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setIsAnimating(true);
		setLoading(true);
		setTimeout(() => {
			setCurrentPage(newPage);
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
								cars={filteredCars.slice(
									(currentPage - 1) * cardsPerPage,
									currentPage * cardsPerPage
								)}
								isAnimating={isAnimating}
							/>
						)}
					</div>

					{!loading && filteredCars.length > 0 && (
						<CarDetailsPagination
							currentPage={currentPage}
							changePage={handlePageChange}
							totalPages={totalPages}
						/>
					)}
				</div>
			</section>
		</Layout>
	);
};

export default CarDetails;
