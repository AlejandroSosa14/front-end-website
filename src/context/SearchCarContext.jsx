import { createContext, useState, useEffect } from "react";

import CARS from "../data/cars.js"; // Importamos la lista de autos
// const API_URL = "https://api.example.com/cars"; // URL de la API

const SearchCarContext = createContext();

export const CarProvider = ({ children }) => {
	const [cars, setCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [locations, setLocations] = useState([]);
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		const fetchCars = async () => {
			try {
				// Hacer llamada a la API en lugar de usar CARS
				const data = CARS;

				setCars(data);
				setFilteredCars(data);

				const uniqueLocations = [...new Set(data.map((car) => car.locationCity))];
				const uniqueBrands = [...new Set(data.map((car) => car.brand))];

				setLocations(uniqueLocations);
				setBrands(uniqueBrands);
			} catch (error) {
				console.error("Error al cargar los autos:", error);
			}
		};

		fetchCars();
	}, []);

	const filterCars = ({ locationCity, brand }) => {
		const results = CARS.filter(
			(car) =>
				(locationCity === "" || car.locationCity === locationCity) &&
				(brand === "" || car.brand === brand)
		);
		setFilteredCars(results);
	};

	const resetFilters = () => setFilteredCars(CARS);

	return (
		<SearchCarContext.Provider
			value={{ cars, filteredCars, filterCars, resetFilters, locations, brands }}>
			{children}
		</SearchCarContext.Provider>
	);
};

export default SearchCarContext;
