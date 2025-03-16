import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchCarContext from "../../context/SearchCarContext";

import { normalizeText } from "../../utils/textUtils";

import styles from "./FormSearch.module.css";

const FormSearch = () => {
	const { locations, brands } = useContext(SearchCarContext);
	const [brand, setBrand] = useState("");
	const [locationCity, setLocationCity] = useState("");
	const navigate = useNavigate();

	const handleSubmitSearch = (e) => {
		e.preventDefault();

		const queryParams = new URLSearchParams();
		if (brand) queryParams.append("brand", normalizeText(brand));
		if (locationCity) queryParams.append("locationCity", normalizeText(locationCity));
		navigate(`/detalle-autos?${queryParams.toString()}`);
		setBrand("");
		setLocationCity("");
	};

	return (
		<form className={styles.searchForm} onSubmit={handleSubmitSearch}>
			<div className={styles.searchFormGroup}>
				<div className={styles.searchFormGroupSelect}>
					<img className={styles.searchFormSelectIcon} src="/car_icon.svg" alt="Car icon" />
					<select
						id="brand"
						value={brand}
						onChange={(e) => setBrand(e.target.value)}
						className={styles.searchFormSelect}>
						<option value="" disabled>
							Marca
						</option>
						{brands.map((brand, index) => (
							<option key={index} value={brand}>
								{brand}
							</option>
						))}
					</select>
				</div>
				<div className={styles.searchFormGroupSelect}>
					<img
						className={styles.searchFormSelectIcon}
						src="/location_icon.svg"
						alt="Location icon"
					/>
					<select
						id="location"
						value={locationCity}
						onChange={(e) => setLocationCity(e.target.value)}
						className={styles.searchFormSelect}>
						<option value="" disabled>
							Ubicación
						</option>
						{locations.map((location, index) => (
							<option key={index} value={location}>
								{location}
							</option>
						))}
					</select>
				</div>
			</div>
			<button className={`main-btn ${styles.searchSubmitButton}`}>Realizar búsqueda</button>
		</form>
	);
};

export default FormSearch;
