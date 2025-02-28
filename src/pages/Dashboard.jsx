import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import DeleteModal from "../components/modal/DeleteModal";
import WarningModal from "../components/modal/WarningModal";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [warningCar, setWarningCar] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch("http://localhost:8181/api/cars?page=0&size=10");
                if (!response.ok) throw new Error("Error al obtener los datos");
                const data = await response.json();
                setCars(data.content || []);
            } catch (error) {
                console.error("Error al obtener carros:", error);
            }
        };

        fetchCars();
    }, []);

    const handleDeleteClick = (car) => {
        setWarningCar(null);
        setSelectedCar(null);

        setTimeout(() => {
            if (!car.status) {
                setWarningCar(car);
            } else {
                setSelectedCar(car);
            }
        }, 10);
    };


    const confirmDelete = async (carId) => {
        try {
            const response = await fetch(`http://localhost:8181/api/cars/${carId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Basic " + btoa("administrador:password"),
                    "Content-Type": "application/json"
                },
                mode: "cors",
                credentials: "include"
            });
            
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al eliminar el auto");
            }
    
            setCars(cars.filter(car => car.id !== carId));
            setSelectedCar(null);
        } catch (error) {
            console.error("Error al eliminar el auto:", error);
        }
    };

    return (
        <Layout>
            <div className={styles.title}>
                <h1>Administración de Automóviles</h1>
            </div>
            <div className={styles.carList}>
                <table className={styles.tableInfo}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>ID</th>
                            <th>Marca</th>
                            <th>Modelo</th>
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
                                    <td>{car.brand}</td>
                                    <td>{car.model}</td>
                                    <td>{car.reserveCost}</td>
                                    <td>
                                        <svg className={styles.tableIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill={car.status ? "#63E6BE" : "#d21919"} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                        </svg>
                                    </td>
                                    <td>
                                        <div className={styles.iconCell}>
                                            <svg className={styles.tableIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                                fill="#d21919" onClick={() => handleDeleteClick(car)}>
                                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                                            </svg>
                                            <svg className={styles.tableIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#74C0FC" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" /></svg>
                                            <svg className={styles.tableIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="#898b0e" d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-192-32 0c-17.7 0-32-14.3-32-32z" /></svg>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No hay autos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedCar && (
                <DeleteModal
                    car={selectedCar}
                    onClose={() => setSelectedCar(null)}
                    onConfirm={confirmDelete}
                />
            )}
            {warningCar && <WarningModal car={warningCar} />}
        </Layout>
    );
};

export default Dashboard;
