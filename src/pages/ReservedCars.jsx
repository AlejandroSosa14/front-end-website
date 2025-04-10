import Layout from "../components/layout/Layout";
import { useState, useEffect, useCallback } from "react";
import PageTitle from "../components/pageTitle/PageTitle";
import styles from "./ReservedCars.module.css"
import ReservedCarCard from "../components/reservedCars/ReservedCarCard";
import { getReserveByUser } from "../api/cars";
import { getUserByName } from "../api/users";

const ReservedCars = () => {

	const [reserveCars, setReserveCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userId, setUserId] = useState(null);
	// const username = localStorage.getItem("username");

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const profile = await getUserByName();
				if (profile) {
					setUserId(profile.id);
				}
			} catch (error) {
				console.error("Error al obtener el perfil:", error);
			}
		};
	
		fetchUserProfile();
	}, []); // Se ejecuta solo una vez al montar el componente
	
	const fetchReserveCars = useCallback(async () => {
		if (!userId) {
			setError("No se encontró un usuario autenticado.");
			setLoading(false);
			return;
		}
	
		setLoading(true);
		setError(null);
		try {
			const data = await getReserveByUser(userId);
			setReserveCars(data || []);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [userId]); // Depende de `userId`
	
	useEffect(() => {
		if (userId) {
			fetchReserveCars();
		}
	}, [userId, fetchReserveCars]); 

	return (
		<Layout>
			<PageTitle title={"Mis autos reservados"} />
			<div className={styles.favoriteContainer}>
				{loading && <p>Cargando favoritos...</p>}
				{error && <p className={styles.error}>{error}</p>}
				{!loading && !error && reserveCars.length === 0 && <p>No tienes autos favoritos aún.</p>}
				{!loading && reserveCars.length > 0 && (
					<div className={styles.grid}>
						{reserveCars.map((car) => (
							<ReservedCarCard
								key={car.id}
								car={car}
							/>
						))}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default ReservedCars;
