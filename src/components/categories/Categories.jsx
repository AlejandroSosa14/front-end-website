import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import CategoryCard from "../carCards/CategoryCard";

import { normalizeText } from "../../utils/textUtils";

import { getUniqueCategories as fetchUniqueCategories } from "../../api/cars";

const Categories = () => {
	const navigate = useNavigate();
	const [uniqueCategories, setUniqueCategories] = useState([]);
	const [startCardIndex, setStartCardIndex] = useState(0);
	const [visibleCards, setVisibleCards] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [gap, setGap] = useState(15);
	const gapTranslate = 15;

	const updateVisibleCards = () => {
		const width = window.innerWidth;

		if (width < 768) {
			setVisibleCards(1); // Smartphones: 1 card
			setGap(1);
		} else if (width >= 768 && width < 1024) {
			setVisibleCards(2); // Tablets: 2 cards
			setGap(9);
		} else if (width >= 1024 && width < 1280) {
			setVisibleCards(3); // Monitores < 1280px: 3 cards
			setGap(13);
		} else {
			setVisibleCards(4); // Monitores >= 1280px: 4 cards
		}
	};

	useEffect(() => {
		const fetchCarsAndExtractCategories = async () => {
			setLoading(true);
			try {
				const uniqueCategoriesData = await fetchUniqueCategories();
				setUniqueCategories(uniqueCategoriesData);
			} catch (err) {
				setError(err.message || "Error al cargar las categorías.");
			} finally {
				setLoading(false);
			}
		};
		fetchCarsAndExtractCategories();
		updateVisibleCards();
		window.addEventListener("resize", updateVisibleCards);
		return () => window.removeEventListener("resize", updateVisibleCards);
	}, []);

	const handleNextBtn = () => {
		setStartCardIndex((prevIndex) =>
			Math.min(prevIndex + 1, uniqueCategories.length - visibleCards)
		);
	};

	const handlePrevBtn = () => {
		setStartCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const handleCategoryClick = (categoryName) => {
		const normalizedCategory = normalizeText(categoryName);
		navigate(`/detalle-autos?category=${encodeURIComponent(normalizedCategory)}`);
	};

	if (loading) {
		return <p>Cargando categorías...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<section className={styles.categories}>
			<h2 className="sectionTitle">Categorías</h2>
			<div className={styles.categoriesCarrousel}>
				{/* Previous Button */}
				<button
					className={`${styles.categoriesNavButton} ${styles.categoriesPrevBtn}`}
					onClick={handlePrevBtn}
					disabled={startCardIndex === 0}>
					&lt;
				</button>

				{/* Cards Gallery*/}
				<div className={styles.categoriesCards}>
					{uniqueCategories.map((category) => (
						<div
							key={category.id}
							className={styles.categoriesCard}
							style={{
								transform: `translateX(calc(-${
									startCardIndex * 100
								}% - (${gapTranslate}*${startCardIndex}px)))`,
								flex: `0 0 calc(${100 / visibleCards}% - (${gap}px - ${visibleCards}px))`,
							}}>
							<CategoryCard
								name={category.name}
								image={category.image}
								description={category.description}
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
					))}
				</div>

				{/* Next Button */}
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
