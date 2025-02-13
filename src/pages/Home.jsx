import Categories from "../components/categories/Categories";
import Layout from "../components/layout/Layout";
import Search from "../components/search/Search";
import Suggestions from "../components/suggestions/Suggestions";

import styles from "./Home.module.css";

const Home = () => {
	return (
		<Layout>
			<section className={`section ${styles.searchContainer}`}>
				<div className="container">
					<Search />
				</div>
			</section>
			<section className="section">
				<div className="container">
					<Categories />
				</div>
			</section>
			<section className="section">
				<div className="container">
					<Suggestions />
				</div>
			</section>
		</Layout>
	);
};

export default Home;
