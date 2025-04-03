import { createContext, useState, useEffect, useMemo } from "react";
import { getCars } from "../api/cars";
import { normalizeText } from "../utils/textUtils";

const SearchCarContext = createContext();

export const CarProvider = ({ children }) => {
	const [allCars, setAllCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [uniqueBrands, setUniqueBrands] = useState([]);
	const [uniqueLocations, setUniqueLocations] = useState([]);
	const [uniqueCategories, setUniqueCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAllData = async () => {
			setLoading(true);
			setError(null);
			try {
				let page = 0;
				let size = 10;
				let fetchedCars = [];
				let totalPagesFromApi = 1;

				while (page < totalPagesFromApi) {
					const res = await getCars(page, size);
					if (res && res.content) {
						fetchedCars = fetchedCars.concat(res.content);
						totalPagesFromApi = res.totalPages;
						page++;
					} else {
						totalPagesFromApi = 0;
					}
				}
				setAllCars(fetchedCars);
				setFilteredCars(fetchedCars);

				const brands = [
					...new Set(fetchedCars.map((car) => car.brand || "Sin marcas disponibles")),
				];
				const locations = [
					...new Set(fetchedCars.map((car) => car.locationCity || "Sin ubicaciones disponibles")),
				];
				const categories = fetchedCars.reduce((unique, car) => {
					if (!unique.find((category) => category.name === car.category.name)) {
						unique.push(car.category);
					}
					return unique;
				}, []);

				setUniqueBrands(brands);
				setUniqueLocations(locations);
				setUniqueCategories(categories);
			} catch (err) {
				console.error("Error al cargar los datos:", err);
				setError(err.message || "Error al cargar los datos.");
			} finally {
				setLoading(false);
			}
		};

		fetchAllData();
	}, []);

	const filterCars = (filters) => {
		setFilteredCars(
			allCars.filter((car) => {
				let searchTermMatch = true;
				if (filters.searchTerm) {
					const searchTerms = filters.searchTerm.toLowerCase().split(" ");
					searchTermMatch = searchTerms.every((term) => {
						return (
							Object.values(car).some((value) => String(value).toLowerCase().includes(term)) ||
							(car.category && car.category.name && car.category.name.toLowerCase().includes(term))
						);
					});
				}

				const startDateMatch = !filters.startDate || car.postDate >= filters.startDate;
				const endDateMatch = !filters.endDate || car.postDate <= filters.endDate;
				const brandMatch = !filters.brand || normalizeText(car.brand) === filters.brand;
				const locationMatch =
					!filters.locationCity || normalizeText(car.locationCity) === filters.locationCity;
				const categoryMatch =
					!filters.category || normalizeText(car.category.name) === filters.category; // Nueva lógica para filtrar por categoría

				return (
					searchTermMatch &&
					startDateMatch &&
					endDateMatch &&
					brandMatch &&
					locationMatch &&
					categoryMatch
				);
			})
		);
	};

	const getCheapCars = useMemo(() => {
		const sortedCars = [...allCars].sort((a, b) => a.price - b.price);
		const quarter = Math.ceil(sortedCars.length * 0.25);
		return sortedCars.slice(0, quarter);
	}, [allCars]);

	return (
		<SearchCarContext.Provider
			value={{
				allCars,
				filteredCars,
				uniqueBrands,
				uniqueLocations,
				uniqueCategories,
				filterCars,
				getCheapCars,
				loading,
				error,
			}}>
			{children}
		</SearchCarContext.Provider>
	);
};

export default SearchCarContext;
