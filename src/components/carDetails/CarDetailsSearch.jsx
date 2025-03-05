import Location from "../svgIcons/Location";
import Car from "../svgIcons/Car";

import styles from "./CarDetailsSearch.module.css";

const CarDetailsSearch = ({
	handleSearch,
	locations,
	brands,
	locationCity,
	setLocationCity,
	brand,
	setBrand,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		handleSearch({ locationCity, brand });
	};

	return (
		<form className={styles.carDetailsSearchForm} onSubmit={handleSubmit}>
			<div className={styles.carDetailsSelectContainer}>
				<Car />
				<select
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
					className={styles.searchFormSelect}>
					<option value="">Marca</option>
					{brands.map((brand, index) => (
						<option key={index} value={brand}>
							{brand}
						</option>
					))}
				</select>
			</div>
			<div className={styles.carDetailsSelectContainer}>
				<Location />
				<select
					value={locationCity}
					onChange={(e) => setLocationCity(e.target.value)}
					className={styles.searchFormSelect}>
					<option value="">Ubicación</option>
					{locations.map((location, index) => (
						<option key={index} value={location}>
							{location}
						</option>
					))}
				</select>
			</div>
			<button type="submit" className="main-btn">
				Buscar
			</button>
		</form>
	);
};

export default CarDetailsSearch;
