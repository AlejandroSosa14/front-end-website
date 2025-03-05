export const loginUser = async (username, password) => {
    try {
        const response = await fetch("http://localhost:8181/api/user/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: username, password: password })
        });

        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }

        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", username);

        return { success: true, token: data.token };
    } catch (error) {
        console.error("Error en loginUser:", error);
        return { success: false, error: error.message };
    }
};

export const getUsers = async () => {
    try {
        const token = localStorage.getItem("authToken"); // Obtiene el token

        if (!token) {
            throw new Error("No hay token disponible, el usuario debe iniciar sesión");
        }

        const response = await fetch("http://localhost:8181/api/users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getUsers:", error);
        return [];
    }
};

export const createUser = async (userData) => {
    try {
        const response = await fetch("http://localhost:8181/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Error al crear el usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en createUser:", error);
        return null;
    }
};


export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem("authToken");

        if (!token) {
            throw new Error("No hay token disponible, el usuario debe iniciar sesión");
        }

        const response = await fetch(`http://localhost:8181/api/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el usuario");
        }

        return true;
    } catch (error) {
        console.error("Error en deleteUser:", error);
        return false;
    }
};
