import Layout from "../components/layout/Layout";
import HeroMain from "../components/HeroMain/HeroMain";
import FormSearch from "../components/search/FormSearch";
import Categories from "../components/categories/Categories";
import Suggestions from "../components/suggestions/Suggestions";
import Customer from "../components/customer/Customer";

import styles from "./Home.module.css";

const Home = () => {
	return (
		<Layout>
			<HeroMain />
			<section className="section">
				<div className="container">
					<div className={styles.homeSearch}>
						<h2 className="sectionTitle">Encuentra el auto perfecto</h2>
						<FormSearch />
					</div>
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
			<section className="section">
				<div className="container">
					<Customer />
				</div>
			</section>
		</Layout>
	);
};

export default Home;
