import { useState } from "react";
import styles from "./CarDetail.module.css";
import Layout from "../components/layout/Layout";

// Datos de ejemplo del auto (puedes obtenerlos de una API o props)
const car = {
	id: 1,
	brand: "Toyota",
	model: "Corolla",
	year: 2022,
	description: "Un auto confiable y eficiente.",
	images: [
		"/src/assets/images/mazda-cx-3.png",
		"/src/assets/images/mazda-cx-3.png",
		"/src/assets/images/mazda-cx-3.png",
		"/src/assets/images/mazda-cx-3.png",
	],
};

const CarDetail = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual

	// Función para cambiar la imagen principal al hacer clic en una miniatura
	const handleThumbnailClick = (index) => {
		setCurrentImageIndex(index);
	};

	// Función para navegar a la imagen anterior
	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? car.images.length - 1 : prevIndex - 1));
	};

	// Función para navegar a la siguiente imagen
	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === car.images.length - 1 ? 0 : prevIndex + 1));
	};

	return (
		<Layout>
			<section className="section">
				<div className="container">
					<div className={styles.carDetail}>
						{/* Columna izquierda: Galería de imágenes */}
						<div className={styles.carDetailGallery}>
							{/* Imagen principal */}
							<div className={styles.mainImageContainer}>
								<img
									src={car.images[currentImageIndex]}
									alt={`${car.brand} ${car.model}`}
									className={styles.mainImage}
								/>
								{/* Botones de navegación */}
								<button className={styles.navButtonLeft} onClick={handlePrevImage}>
									&lt;
								</button>
								<button className={styles.navButtonRight} onClick={handleNextImage}>
									&gt;
								</button>
							</div>
							{/* Miniaturas */}
							<div className={styles.thumbnails}>
								{car.images.slice(0, 3).map((image, index) => (
									<img
										key={index}
										src={image}
										alt={`Miniatura ${index + 1}`}
										className={`${styles.thumbnail} ${
											index === currentImageIndex ? styles.active : ""
										}`}
										onClick={() => handleThumbnailClick(index)}
									/>
								))}
							</div>
						</div>

						{/* Columna derecha: Detalles del auto */}
						<div className={styles.carDetailInfo}>
							<div className={styles.carDetailData}>Car Data</div>
							<div className={styles.carDetailSpecs}>Car Specs</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CarDetail;
