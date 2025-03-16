import styles from "./CarCard_V1V2V3.module.css";

const CarCard_V3 = ({ title, children }) => {
	return (
		<div className={styles.card}>
			<div className={styles.cardContent}>
				<h3 className={styles.cardContent_specsTitle}>{title}</h3>
				{children}
			</div>
		</div>
	);
};

export default CarCard_V3;
