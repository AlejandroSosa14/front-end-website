import styles from "./CategoryCard.module.css";

const CategoryCard = ({ name, image, description }) => {
	return (
		<div>
			<div className={styles.categoryCardImage}>
				<img src={image} alt={`Imagen de un auto ${name}`} />
			</div>
			<h3>{name}</h3>
			<p>{description}</p>
		</div>
	);
};

export default CategoryCard;
