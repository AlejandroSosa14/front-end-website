import { createContext, useState, useEffect } from "react";

import { getCars, getUniqueCategories } from "../api/cars";

const SearchCarContext = createContext();

export const CarProvider = ({ children }) => {
	const [cars, setCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [locations, setLocations] = useState([]);
	const [brands, setBrands] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCars = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await getCars();
				setCars(response.content);
				setFilteredCars(response.content);

				const uniqueLocations = [...new Set(response.content.map((car) => car.locationCity))];
				const uniqueBrands = [...new Set(response.content.map((car) => car.brand))];

				setLocations(uniqueLocations);
				setBrands(uniqueBrands);
			} catch (err) {
				console.error("Error al cargar los autos:", err);
				setError(err.message || "Error al cargar los autos.");
			} finally {
				setLoading(false); // Finalizamos la carga
			}
		};

		fetchCars();
	}, []);

	const filterCars = ({ locationCity, brand }) => {
		const results = cars.filter(
			(car) =>
				(locationCity === "" || car.locationCity === locationCity) &&
				(brand === "" || car.brand === brand)
		);
		setFilteredCars(results);
	};

	const resetFilters = () => setFilteredCars(cars);

	const getUniqueCategoriesFromAPI = async () => {
		setLoading(true);
		setError(null);
		try {
			return await getUniqueCategories();
		} catch (err) {
			console.error("Error al obtener las categorías:", err);
			setError(err.message || "Error al obtener las categorías.");
			return [];
		} finally {
			setLoading(false);
		}
	};

	return (
		<SearchCarContext.Provider
			value={{
				cars,
				filteredCars,
				filterCars,
				resetFilters,
				locations,
				brands,
				getUniqueCategories: getUniqueCategoriesFromAPI,
				loading,
				error,
			}}>
			{children}
		</SearchCarContext.Provider>
	);
};

export default SearchCarContext;
