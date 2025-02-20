import Layout from "../components/layout/Layout";
import HeroMain from "../components/HeroMain/HeroMain";
import Search from "../components/search/Search";
import Categories from "../components/categories/Categories";
import Suggestions from "../components/suggestions/Suggestions";
import Customer from "../components/customer/Customer";

const Home = () => {
	return (
		<Layout>
			<HeroMain />
			<div className="container">
				<Search />
			</div>
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
