import { useState, useEffect } from "react";
import styles from "./Categories.module.css";

// Datos de ejemplo (se reemplazarán con datos reales)
const carsByBrand = [
	{
		id: 1,
		brand: "Mercedes Benz",
		image:
			"https://w7.pngwing.com/pngs/329/482/png-transparent-2010-mercedes-benz-glk-class-2015-mercedes-benz-glk-class-2011-mercedes-benz-glk-class-2013-mercedes-benz-glk-class-mercedes-car-love-compact-car-vehicle-thumbnail.png",
	},
	{
		id: 2,
		brand: "BMW",
		image:
			"https://w7.pngwing.com/pngs/998/989/png-transparent-2018-bmw-x6-m-suv-car-bmw-6-series-bmw-x4-bmw-compact-car-car-performance-car-thumbnail.png",
	},
	{
		id: 3,
		brand: "Volvo",
		image:
			"https://w7.pngwing.com/pngs/302/988/png-transparent-volvo-cars-volvo-v40-volvo-xc40-t3-volvo-compact-car-car-vehicle-thumbnail.png",
	},
	{
		id: 4,
		brand: "Fiat",
		image:
			"https://w7.pngwing.com/pngs/756/875/png-transparent-fiat-automobiles-car-fiat-strada-fiat-argo-fiat-mobi-car-compact-car-sedan-car-thumbnail.png",
	},
	{
		id: 5,
		brand: "Nissan",
		image:
			"https://w7.pngwing.com/pngs/621/591/png-transparent-2017-nissan-maxima-2016-nissan-maxima-car-front-wheel-drive-nissan-car-compact-car-sedan-driving-thumbnail.png",
	},
	{
		id: 6,
		brand: "Kia",
		image:
			"https://w7.pngwing.com/pngs/155/632/png-transparent-white-kia-suv-2016-kia-sportage-2015-kia-sportage-2017-kia-sportage-car-kia-compact-car-vehicle-transport-thumbnail.png",
	},
	{
		id: 7,
		brand: "Honda",
		image:
			"https://w7.pngwing.com/pngs/801/997/png-transparent-2017-honda-civic-2018-honda-civic-honda-city-honda-today-honda-compact-car-glass-sedan-thumbnail.png",
	},
];

const Categories = () => {
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
		setStartCardIndex((prevIndex) => Math.min(prevIndex + 1, carsByBrand.length - visibleCards));
	};

	const handlePrevBtn = () => {
		setStartCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
					{carsByBrand.map((car) => (
						<div
							key={car.id}
							className={styles.categoriesCard}
							style={{
								transform: `translateX(calc(-${
									startCardIndex * 100
								}% - (${gapTranslate}*${startCardIndex}px)))`,
								flex: `0 0 calc(${100 / visibleCards}% - (${gap}px - ${visibleCards}px))`,
							}}>
							<div className={styles.categoriesCardImage}>
								<img src={car.image} alt={`${car.brand} ${car.model}`} />
							</div>
							<div className={styles.categoriesCardContent}>
								<h3>{car.brand}</h3>
								<a className={styles.categoriesCardLink} href="#">
									Ver autos de {car.brand}
								</a>
							</div>
						</div>
					))}
				</div>
				{/* Next Button */}
				<button
					className={`${styles.categoriesNavButton} ${styles.categoriesNextBtn}`}
					onClick={handleNextBtn}
					disabled={startCardIndex + visibleCards >= carsByBrand.length}>
					&gt;
				</button>
			</div>
		</section>
	);
};

export default Categories;
