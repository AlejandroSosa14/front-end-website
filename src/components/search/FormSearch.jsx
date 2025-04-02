import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchCarContext from "../../context/SearchCarContext";

import Car from "../svgIcons/Car";
import Location from "../svgIcons/Location";
import MagnifyingGlassOutline from "../svgIcons/MagnifyingGlassOutline";
import Calendar from "../svgIcons/Calendar";

import { normalizeText } from "../../utils/textUtils";

import styles from "./FormSearch.module.css";

const FormSearch = ({ onSearch }) => {
	const { uniqueBrands, uniqueLocations } = useContext(SearchCarContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [brand, setBrand] = useState("");
	const [locationCity, setLocationCity] = useState("");
	const navigate = useNavigate();

	const startDateInputRef = useRef(null);
	const endDateInputRef = useRef(null);

	const handleSubmitSearch = (e) => {
		e.preventDefault();

		const queryParams = new URLSearchParams();

		if (searchTerm) queryParams.append("searchTerm", normalizeText(searchTerm));
		if (startDate) queryParams.append("startDate", startDate);
		if (endDate) queryParams.append("endDate", endDate);
		if (brand) queryParams.append("brand", normalizeText(brand));
		if (locationCity) queryParams.append("locationCity", normalizeText(locationCity));

		if (onSearch) {
			onSearch({
				searchTerm: searchTerm ? normalizeText(searchTerm) : "",
				startDate: startDate,
				endDate: endDate,
				brand: brand ? normalizeText(brand) : "",
				locationCity: locationCity ? normalizeText(locationCity) : "",
			});
		}

		navigate(`/detalle-autos?${queryParams.toString()}`);

		setSearchTerm("");
		setStartDate("");
		setEndDate("");
		setBrand("");
		setLocationCity("");
	};

	return (
		<form className={styles.searchForm} onSubmit={handleSubmitSearch}>
			<div className={styles.searchForm_searchWrapper}>
				<h4 className={styles.searchForm_searchTip}>Búsqueda personalizada</h4>
				<div className={styles.searchForm_fieldWrapper}>
					<MagnifyingGlassOutline className={styles.searchForm_icon} />
					<input
						type="text"
						placeholder="Buscar..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={styles.searchForm_field}
					/>
				</div>
			</div>
			<div className={styles.searchForm_searchWrapper}>
				<h4 className={styles.searchForm_searchTip}>Fecha registro (inicio)</h4>
				<div className={styles.searchForm_fieldWrapper}>
					<Calendar
						className={styles.searchForm_icon}
						onClick={() => startDateInputRef.current.focus()}
					/>
					<input
						type="date"
						ref={startDateInputRef}
						placeholder="Fecha Inicio(registro)"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className={styles.searchForm_field}
					/>
				</div>
			</div>
			<div className={styles.searchForm_searchWrapper}>
				<h4 className={styles.searchForm_searchTip}>Fecha registro (fin)</h4>
				<div className={styles.searchForm_fieldWrapper}>
					<Calendar
						className={styles.searchForm_icon}
						onClick={() => endDateInputRef.current.focus()}
					/>
					<input
						type="date"
						ref={endDateInputRef}
						className={styles.searchForm_field}
						placeholder="Fecha Fin(registro)"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.searchForm_searchWrapper}>
				<h4 className={styles.searchForm_searchTip}>Marca del auto</h4>
				<div className={styles.searchForm_fieldWrapper}>
					<Car className={styles.searchForm_icon} />
					<select
						id="brand"
						value={brand}
						onChange={(e) => setBrand(e.target.value)}
						className={styles.searchForm_field}>
						<option value="" disabled>
							Marca
						</option>
						{uniqueBrands ? (
							uniqueBrands.map((brand, index) => (
								<option key={index} value={brand}>
									{brand}
								</option>
							))
						) : (
							<option value="" disabled>
								Cargando...
							</option>
						)}
					</select>
				</div>
			</div>
			<div className={styles.searchForm_searchWrapper}>
				<h4 className={styles.searchForm_searchTip}>Ubicación del auto</h4>
				<div className={styles.searchForm_fieldWrapper}>
					<Location className={styles.searchForm_icon} />
					<select
						id="location"
						value={locationCity}
						onChange={(e) => setLocationCity(e.target.value)}
						className={styles.searchForm_field}>
						<option value="" disabled>
							Ubicación
						</option>
						{uniqueLocations ? (
							uniqueLocations.map((location, index) => (
								<option key={index} value={location}>
									{location}
								</option>
							))
						) : (
							<option value="" disabled>
								Cargando...
							</option>
						)}
					</select>
				</div>
			</div>
			<button className={`main-btn ${styles.searchSubmitButton}`}>Realizar búsqueda</button>
		</form>
	);
};

export default FormSearch;
