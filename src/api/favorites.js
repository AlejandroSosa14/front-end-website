const API_URL = import.meta.env.VITE_API_URL;

export const getFavorites = async (username) => {
    try {
        const authToken = localStorage.getItem("authToken");

        if (!username) throw new Error("No se proporcionó un nombre de usuario.");
        if (!authToken) throw new Error("No se encontró el authToken en localStorage.");

        const url = `${API_URL}users/favorites/${username}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los favoritos: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.warn("Advertencia en getFavorites:", error.message);
        return null;
    }
};
export const removeFavorite = async (username, carId) => {
    try {
        const authToken = localStorage.getItem("authToken");

        if (!username) throw new Error("No se proporcionó un nombre de usuario.");
        if (!authToken) throw new Error("No se encontró el authToken en localStorage.");

        const url = `${API_URL}users/favorites/${username}/${carId}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar de favoritos: ${response.status} - ${response.statusText}`);
        }

        return true; // Indica que la eliminación fue exitosa
    } catch (error) {
        console.warn("Advertencia en removeFavorite:", error.message);
        return false;
    }
};
