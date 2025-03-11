import styles from "./CardSkeletonV1.module.css";

const CardSkeletonV1 = () => {
	return (
		<div className={styles.cardSkeleton}>
			<div className={styles.cardSkeleton_image}></div>
			<div className={styles.cardSkeleton_header}></div>
			<div className={styles.cardSkeleton_scores}></div>
			<div className={styles.cardSkeleton_location}></div>
			<div className={styles.cardSkeleton_rental}></div>
		</div>
	);
};

export default CardSkeletonV1;
