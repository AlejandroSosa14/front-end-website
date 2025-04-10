// const API_URL = "https://backend-api-production-743a.up.railway.app/api/categories";
const API_URL = import.meta.env.VITE_API_URL + "categories";

export const getCategories = async () => {
    try {
        const token = localStorage.getItem("authToken"); 

        if (!token) {
            throw new Error("No hay token disponible, el usuario debe iniciar sesión");
        }

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error al obtener las categorías");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getCategories:", error);
        return [];
    }
};

export const createCategory = async (formData) => {
    try {
        const token = localStorage.getItem("authToken");

        if (!token) {
            throw new Error("No hay token disponible, el usuario debe iniciar sesión");
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error al crear la categoría");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en createCategory:", error);
        throw error;
    }
};


export const updateCategory = async (categoryId, formData) => {
    try {
        const token = localStorage.getItem("authToken");

        if (!token) {
            throw new Error("No hay token disponible, el usuario debe iniciar sesión");
        }

        const response = await fetch(`${API_URL}/${categoryId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la categoría");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en updateCategory:", error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const token = localStorage.getItem("authToken");

        if (!token) {
            throw new Error("No hay token disponible, el usuario debe iniciar sesión");
        }

        const response = await fetch(`${API_URL}/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la categoría");
        }
    } catch (error) {
        console.error("Error en deleteCategory:", error);
        throw error;
    }
};
