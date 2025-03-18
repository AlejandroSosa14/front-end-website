import { useState, useEffect } from "react";
import { createCategory } from "../../api/categories";
import styles from "./CreateCategoryModal.module.css";

const CreateCategoryModal = ({ onClose, onCategoryCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("category", JSON.stringify(formData));

            if (selectedFile) {
                formDataToSend.append("file", selectedFile);
            }

            const newCategory = await createCategory(formDataToSend);

            if (typeof onCategoryCreated === "function") {
                onCategoryCreated(newCategory);
            } else {
                console.warn("onCategoryCreated no está definido o no es una función.");
            }

            onClose();
        } catch (error) {
            console.error("Error al crear la categoría:", error);
            setError("No se pudo crear la categoría");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h4>Registrar Categoría</h4>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            className={styles.inputT}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Descripción:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>

                    <label>Imagen:</label>
                    <div className={styles.imageContainer}>
                        {preview ? (
                            <div className={styles.imageWrapper}>
                                <img src={preview} alt="Vista previa" className={styles.previewImage} />
                                <button type="button" className={styles.removeImageBtn} onClick={handleRemoveImage}>
                                    ❌
                                </button>
                            </div>
                        ) : (
                            <p>No hay imagen seleccionada</p>
                        )}
                    </div>

                    <button
                        type="button"
                        className={styles.selectImageBtn}
                        onClick={() => document.querySelector("#fileInput").click()}
                    >
                        Seleccionar Imagen
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    <div className={styles.buttonContainer}>
                        <button type="submit" disabled={loading} className={styles.saveButton}>
                            {loading ? "Guardando..." : "Crear Categoría"}
                        </button>
                        <button type="button" className={styles.closeButton} onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCategoryModal;
