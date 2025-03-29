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
	const [response, setResponse] = useState(null);

	const cardsPerPage = 9;

	useEffect(() => {
		setLoading(true);
		window.scrollTo({ top: 0, behavior: "smooth" });

		const fetchData = async () => {
			try {
				const res = await getCars(currentPage - 1, cardsPerPage);
				setResponse(res);
				if (res && res.content) {
					setTotalPages(res.totalPages);
				} else {
					setTotalPages(0);
				}
			} catch (error) {
				console.error("Error fetching cars:", error);
				setTotalPages(0);
			} finally {
				setIsAnimating(false);
				setLoading(false);
			}
		};

		setIsAnimating(true);
		fetchData();
	}, [searchParams, currentPage, cardsPerPage]);

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

	const filteredCarsMemo = useMemo(() => {
		if (!response || !response.content) return [];

		const filterByBrand = (car) =>
			normalizedBrand === "" || normalizeText(car.brand) === normalizedBrand;
		const filterByLocationCity = (car) =>
			normalizedLocationCity === "" || normalizeText(car.locationCity) === normalizedLocationCity;
		const filterByCategory = (car) =>
			normalizedCategory === "" || normalizeText(car.category.name) === normalizedCategory;
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

		return response.content.filter((car) => filters.every((filter) => filter(car)));
	}, [
		response,
		normalizedBrand,
		normalizedLocationCity,
		normalizedCategory,
		normalizedSearchTerm,
		startDate,
		endDate,
	]);

	const handleShowAllCars = async () => {
		setIsAnimating(true);
		setLoading(true);

		try {
			const res = await getCars(0, cardsPerPage);
			setResponse(res);
			if (res && res.content) {
				setSearchParams({});
				setCurrentPage(1);
				setTotalPages(res.totalPages);
			} else {
				setTotalPages(0);
			}
		} catch (error) {
			console.error("Error fetching all cars:", error);
			setTotalPages(0);
		} finally {
			setIsAnimating(false);
			setLoading(false);
		}
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
						) : filteredCarsMemo.length === 0 ? (
							<div className={cardGrid.carDetailsGrid}>
								<CarDetailsNoResults handleShowAllCars={handleShowAllCars} />
							</div>
						) : (
							<CarDetailsCards
								cars={filteredCarsMemo}
								cardsPerPage={cardsPerPage}
								currentPage={currentPage}
								isAnimating={isAnimating}
							/>
						)}
					</div>

					{!loading && filteredCarsMemo.length > 0 && (
						<CarDetailsPagination
							cardsPerPage={cardsPerPage}
							currentPage={currentPage}
							changePage={handlePageChange}
							setIsAnimating={setIsAnimating}
							setIsLoading={setLoading}
							totalPages={totalPages}
						/>
					)}
				</div>
			</section>
		</Layout>
	);
};

export default CarDetails;
