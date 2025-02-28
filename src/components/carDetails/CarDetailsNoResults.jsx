import styles from "./CarDetailsNoResults.module.css";

const CarDetailsNoResults = ({ handleShowAllCars }) => {
	return (
		<div className={`${styles.noResults} ${styles.visible}`}>
			<b>No se encontraron autos que coincidan con los filtros seleccionados.</b>
			<button onClick={handleShowAllCars} className="main-btn">
				Regresar
			</button>
		</div>
	);
};

export default CarDetailsNoResults;
