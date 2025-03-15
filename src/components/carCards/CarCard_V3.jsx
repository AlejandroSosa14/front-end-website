import styles from "./CarCard_V1V2V3.module.css";

const CarCard_V3 = ({ specs }) => {
	return (
		<div className={styles.card}>
			<div className={styles.cardContent}>
				<h3 className={styles.cardContent_specsTitle}>Especificaciones</h3>
				<ul className={styles.cardContent_specsList}>
					{specs.length > 0 ? (
						specs.map((spec) => (
							<li key={spec.id} className={styles.cardContent_specsItem}>
								<img src={spec.icon} alt={spec.detail} />
								<p>
									<span>{spec.type}:</span> {spec.detail}
								</p>
							</li>
						))
					) : (
						<p className={styles.cardContent_noData}>No hay especificaciones para éste auto.</p>
					)}
				</ul>
			</div>
		</div>
	);
};

export default CarCard_V3;
