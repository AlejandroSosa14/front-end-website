import Location from "../svgIcons/Location";
import Car from "../svgIcons/Car";
import Wallet from "../svgIcons/Wallet";

import styles from "./CarDetailsSearch.module.css";

const CarDetailsSearch = ({
	handleSearch,
	location,
	setLocation,
	brand,
	setBrand,
	price,
	setPrice,
}) => {
	return (
		<form className={styles.carDetailsSearchForm} onSubmit={handleSearch}>
			<div className={styles.carDetailsSelectContainer}>
				<Location />
				<select
					id="location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					className={styles.searchFormSelect}
					required>
					<option value="">Ubicación</option>
					<option value="location-1">Location 1</option>
					<option value="location-2">Location 2</option>
					<option value="location-3">Location 3</option>
					<option value="location-4">Location 4</option>
				</select>
			</div>
			<div className={styles.carDetailsSelectContainer}>
				<Car />
				<select
					id="brand"
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
					className={styles.searchFormSelect}
					required>
					<option value="">Marca</option>
					<option value="audi">Audi</option>
					<option value="bmw">BMW</option>
					<option value="seat">Seat</option>
					<option value="volkswagen">Volkswagen</option>
				</select>
			</div>
			<div className={styles.carDetailsSelectContainer}>
				<Wallet />
				<select
					id="price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className={styles.searchFormSelect}
					required>
					<option value="">Precio</option>
					<option value="low">$150 - $200</option>
					<option value="mid">$201 - $250</option>
					<option value="high">$251 - $300</option>
					<option value="extra">$301 - $350</option>
				</select>
			</div>
			<button type="submit" className="main-btn">
				Buscar
			</button>
		</form>
	);
};

export default CarDetailsSearch;
