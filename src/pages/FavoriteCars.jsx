import Layout from "../components/layout/Layout";
import PageTitle from "../components/pageTitle/PageTitle";

import styles from "./FavoriteCars.module.css";

const FavoriteCars = () => {
	return (
		<Layout>
			<PageTitle title={"Mis autos favoritos"} />
			<h2 className={styles.subtitle}>Favorite car component</h2>
		</Layout>
	);
};

export default FavoriteCars;
