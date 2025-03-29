// cars
export const getCars = async (page = 0, size = 10) => {
	try {
		const response = await fetch(`http://localhost:8181/api/cars?page=${page}&size=${size}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
		});

		if (!response.ok) {
			throw new Error("Error al obtener los autos");
		}

		return await response.json();
	} catch (error) {
		console.error("Error en getCars:", error);
		return { content: [], totalPages: 0, totalElements: 0, currentPage: 0 };
	}
};

// getUniqueCategories
export const getUniqueCategories = async () => {
	try {
		let allCars = [];
		let page = 0;
		let size = 10;
		let totalPages = 1;

		// Obtener todos los autos de forma paginada
		while (page < totalPages) {
			const response = await getCars(page, size);
			allCars = allCars.concat(response.content);
			totalPages = response.totalPages;
			page++;
		}

		// Extraer y filtrar categorías únicas
		const uniqueCategories = allCars.reduce((unique, car) => {
			if (!unique.find((category) => category.name === car.category.name)) {
				unique.push(car.category);
			}
			return unique;
		}, []);

		return uniqueCategories;
	} catch (error) {
		console.error("Error en getUniqueCategories:", error);
		return [];
	}
};

export const deleteCar = async (carId) => {
	try {
		const token = localStorage.getItem("authToken"); // Obtiene el token directamente

		if (!token) {
			throw new Error("No hay token disponible, el usuario debe iniciar sesión");
		}

		const response = await fetch(`http://localhost:8181/api/cars/${carId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			mode: "cors",
			credentials: "include",
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Error al eliminar el auto");
		}

		return true;
	} catch (error) {
		console.error("Error en deleteCar:", error);
		return false;
	}
};

export const createCar = async (carData, files = []) => {
	try {
		const token = localStorage.getItem("authToken");
		if (!token) throw new Error("No hay token disponible, el usuario debe iniciar sesión");

		const formData = new FormData();
		formData.append("car", JSON.stringify(carData));

		files.forEach((file) => formData.append("files", file));

		const response = await fetch("http://localhost:8181/api/cars", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			mode: "cors",
			credentials: "include",
			body: formData,
		});

		if (!response.ok) throw new Error("Error al crear el auto");

		return await response.json();
	} catch (error) {
		console.error("Error en createCar:", error);
		return null;
	}
};

/*export const updateCar = async (carId, formData) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No hay token disponible, el usuario debe iniciar sesión");

        const response = await fetch(`http://localhost:8181/api/cars/${carId}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` },
            mode: "cors",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en updateCar:", error);
        return null;
    }
};*/

// Actualizar un auto con imágenes
export const updateCar = async (carId, formData) => {
	try {
		const token = localStorage.getItem("authToken");
		if (!token) throw new Error("No hay token disponible, el usuario debe iniciar sesión");

		const response = await fetch(`http://localhost:8181/api/cars/${carId}`, {
			method: "PUT",
			headers: { Authorization: `Bearer ${token}` },
			mode: "cors",
			credentials: "include",
			body: formData,
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error ${response.status}: ${errorText}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error en updateCar:", error);
		return null;
	}
};