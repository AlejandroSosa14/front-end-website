const API_URL = "http://localhost:8181/api/cars?page=0&size=10";

export const getCars = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Basic ${btoa("administrador:password")}` // Si es necesario
            },
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data.content; // Retorna solo la lista de carros
    } catch (error) {
        console.error("Error al obtener los carros:", error);
        return [];
    }
};
