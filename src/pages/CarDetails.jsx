import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import SearchCarContext from "../context/SearchCarContext";
import Layout from "../components/layout/Layout";
import CardSkeletonV1 from "../components/ui/CardSkeletonV1.jsx";
import FormSearch from "../components/search/FormSearch.jsx";
import CarDetailsCards from "../components/carDetails/CarDetailsCards.jsx";
import CarDetailsNoResults from "../components/carDetails/CarDetailsNoResults.jsx";
import CarDetailsPagination from "../components/carDetails/CarDetailsPagination.jsx";
import styles from "./CarDetails.module.css";
import cardGrid from "../components/carDetails/CarDetailsCards.module.css";
import PageTitle from "../components/pageTitle/PageTitle.jsx";

const CarDetails = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [loadingForm, setLoadingForm] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const { filteredCars, filterCars, uniqueBrands, uniqueLocations } = useContext(SearchCarContext);
	const navigate = useNavigate();
	const prevSearchParams = useRef(null);

	const cardsPerPage = 9;
	const startIndex = (currentPage - 1) * cardsPerPage;
	const endIndex = startIndex + cardsPerPage;
	const currentCars = filteredCars.slice(startIndex, endIndex);

	useEffect(() => {
		setLoading(true);
		window.scrollTo({ top: 0, behavior: "smooth" });
		setTimeout(() => {
			setLoading(false);
			setIsAnimating(false);
		}, 500);
	}, [searchParams, currentPage]);

	useEffect(() => {
		setTotalPages(Math.ceil(filteredCars.length / cardsPerPage));
	}, [filteredCars]);

	useEffect(() => {
		if (uniqueBrands.length > 0 && uniqueLocations.length > 0) {
			setLoadingForm(false);
		}
	}, [uniqueBrands, uniqueLocations]);

	useEffect(() => {
		const categoryFilter = searchParams.get("category");
		if (prevSearchParams.current?.get("category") !== categoryFilter) {
			filterCars({ category: categoryFilter });
			prevSearchParams.current = searchParams;
		}
	}, [searchParams, filterCars]); // Se agrega filterCars como dependencia

	const handleShowAllCars = () => {
		setSearchParams({});
		setCurrentPage(1);
		filterCars({});
		navigate("/detalle-autos");
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
							{!loadingForm && (
								<FormSearch
									brands={uniqueBrands}
									locations={uniqueLocations}
									onSearch={filterCars}
								/>
							)}
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
							<CarDetailsCards cars={currentCars} isAnimating={isAnimating} />
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
