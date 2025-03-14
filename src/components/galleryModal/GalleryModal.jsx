import { useState, useEffect, useCallback } from "react";

import ArrowLeft from "../svgIcons/ArrowLeft";
import ArrowRight from "../svgIcons/ArrowRight";
import Close from "../svgIcons/Close";

import styles from "./GalleryModal.module.css";

const GalleryModal = ({ images, onClose }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isClosing, setIsClosing] = useState(false);

	const imagesLength = images.length;

	const handlePrev = useCallback(() => {
		setCurrentIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
	}, [imagesLength]);

	const handleNext = useCallback(() => {
		setCurrentIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
	}, [imagesLength]);

	const handleClose = useCallback(() => {
		setIsClosing(true);
		setTimeout(onClose, 300);
	}, [onClose]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "ArrowLeft") handlePrev();
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "Escape") handleClose();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handlePrev, handleNext, handleClose]);

	return (
		<div className={styles.modalOverlay} onClick={handleClose}>
			<div
				className={`${styles.modalContent} ${isClosing ? styles.modalClosing : ""}`}
				onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={handleClose}>
					<Close />
				</button>
				<button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev}>
					<ArrowLeft />
				</button>
				<img
					src={images[currentIndex]}
					alt={`Imagen ${currentIndex + 1}`}
					className={styles.image}
				/>
				<button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext}>
					<ArrowRight />
				</button>
			</div>
		</div>
	);
};

export default GalleryModal;
