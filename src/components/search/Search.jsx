import { useState } from "react";

import styles from "./Search.module.css";

const Searcher = () => {
	const [brand, setBrand] = useState("");
	const [type, setType] = useState("");

	// Función para manejar el envío del formulario
	const handleSearch = (e) => {
		e.preventDefault();
		// Resultados iniciales
		console.log("Buscando autos con los siguientes filtros:");
		console.log("Marca:", brand);
		console.log("Tipo:", type);

		// Ejemplo: Llamar a una API o filtrar una lista de autos
		// searchCars({ brand, type, availabilityDate });
	};

	return (
		<div className={`flex-row ${styles.search}`}>
			<h2 className={styles.searchTitle}>Encuentra el auto perfecto</h2>
			<form className={styles.searchForm} onSubmit={handleSearch}>
				<div className={styles.searchFormGroup}>
					<div className={styles.searchFormGroupSelect}>
						<img
							className={styles.searchFormSelectIcon}
							src="/location_icon.svg"
							alt="Location icon"
						/>
						<select
							id="location"
							value={type}
							onChange={(e) => setType(e.target.value)}
							className={styles.searchFormSelect}
							required>
							<option value="">Ubicación</option>
							<option value="location-1">Location 1</option>
							<option value="location-2">Location 2</option>
							<option value="location-3">Location 3</option>
							<option value="location-4">Location 4</option>
						</select>
					</div>
					<div className={styles.searchFormGroupSelect}>
						<img className={styles.searchFormSelectIcon} src="/car_icon.svg" alt="Car icon" />
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
				</div>
				<button className="main-btn" type="submit">
					Buscar
				</button>
			</form>
		</div>
	);
};

export default Searcher;
