import ArrowLeft from "../svgIcons/ArrowLeft";
import ArrowsLeft from "../svgIcons/ArrowsLeft";
import ArrowRight from "../svgIcons/ArrowRight";
import ArrowsRight from "../svgIcons/ArrowsRight";

import styles from "./CarDetailsPagination.module.css";

const CarDetailsPagination = ({
	cars,
	cardsPerPage,
	currentPage,
	handlePrevPage,
	handleNextPage,
	changePage,
	scrollToTop,
}) => {
	const totalPages = Math.ceil(cars.length / cardsPerPage) || 1;

	const handleFirstPage = () => {
		changePage(1);
		scrollToTop();
	};

	const handleLastPage = () => {
		changePage(totalPages);
		scrollToTop();
	};

	return (
		<div className={styles.carDetailsPagination}>
			<button onClick={() => handleFirstPage()} title="Primera">
				<ArrowsLeft />
			</button>
			<button onClick={handlePrevPage} title="Anterior">
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
			<button onClick={handleNextPage} title="Siguiente">
				<ArrowRight />
			</button>
			<button onClick={() => handleLastPage()} title="Última">
				<ArrowsRight />
			</button>
		</div>
	);
};

export default CarDetailsPagination;
