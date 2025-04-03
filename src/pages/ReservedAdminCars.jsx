import Layout from "../components/layout/Layout";
import { useState, useEffect, useCallback } from "react";
import PageTitle from "../components/pageTitle/PageTitle";
import { getAllReserves } from "../api/cars";
import ReservedCarCard from "../components/reservedCars/ReservedCarCard";
import styles from "./ReservedCars.module.css"

const ReservedAdminCars = () => {

	const [reserveCars, setReserveCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const username = localStorage.getItem("username");

	const fetchReserveCars = useCallback(async () => {
		if (!username) {
			setError("No se encontró un usuario autenticado.");
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const data = await getAllReserves();
			setReserveCars(data || []);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [username]);

	useEffect(() => {
		fetchReserveCars();
	}, [fetchReserveCars]);

	return (
		<Layout>
			<PageTitle title={"Lista de autos reservados"} />
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

export default ReservedAdminCars;
