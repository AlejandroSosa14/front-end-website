import { useContext } from "react";

import SearchCarContext from "../context/SearchCarContext";
import Layout from "../components/layout/Layout";
import HeroMain from "../components/HeroMain/HeroMain";
import FormSearch from "../components/search/FormSearch";
import Categories from "../components/categories/Categories";
import Suggestions from "../components/suggestions/Suggestions";
import Customer from "../components/customer/Customer";

import styles from "./Home.module.css";

const Home = () => {
	const { uniqueBrands, uniqueLocations, uniqueCategories, filterCars, getCheapCars } =
		useContext(SearchCarContext);
	return (
		<Layout>
			<HeroMain />
			<section className="section">
				<div className="container">
					<div className={styles.homeSearch}>
						<h2 className="sectionTitle">Encuentra el auto perfecto</h2>
						<FormSearch brands={uniqueBrands} locations={uniqueLocations} onSearch={filterCars} />
					</div>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<Categories categories={uniqueCategories} />
				</div>
			</section>
			<section className="section">
				<div className="container">
					<Suggestions cars={getCheapCars} />
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
