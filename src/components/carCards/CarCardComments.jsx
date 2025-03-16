import StarRating from "../svgIcons/StarRating";

import styles from "./CarCardComments.module.css";

const CarCardComments = ({ userComments }) => {
	return (
		<div className={styles.cardComments_container}>
			{userComments.length > 0 ? (
				userComments.map((comment) => (
					<div key={comment.id} className={styles.cardComments_card}>
						<div className={styles.cardComments_cardHeader}>
							<h4>{comment.user}</h4>
							<div className={styles.cardComments_cardRating}>
								<span>{comment.rating}</span>
								<StarRating fillPercentage={(comment.rating / 5) * 100} color={"var(--golden)"} />
							</div>
						</div>
						<p className={styles.cardComments_comments}>{comment.comment}</p>
					</div>
				))
			) : (
				<p className={styles.cardComments_noData}>No hay opiniones para este auto.</p>
			)}
		</div>
	);
};

export default CarCardComments;
