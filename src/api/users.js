export const loginUser = async (username, password) => {
    try {
        const response = await fetch("https://backend-api-production-743a.up.railway.app/api/user/authenticate", {
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

        const response = await fetch("https://backend-api-production-743a.up.railway.app/api/users", {
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
      const response = await fetch("https://backend-api-production-743a.up.railway.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      let errorMessage = "Error al crear el usuario";
  
      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
  
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
  
        throw new Error(errorMessage);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en createUser:", error);
      throw error;
    }
  };

export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem("authToken");

        if (!token) {
            throw new Error("No hay token disponible, el usuario debe iniciar sesión");
        }

        const response = await fetch(`https://backend-api-production-743a.up.railway.app/api/users/${userId}`, {
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
