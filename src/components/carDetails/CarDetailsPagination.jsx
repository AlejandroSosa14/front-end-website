import ArrowLeft from "../svgIcons/ArrowLeft";
import ArrowsLeft from "../svgIcons/ArrowsLeft";
import ArrowRight from "../svgIcons/ArrowRight";
import ArrowsRight from "../svgIcons/ArrowsRight";

import styles from "./CarDetailsPagination.module.css";

const CarDetailsPagination = ({
	cars,
	cardsPerPage,
	currentPage,
	changePage,
	setIsAnimating,
	setIsLoading,
}) => {
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	const totalPages = Math.ceil(cars.length / cardsPerPage) || 1;

	const handlePrevPage = () => {
		if (currentPage > 1) changePage(currentPage - 1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) changePage(currentPage + 1);
	};

	const handleChangePage = (newPage) => {
		scrollToTop();
		setIsAnimating(true);
		setIsLoading(true);
		setTimeout(() => {
			changePage(newPage);
			setIsLoading(false);
			setIsAnimating(false);
		}, 1000);
	};

	return (
		<div className={styles.carDetailsPagination}>
			<button onClick={() => handleChangePage(1)} title="Primera" disabled={currentPage === 1}>
				<ArrowsLeft />
			</button>
			<button onClick={() => handlePrevPage()} title="Anterior" disabled={currentPage === 1}>
				<ArrowLeft />
			</button>
			{[...Array(totalPages).keys()].map((page) => (
				<a
					key={page + 1}
					href="#"
					onClick={(e) => {
						e.preventDefault();
						changePage(page + 1);
						scrollToTop();
					}}
					style={{
						fontWeight: currentPage === page + 1 ? "bold" : "normal",
						color: currentPage === page + 1 ? "var(--main-color)" : "#333",
					}}>
					{page + 1}
				</a>
			))}
			<button
				onClick={() => handleNextPage()}
				title="Siguiente"
				disabled={currentPage === totalPages}>
				<ArrowRight />
			</button>
			<button
				onClick={() => handleChangePage(totalPages)}
				title="Última"
				disabled={currentPage === totalPages}>
				<ArrowsRight />
			</button>
		</div>
	);
};

export default CarDetailsPagination;
