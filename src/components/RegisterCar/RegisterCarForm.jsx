import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";
import { createCar } from "../../api/cars";
import styles from "./RegisterCarForm.module.css";

const RegisterCarForm = ({ onCarCreated }) => {
  const [carData, setCarData] = useState({
    brand: "",
    name: "",
    model: "",
    serialNumber: "",
    fuelType: "",
    transmissionType: "",
    categoryId: "",
    reserveCost: "",
    locationCity: "",
    locationCountry: "",
    color: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError("Error al obtener categorías. Intente nuevamente.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	try {
		// Asegúrate de que carData esté completamente lleno antes de enviar
		const newCar = {
			serialNumber: carData.serialNumber,
			brand: carData.brand,
			name: carData.name,
			model: parseInt(carData.model),
			status: false,
			fuelType: carData.fuelType,
			transmissionType: carData.transmissionType,
			reserveCost: parseFloat(carData.reserveCost),
			category: { id: parseInt(carData.categoryId) },
			locationCity: carData.locationCity,
			locationCountry: carData.locationCountry,
			color: carData.color,
		};

		// Crear FormData
		const formData = new FormData();
		
		// Asegúrate de agregar el objeto JSON como string en el FormData
		formData.append("car", JSON.stringify(newCar));
		
		// Agregar imágenes al FormData
		selectedFiles.forEach((file) => {
			formData.append("files", file);
		});

		// Llamar a la API para crear el carro
		const result = await createCar(formData, selectedFiles);
		if (result) {
			setSuccessMessage("Auto registrado exitosamente");
			setTimeout(() => setSuccessMessage(""), 3000);
			setCarData({
				brand: "",
				name: "",
				model: "",
				serialNumber: "",
				fuelType: "",
				transmissionType: "",
				categoryId: "",
				reserveCost: "",
				locationCity: "",
				locationCountry: "",
				color: "",
			});
			setSelectedFiles([]);
			onCarCreated && onCarCreated(result);
		} else {
			throw new Error("No se pudo registrar el auto");
		}
	} catch (error) {
		setError(error.message);
	}
};

  return (
    <div>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <label>
          Marca:
          <input
            className={styles.input}
            type="text"
            name="brand"
            value={carData.brand}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nombre del Modelo:
          <input
            className={styles.input}
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Año del Modelo:
          <input
            className={styles.input}
            type="number"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Serial:
          <input
            className={styles.input}
            type="text"
            name="serialNumber"
            value={carData.serialNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Combustible:
          <select
            className={styles.input}
            name="fuelType"
            value={carData.fuelType}
            onChange={handleChange}
            required>
            <option value="">Seleccione el tipo de combustible</option>
            <option value="gasolina">Gasolina</option>
            <option value="diésel">Diésel</option>
            <option value="eléctrico">Eléctrico</option>
            <option value="híbrido">Híbrido</option>
          </select>
        </label>
        <label>
          Transmisión:
          <select
            className={styles.input}
            name="transmissionType"
            value={carData.transmissionType}
            onChange={handleChange}
            required>
            <option value="">Seleccione el tipo de transmisión</option>
            <option value="estandar">Manual</option>
            <option value="automatico">Automática</option>
          </select>
        </label>
        <label>
          Categoría:
          {loading ? (
            <p>Cargando categorías...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <select
              className={styles.input}
              name="categoryId"
              value={carData.categoryId}
              onChange={handleChange}
              required>
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </label>
        <label>
          Precio de Reserva:
          <input
            className={styles.input}
            type="number"
            name="reserveCost"
            value={carData.reserveCost}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Ciudad de Ubicación:
          <input
            className={styles.input}
            type="text"
            name="locationCity"
            value={carData.locationCity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          País de Ubicación:
          <input
            className={styles.input}
            type="text"
            name="locationCountry"
            value={carData.locationCountry}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            className={styles.input}
            type="text"
            name="color"
            value={carData.color}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.imageUploadLabel}>
          Subir Imágenes:
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        </label>
        <div className={styles.imagePreview}>
          {selectedFiles.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt={`Car ${index + 1}`} />
          ))}
        </div>
        <button className={styles.submitButton} type="submit">
          Registrar Auto
        </button>
      </form>
    </div>
  );
};

export default RegisterCarForm;