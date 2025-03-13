import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import CategoryCard from "../carCards/CategoryCard";

import { normalizeText } from "../../utils/textUtils";

// Datos de ejemplo (se reemplazarán con datos reales)
const CATEGORIES = [
	{
		id: 1,
		carBody: "Sedán",
		total: 10,
		image: "/src/assets/images/categories/sedan.webp",
	},
	{
		id: 2,
		carBody: "SUV",
		total: 15,
		image: "/src/assets/images/categories/suv.webp",
	},
	{
		id: 3,
		carBody: "Pickup",
		total: 5,
		image: "/src/assets/images/categories/pickup.webp",
	},
	{
		id: 4,
		carBody: "Coupé",
		total: 7,
		image: "/src/assets/images/categories/coupe.webp",
	},
	{
		id: 5,
		carBody: "Hatchback",
		total: 12,
		image: "/src/assets/images/categories/hatchback.webp",
	},
	{
		id: 6,
		carBody: "Deportivo",
		total: 3,
		image: "/src/assets/images/categories/sport.webp",
	},
	{
		id: 7,
		carBody: "Minivan",
		total: 4,
		image: "/src/assets/images/categories/minivan.webp",
	},
	{
		id: 8,
		carBody: "Familiar",
		total: 8,
		image: "/src/assets/images/categories/familiar.webp",
	},
];

const Categories = () => {
	const navigate = useNavigate();
	const [startCardIndex, setStartCardIndex] = useState(0);
	const [visibleCards, setVisibleCards] = useState(1);
	const [gap, setGap] = useState(15);
	const gapTranslate = 15;

	// Función para actualizar el número de tarjetas visibles según el ancho de la pantalla
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

	// Actualizar el número de tarjetas visibles al cargar la página
	useEffect(() => {
		updateVisibleCards();
		window.addEventListener("resize", updateVisibleCards);
		return () => window.removeEventListener("resize", updateVisibleCards); // Limpiar evento
	}, []);

	const handleNextBtn = () => {
		setStartCardIndex((prevIndex) => Math.min(prevIndex + 1, CATEGORIES.length - visibleCards));
	};

	const handlePrevBtn = () => {
		setStartCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const handleCategoryClick = (carBody) => {
		const normalizedCarBody = normalizeText(carBody);
		navigate(`/detalle-autos?carBody=${encodeURIComponent(normalizedCarBody)}`);
	};

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
					{CATEGORIES.map((car) => (
						<div
							key={car.id}
							className={styles.categoriesCard}
							style={{
								transform: `translateX(calc(-${
									startCardIndex * 100
								}% - (${gapTranslate}*${startCardIndex}px)))`,
								flex: `0 0 calc(${100 / visibleCards}% - (${gap}px - ${visibleCards}px))`,
							}}
							onClick={() => handleCategoryClick(car.carBody)}>
							<CategoryCard name={car.carBody} image={car.image} total={car.total} />
							<div className={styles.categoriesCardContent}>
								<button
									className={styles.categoriesCardLink}
									onClick={(e) => {
										e.stopPropagation();
										handleCategoryClick(car.carBody);
									}}>
									Ver autos {car.carBody}
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Next Button */}
				<button
					className={`${styles.categoriesNavButton} ${styles.categoriesNextBtn}`}
					onClick={handleNextBtn}
					disabled={startCardIndex + visibleCards >= CATEGORIES.length}>
					&gt;
				</button>
			</div>
		</section>
	);
};

export default Categories;
