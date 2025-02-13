import { useState } from "react";

import styles from "./Search.module.css";

const Searcher = () => {
	const [brand, setBrand] = useState("");
	const [type, setType] = useState("");
	const [manufactureYear, setManufactureYear] = useState("");

	// Función para manejar el envío del formulario
	const handleSearch = (e) => {
		e.preventDefault();
		// Resultados iniciales
		console.log("Buscando autos con los siguientes filtros:");
		console.log("Marca:", brand);
		console.log("Tipo:", type);
		console.log("Año de fabricación:", manufactureYear);

		// Ejemplo: Llamar a una API o filtrar una lista de autos
		// searchCars({ brand, type, availabilityDate });
	};

	const currentYear = new Date().getFullYear();
	// Generar una lista de años (desde el año actual hasta 5 años atrás)
	const years = Array.from({ length: 6 }, (_, index) => currentYear - index);

	return (
		<div className={`flex-row ${styles.search}`}>
			<h2 className={styles.searchTitle}>Encuentra el auto perfecto</h2>
			<form className={styles.searchForm} onSubmit={handleSearch}>
				{/* Buscar por marca */}
				<div className={styles.searchFormGroup}>
					<select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required>
						<option value="">Selecciona la Marca</option>
						<option value="audi">Audi</option>
						<option value="bmw">BMW</option>
						<option value="seat">Seat</option>
						<option value="volkswagen">Volkswagen</option>
					</select>
				</div>

				{/* Buscar por tipo */}
				<div className={styles.searchFormGroup}>
					<select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
						<option value="">Selecciona la carrocería</option>
						<option value="sedan">Sedán</option>
						<option value="hatchback">Hatchback</option>
						<option value="suv">SUV</option>
						<option value="coupe">Coupé</option>
					</select>
				</div>

				{/* Buscar por fecha de fabricación */}
				<div className={styles.searchFormGroup}>
					<select
						id="manufactureYear"
						value={manufactureYear}
						onChange={(e) => setManufactureYear(e.target.value)}
						required>
						<option value="">Selecciona un año</option>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				{/* Botón para ejecutar búsqueda */}
				<button className={styles.searchButton} type="submit">
					Buscar
				</button>
			</form>
		</div>
	);
};

export default Searcher;
