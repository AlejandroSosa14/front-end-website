import { useState, useEffect, useCallback } from "react";
import { getFavorites, removeFavorite } from "../api/favorites";
import Layout from "../components/layout/Layout";
import PageTitle from "../components/pageTitle/PageTitle";
import FavoriteCarCard from "../components/favorites/FavoriteCarCard";
import styles from "./FavoriteCars.module.css";

const FavoriteCars = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = localStorage.getItem("username");

    const fetchFavorites = useCallback(async () => {
        if (!username) {
            setError("No se encontró un usuario autenticado.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getFavorites(username);
            setFavorites(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    // Función para eliminar un favorito v2
    const handleRemoveFavorite = async (carId) => {
        const success = await removeFavorite(username, carId);
        if (success) {
            setFavorites((prevFavorites) => prevFavorites.filter(car => car.id !== carId));
        }
    };

    return (
        <Layout>
            <PageTitle title="Mis Autos Favoritos" />
            <div className={styles.favoriteContainer}>
                {loading && <p>Cargando favoritos...</p>}
                {error && <p className={styles.error}>{error}</p>}
                {!loading && !error && favorites.length === 0 && <p>No tienes autos favoritos aún.</p>}
                {!loading && favorites.length > 0 && (
                    <div className={styles.grid}>
                        {favorites.map((car) => (
                            <FavoriteCarCard 
                                key={car.id} 
                                car={car} 
                                onRemoveFavorite={handleRemoveFavorite} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default FavoriteCars;
