const API_BASE_URL = "/api/";

// cars
export const getCars = async (page = 1, size = 9) => {
	try {
		const response = await fetch(`${API_BASE_URL}cars?page=${page}&size=${size}`, {
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

export const deleteCar = async (carId) => {
	try {
		const token = localStorage.getItem("authToken"); // Obtiene el token directamente

		if (!token) {
			throw new Error("No hay token disponible, el usuario debe iniciar sesión");
		}

		const response = await fetch(
			`https://backend-api-production-743a.up.railway.app/api/cars/${carId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				mode: "cors",
				credentials: "include",
			}
		);

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

		const response = await fetch("https://backend-api-production-743a.up.railway.app/api/cars", {
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

        const response = await fetch(`https://backend-api-production-743a.up.railway.app/api/cars/${carId}`, {
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

		const response = await fetch(
			`https://backend-api-production-743a.up.railway.app/api/cars/${carId}`,
			{
				method: "PUT",
				headers: { Authorization: `Bearer ${token}` },
				mode: "cors",
				credentials: "include",
				body: formData,
			}
		);

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
