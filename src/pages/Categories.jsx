import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getCategories } from "../api/categories";
import CategoriesPagination from "../components/categories/CategoriesPagination.jsx";
import CreateCategoryModal from "../components/categories/CreateCategoryModal.jsx";
import styles from "./Categories.module.css";

const CategoriesDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [isMobile, setIsMobile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const categoriesPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
            console.log("Categorías cargadas:", data);
        } catch (error) {
            console.error("Error al cargar las categorías:", error);
        }
    };

    const handleCategoryCreated = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setIsModalOpen(false);
    };

    if (isMobile === null) return null;

    if (isMobile) {
        return (
            <div className={styles.mobileContainer}>
                <p className={styles.mobileMessage}>Este panel no está disponible en dispositivos móviles.</p>
                <button className={styles.backButton} onClick={() => navigate("/")}>Regresar al Inicio</button>
            </div>
        );
    }

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    return (
        <Layout>
            <section className={styles.register}>
                <div className={styles.headerContainer}>
                    <h2>Administración de Categorías</h2>
                    
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>+ Agregar Categoría</button>
                </div>
                <div className="container">
                    <div className={styles.registerContainer}>
                        <table className={styles.tableInfo}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th>ID</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableContent}>
                                {currentCategories.length > 0 ? (
                                    currentCategories.map((category) => {
                                        let imageUrl = null;
                                        
                                        if (category.image) {
                                            try {
                                                const parsedImage = JSON.parse(category.image);
                                                if (Array.isArray(parsedImage) && parsedImage.length > 0) {
                                                    imageUrl = parsedImage[0]; // Tomamos la primera imagen
                                                }
                                            } catch (error) {
                                                console.error("Error al parsear la imagen:", error);
                                            }
                                        }

                                        return (
                                            <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>
                                                    {imageUrl ? (
                                                        <img src={imageUrl} alt={category.name} className={styles.categoryImage} />
                                                    ) : (
                                                        "Sin imagen"
                                                    )}
                                                </td>
                                                <td>{category.name}</td>
                                                <td>{category.description || "Sin descripción"}</td>
                                                <td>
                                                    <button className={styles.editButton}>✏️</button>
                                                    <button className={styles.deleteButton}>🗑️</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5">No hay categorías disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {categories.length > 0 && (
                    <CategoriesPagination
                        totalItems={categories.length}
                        itemsPerPage={categoriesPerPage}
                        currentPage={currentPage}
                        changePage={setCurrentPage}
                    />
                )}

                {isModalOpen && (
                    <CreateCategoryModal 
                        onClose={() => setIsModalOpen(false)} 
                        onCategoryCreated={handleCategoryCreated} 
                    />
                )}
            </section>
        </Layout>
    );
};

export default CategoriesDashboard;
