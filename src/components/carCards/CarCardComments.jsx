import StarRating from "../svgIcons/StarRating";

import styles from "./CarCardComments.module.css";

const CarCardComments = ({ userScores }) => {
	return (
		<div className={styles.cardComments_container}>
			{userScores.map((score) => (
				<div key={score.id} className={styles.cardComments_card}>
					<div className={styles.cardComments_cardHeader}>
						<h4>{score.userName}</h4>
						<div className={styles.cardComments_cardRating}>
							<span>{score.userRating}</span>
							<StarRating fillPercentage={(score.rating / 5) * 100} color={"var(--golden)"} />
						</div>
					</div>
					<p className={styles.cardComments_comments}>{score.comment}</p>
				</div>
			))}
		</div>
	);
};

export default CarCardComments;
