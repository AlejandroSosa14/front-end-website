import styles from "./CategoryCard.module.css";

const CategoryCard = ({ name, image, total }) => {
	return (
		<div>
			<div className={styles.categoryCardImage}>
				<img src={image} alt={`Imagen de ${name}`} />
			</div>
			<h3>{name}</h3>
			<p>{total} modelos</p>
		</div>
	);
};

export default CategoryCard;
