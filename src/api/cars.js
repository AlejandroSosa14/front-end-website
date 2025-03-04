// cars
export const getCars = async () => {
    try {
        const response = await fetch("http://localhost:8181/api/cars?page=0&size=10", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        });

        if (!response.ok) {
            throw new Error("Error al obtener los autos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getCars:", error);
        return [];
    }
};

export const deleteCar = async (carId) => {
    try {
        const response = await fetch(`http://localhost:8181/api/cars/${carId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Basic " + btoa("jose:pass123"),
                "Content-Type": "application/json"
            },
            mode: "cors",
            credentials: "include"
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