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

    useEffect(() => {
        try {
            if (typeof car.images === "string") {
                const imagesArray = JSON.parse(car.images);
                setInitialImages(Array.isArray(imagesArray) ? imagesArray : []);
            } else if (Array.isArray(car.images)) {
                setInitialImages(car.images);
            } else {
                setInitialImages([]);
            }
        } catch (error) {
            console.error("Error al parsear imágenes:", error);
            setInitialImages([]);
        }
    }, [car.images]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
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
            const updatedCarData = {
                ...formData,
                model: parseInt(formData.model, 10),
                reserveCost: parseFloat(formData.reserveCost),
                status: formData.status === "true",
                images: JSON.stringify(initialImages.filter(img => !removedImages.includes(img)))
            };

            const formDataToSend = new FormData();
            formDataToSend.append("car", JSON.stringify(updatedCarData));

            selectedFiles.forEach(file => {
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
                    <label>Marca:
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                    </label>
                    <label>Nombre del Modelo:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>Año del Modelo:
                        <input type="number" name="model" value={formData.model} onChange={handleChange} required />
                    </label>
                    <label>Serial:
                        <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
                    </label>
                    <label>Combustible:
                        <select name="fuelType" value={formData.fuelType} onChange={handleChange} required>
                            <option value="">Seleccione el tipo de combustible</option>
                            <option value="gasolina">Gasolina</option>
                            <option value="diésel">Diésel</option>
                            <option value="eléctrico">Eléctrico</option>
                            <option value="híbrido">Híbrido</option>
                        </select>
                    </label>
                    <label>Transmisión:
                        <select name="transmissionType" value={formData.transmissionType} onChange={handleChange} required>
                            <option value="">Seleccione el tipo de transmisión</option>
                            <option value="estandar">Manual</option>
                            <option value="automatico">Automática</option>
                        </select>
                    </label>
                    <label>Estado:
                        <select name="status" value={formData.status} onChange={handleChange} required>
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </label>
                    <label>Precio de Reserva:
                        <input type="number" name="reserveCost" value={formData.reserveCost} onChange={handleChange} required />
                    </label>

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
                    </div>

                    <label>Nuevas Imágenes:</label>
                    <div className={styles.imageContainer}>
                        {selectedFiles.map((file, index) => (
                            <div key={index} className={styles.imageWrapper}>
                                <img src={URL.createObjectURL(file)} alt={`Nueva Imagen ${index + 1}`} className={styles.carImage} />
                                <button type="button" className={styles.removeImageBtn} onClick={() => handleRemoveImage(index, true)}>
                                    ❌
                                </button>
                            </div>
                        ))}
                    </div>

                    <button type="button" onClick={() => document.querySelector("#fileInput").click()}>
                        Seleccionar Imágenes
                    </button>
                    <input id="fileInput" type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />

                    <div className={styles.buttonContainer}>
                        <button type="submit" disabled={loading}>{loading ? "Actualizando..." : "Guardar Cambios"}</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCarModal;


