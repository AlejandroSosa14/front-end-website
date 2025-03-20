import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getCategories, deleteCategory } from "../api/categories";
import CategoriesPagination from "../components/categories/CategoriesPagination.jsx";
import CreateCategoryModal from "../components/modal/CreateCategoryModal.jsx";

import EditCategoryModal from "../components/modal/EditCategoryModal.jsx";
import DeleteModalCategory from "../components/modal/DeleteModalCategory.jsx"; // Importado
import styles from "./Categories.module.css";
import PageTitle from "../components/pageTitle/PageTitle.jsx";

const CategoriesDashboard = () => {
	const [categories, setCategories] = useState([]);
	const [isMobile, setIsMobile] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedCategoryEdit, setSelectedCategoryEdit] = useState(null);
	const [selectedCategoryDelete, setSelectedCategoryDelete] = useState(null);
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
		} catch (error) {
			console.error("Error al cargar las categorías:", error);
		}
	};

	const handleCategoryCreated = (newCategory) => {
		setCategories((prevCategories) => [...prevCategories, newCategory]);
		setIsModalOpen(false);
	};

	const handleEditClick = (category) => {
		setSelectedCategoryEdit(category);
		setIsEditModalOpen(true);
	};

	const handleCategoryUpdated = async (updatedCategory) => {
		setCategories((prevCategories) =>
			prevCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
		);
		setIsEditModalOpen(false);
	};

	const handleDeleteClick = (category) => {
		setSelectedCategoryDelete(category);
	};
	
	const confirmDelete = async (categoryId) => {
		try {
			await deleteCategory(categoryId);
			setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== categoryId));
			setSelectedCategoryDelete(null);
		} catch (error) {
			throw error; // Lanzamos el error para que `DeleteModalCategory` lo maneje
		}
	};
	
	


	if (isMobile === null) return null;

	if (isMobile) {
		return (
			<div className={styles.mobileContainer}>
				<p className={styles.mobileMessage}>
					Este panel no está disponible en dispositivos móviles.
				</p>
				<button className={styles.backButton} onClick={() => navigate("/")}>
					Regresar al Inicio
				</button>
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
					<PageTitle title={"Administración de Categorías"} />
				</div>
				<div className="container">
					<div className={styles.buttonWrapper}>
						<button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
							+ Agregar Categoría
						</button>
					</div>
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
														<img
															src={imageUrl}
															alt={category.name}
															className={styles.categoryImage}
														/>
													) : (
														"Sin imagen"
													)}
												</td>
												<td>{category.name}</td>
												<td>{category.description || "Sin descripción"}</td>
												<td>
													<div className={styles.iconCell}>
														<svg
															className={styles.tableIcon}
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 614 614"
															onClick={() => handleEditClick(category)}>
															<path
																fill="#74C0FC"
																d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"
															/>
														</svg>
														<svg
															className={styles.tableIcon}
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 614 614"
															fill="#d21919"
															onClick={() => handleDeleteClick(category)}>
															<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
														</svg>
													</div>
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
				{isModalOpen && <CreateCategoryModal onClose={() => setIsModalOpen(false)} onCategoryCreated={handleCategoryCreated} />}
				{isEditModalOpen && selectedCategoryEdit && <EditCategoryModal category={selectedCategoryEdit} onClose={() => setIsEditModalOpen(false)} onCategoryUpdated={handleCategoryUpdated} />}
				{selectedCategoryDelete && <DeleteModalCategory category={selectedCategoryDelete} onConfirm={confirmDelete} onClose={() => setSelectedCategoryDelete(null)} />}
			
			</section>
		</Layout>
	);
};

export default CategoriesDashboard;
