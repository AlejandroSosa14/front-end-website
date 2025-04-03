import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import CategoryCard from "../carCards/CategoryCard";
import { normalizeText } from "../../utils/textUtils";
import SearchCarContext from "../../context/SearchCarContext";

const Categories = () => {
	const navigate = useNavigate();
	const [startCardIndex, setStartCardIndex] = useState(0);
	const [visibleCards, setVisibleCards] = useState(1);
	const [gap, setGap] = useState(15);

	const { uniqueCategories, loading, error } = useContext(SearchCarContext);

	useEffect(() => {
		const updateVisibleCards = () => {
			const width = window.innerWidth;

			if (width < 768) {
				setVisibleCards(1);
				setGap(1);
			} else if (width >= 768 && width < 1024) {
				setVisibleCards(2);
				setGap(9);
			} else if (width >= 1024 && width < 1280) {
				setVisibleCards(3);
				setGap(13);
			} else {
				setVisibleCards(4);
			}
		};

		updateVisibleCards();
		window.addEventListener("resize", updateVisibleCards);
		return () => window.removeEventListener("resize", updateVisibleCards);
	}, []);

	const handleNextBtn = () => {
		setStartCardIndex((prev) => Math.min(prev + 1, uniqueCategories.length - visibleCards));
	};

	const handlePrevBtn = () => {
		setStartCardIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleCategoryClick = (categoryName) => {
		const normalizedCategory = normalizeText(categoryName);
		navigate(`/detalle-autos?category=${encodeURIComponent(normalizedCategory)}`);
	};

	if (loading) return <p>Cargando categorías...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<section className={styles.categories}>
			<h2 className="sectionTitle">Categorías</h2>
			<div className={styles.categoriesCarrousel}>
				<button
					className={`${styles.categoriesNavButton} ${styles.categoriesPrevBtn}`}
					onClick={handlePrevBtn}
					disabled={startCardIndex === 0}>
					&lt;
				</button>

				<div className={styles.categoriesCards}>
					{uniqueCategories.length > 0 ? (
						uniqueCategories.map((category) => (
							<div
								key={category.id}
								className={styles.categoriesCard}
								style={{
									transform: `translateX(calc(-${startCardIndex * 100}% - (${
										gap * startCardIndex
									}px)))`,
									flex: `0 0 calc(${100 / visibleCards}% - (${gap}px - ${visibleCards}px))`,
								}}>
								<CategoryCard
									name={category.name}
									image={category.image || "/images/categories/generic_car.webp"}
									description={category.description || "Descripción no disponible."}
								/>
								<div className={styles.categoriesCardContent}>
									<button
										className={styles.categoriesCardLink}
										onClick={(e) => {
											e.stopPropagation();
											handleCategoryClick(category.name);
										}}>
										Ver autos de la categoría {category.name}
									</button>
								</div>
							</div>
						))
					) : (
						<p>No hay categorías disponibles</p>
					)}
				</div>

				<button
					className={`${styles.categoriesNavButton} ${styles.categoriesNextBtn}`}
					onClick={handleNextBtn}
					disabled={startCardIndex + visibleCards >= uniqueCategories.length}>
					&gt;
				</button>
			</div>
		</section>
	);
};

export default Categories;
