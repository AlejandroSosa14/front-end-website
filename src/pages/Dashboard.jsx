import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import DeleteModal from "../components/modal/DeleteModal";
import WarningModal from "../components/modal/WarningModal";
import EditCarModal from "../pages/EditCarModal";
import { getCars, deleteCar } from "../api/cars";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [warningCar, setWarningCar] = useState(null);
    const [editCar, setEditCar] = useState(null);
    const [isMobile, setIsMobile] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
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
        fetchCars(currentPage);
    }, [currentPage]);

    const fetchCars = async (page) => {
        try {
            const data = await getCars(page);
            setCars(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error al cargar los autos:", error);
        }
    };

    const handleDeleteClick = (car) => {
        setWarningCar(null);
        setSelectedCar(null);
        setTimeout(() => {
            car.status ? setSelectedCar(car) : setWarningCar(car);
        }, 10);
    };

    const confirmDelete = async (carId) => {
        const success = await deleteCar(carId);
        if (success) {
            setCars(cars.filter((car) => car.id !== carId));
            setSelectedCar(null);
        }
    };

    const handleUpdateCar = (updatedCar) => {
        setCars((prevCars) =>
            prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
        );
        setEditCar(null); // Cierra el modal después de actualizar
    };

    if (isMobile === null) {
        return null;
    }

    if (isMobile) {
        return (
            <div className={styles.mobileContainer}>
                <p className={styles.mobileMessage}>Este panel no está disponible en dispositivos móviles.</p>
                <button className={styles.backButton} onClick={() => navigate("/")}>Regresar al Inicio</button>
            </div>
        );
    }

    return (
        <Layout>
            <section className={styles.register}>
                <h2>Administración de Automóviles</h2>
                <div className="container">
                    <div className={styles.registerContainer}>
                        <div className={styles.registerFormContainer}>
                            <div className={styles.carList}>
                                <table className={styles.tableInfo}>
                                    <thead className={styles.tableHead}>
                                        <tr>
                                            <th>ID</th>
                                            <th>Imagen</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Serial</th>
                                            <th>Combustible</th>
                                            <th>Transmisión</th>
                                            <th>Categoría</th>
                                            <th>Precio</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className={styles.tableContent}>
                                        {cars.length > 0 ? (
                                            cars.map((car) => (
                                                <tr key={car.id}>
                                                    <td>{car.id}</td>
                                                    <td>
                                                        <img
                                                            src={car.images && car.images.length > 0 ? car.images[0] : "/placeholder.png"}
                                                            alt={`${car.brand} ${car.name}`}
                                                            className={styles.carImage}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "/placeholder.png";
                                                            }}
                                                        />
                                                    </td>
                                                    <td>{car.brand}</td>
                                                    <td>{car.model}</td>
                                                    <td>{car.serialNumber}</td>
                                                    <td>{car.fuelType}</td>
                                                    <td>{car.transmissionType}</td>
                                                    <td>{car.category?.name || "N/A"}</td>
                                                    <td>${car.reserveCost}</td>
                                                    <td>
                                                        <svg className={styles.tableIcon} viewBox="0 0 512 512">
                                                            <path fill={car.status ? "#63E6BE" : "#d21919"} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        <button className={styles.editButton} onClick={() => setEditCar(car)}>Editar</button>
                                                        <button className={styles.deleteButton} onClick={() => handleDeleteClick(car)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11">No hay autos disponibles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={styles.submitButton} type="button" onClick={() => navigate("/register-car")}>
                        Registrar nuevo Auto
                    </button>
                </div>
            </section>

            {selectedCar && (
                <DeleteModal
                    car={selectedCar}
                    onClose={() => setSelectedCar(null)}
                    onConfirm={confirmDelete}
                />
            )}
            {warningCar && <WarningModal car={warningCar} />}
            {editCar && (
                <EditCarModal 
                    car={editCar} 
                    onClose={() => setEditCar(null)} 
                    onUpdate={handleUpdateCar}
                />
            )}
        </Layout>
    );
};

export default Dashboard;
