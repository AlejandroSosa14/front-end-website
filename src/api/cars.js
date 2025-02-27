
// const username = "administrador";
// const password = "password";
// const credentials = btoa(`${username}:${password}`);

export const getCars = fetch("http://localhost:8181/api/cars?page=0&size=10", {
    method: "GET",
    // headers: {
    //     "Content-Type": "application/json", // Enviar token
    //   },
})
.then((response) => response.json())
.then((data) => console.log("Datos seguros:", data.content))
.catch((error) => console.error("Error al obtener carros:", error));