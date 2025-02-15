import Layout from "../components/layout/Layout";
import HeroMain from "../components/HeroMain/HeroMain";
import Search from "../components/search/Search";
import Categories from "../components/categories/Categories";
import Suggestions from "../components/suggestions/Suggestions";

const Home = () => {
	return (
		<Layout>
			<HeroMain />
			<section className="section">
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
