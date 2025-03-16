import { useState, useEffect } from "react";
import styles from "./EditCarModal.module.css";
import { updateCar } from "../api/cars";

const EditCarModal = ({ car, onClose, onUpdate }) => {
	const [formData, setFormData] = useState({ ...car });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [initialImages, setInitialImages] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [removedImages, setRemovedImages] = useState([]);

	// useEffect(() => {

	//     try {
	//         if (car.images) {
	//             const parsedImages = JSON.parse(car.images);
	//             setInitialImages(Array.isArray(parsedImages) ? parsedImages : []);
	//         }
	//     } catch (error) {
	//         console.error("Error al parsear imágenes:", error);
	//         setInitialImages([]);
	//     }
	// }, [car.images]);
	useEffect(() => {
		console.log("Datos recibidos del GET:", car);

		try {
			let imagesArray = [];

			if (car.images && car.images.length > 0) {
				imagesArray = car.images.flatMap((imageString) => {
					try {
						const parsedArray = JSON.parse(imageString); // Convertir el string JSON en array
						return Array.isArray(parsedArray) ? parsedArray : []; // Asegurar que sea un array
					} catch (error) {
						console.error("Error al parsear imagen:", imageString, error);
						return [];
					}
				});
			}

			console.log("Imágenes finales establecidas:", imagesArray);
			setInitialImages(imagesArray);
		} catch (error) {
			console.error("Error general al procesar imágenes:", error);
			setInitialImages([]);
		}
	}, [car.images]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
	};

	const handleRemoveImage = (index, isNew) => {
		if (isNew) {
			setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
		} else {
			setRemovedImages([...removedImages, initialImages[index]]);
			setInitialImages(initialImages.filter((_, i) => i !== index));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const imagesToKeep = initialImages.filter((img) => !removedImages.includes(img));

			const updatedCarData = {
				...formData,
				model: parseInt(formData.model, 10),
				reserveCost: parseFloat(formData.reserveCost),
				status: formData.status === "true",
				images: JSON.stringify(imagesToKeep),
			};

			const formDataToSend = new FormData();
			formDataToSend.append("car", JSON.stringify(updatedCarData));

			selectedFiles.forEach((file) => {
				formDataToSend.append("files", file);
			});

			if (removedImages.length > 0) {
				formDataToSend.append("removedImages", JSON.stringify(removedImages));
			}

			const updatedCar = await updateCar(car.id, formDataToSend);

			onUpdate(updatedCar);
			onClose();
		} catch (error) {
			console.error("Error al actualizar el auto:", error);
			setError("No se pudo actualizar el auto");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h2>Editar Auto</h2>
				{error && <p className={styles.error}>{error}</p>}
				<form onSubmit={handleSubmit}>
					<label>
						Marca:
						<input
							type="text"
							name="brand"
							value={formData.brand}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Nombre del Modelo:
						<input type="text" name="name" value={formData.name} onChange={handleChange} required />
					</label>
					<label>
						Año del Modelo:
						<input
							type="number"
							name="model"
							value={formData.model}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Serial:
						<input
							type="text"
							name="serialNumber"
							value={formData.serialNumber}
							onChange={handleChange}
							required
						/>
					</label>
					<label>
						Combustible:
						<select name="fuelType" value={formData.fuelType} onChange={handleChange} required>
							<option value="gasolina">Gasolina</option>
							<option value="diésel">Diésel</option>
							<option value="eléctrico">Eléctrico</option>
							<option value="híbrido">Híbrido</option>
						</select>
					</label>
					<label>
						Transmisión:
						<select
							name="transmissionType"
							value={formData.transmissionType}
							onChange={handleChange}
							required>
							<option value="estandar">Manual</option>
							<option value="automatico">Automática</option>
						</select>
					</label>
					<label>
						Estado:
						<select name="status" value={formData.status} onChange={handleChange} required>
							<option value="true">Activo</option>
							<option value="false">Inactivo</option>
						</select>
					</label>
					<label>
						Precio de Reserva:
						<input
							type="number"
							name="reserveCost"
							value={formData.reserveCost}
							onChange={handleChange}
							required
						/>
					</label>
					{/* 
                    <label>Imágenes Actuales:</label>
                    <div className={styles.imageContainer}>
                        {initialImages.length > 0 ? (
                            initialImages.map((img, index) => (
                                <div key={index} className={styles.imageWrapper}>
                                    <img src={img} alt={`Imagen ${index + 1}`} className={styles.carImage} />
                                    <button type="button" className={styles.removeImageBtn} onClick={() => handleRemoveImage(index, false)}>
                                        ❌
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No hay imágenes disponibles</p>
                        )}
                    </div> */}

					<label>Imágenes Actuales:</label>
					<div className={styles.imageContainer}>
						{initialImages.length > 0 ? (
							initialImages.map((img, index) => (
								<div key={index} className={styles.imageWrapper}>
									<img src={img} alt={`Imagen ${index + 1}`} className={styles.carImage} />
									<button
										type="button"
										className={`${styles.editButton} ${styles.removeImageBtn}`}
										onClick={() => handleRemoveImage(index, false)}>
										❌
									</button>
								</div>
							))
						) : (
							<p>No hay imágenes disponibles</p>
						)}
					</div>

					<label>Nuevas Imágenes:</label>
					<div className={styles.imageContainer}>
						{selectedFiles.map((file, index) => (
							<div key={index} className={styles.imageWrapper}>
								<img
									src={URL.createObjectURL(file)}
									alt={`Nueva Imagen ${index + 1}`}
									className={styles.carImage}
								/>
								<button
									type="button"
									className={`${styles.editButton} ${styles.removeImageBtn}`}
									onClick={() => handleRemoveImage(index, true)}>
									❌
								</button>
							</div>
						))}
					</div>

					<button
						type="button"
						className={`${styles.editButton} ${styles.removeImageBtn}`}
						onClick={() => document.querySelector("#fileInput").click()}>
						Seleccionar Imágenes
					</button>
					<input
						id="fileInput"
						type="file"
						multiple
						accept="image/*"
						onChange={handleFileChange}
						style={{ display: "none" }}
					/>

					<div className={styles.buttonContainer}>
						<button
							type="submit"
							disabled={loading}
							className={`${styles.saveSubmit} ${styles.saveSubmit}`}>
							{loading ? "Actualizando..." : "Guardar Cambios"}
						</button>
						<button type="button" onClick={onClose}>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditCarModal;
