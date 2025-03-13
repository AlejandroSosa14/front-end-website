// Función para normalizar texto (convertir a minúsculas y eliminar acentos)
export const normalizeText = (text) => {
	if (!text) return "";
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
};
