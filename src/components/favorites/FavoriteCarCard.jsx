import { useNavigate } from "react-router-dom";
import HeartOutline from "../svgIcons/HeartOutline";
import Star from "../svgIcons/Star";
import CarOutline from "../svgIcons/CarOutline";
import styles from "./FavoriteCarCard.module.css";

const FavoriteCarCard = ({ car, onRemoveFavorite }) => {
    const navigate = useNavigate();
    let imageUrl = "/default-car.jpg";

    if (car.images?.length > 0) {
        try {
            const parsedImages = JSON.parse(car.images[0]);
            if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                imageUrl = parsedImages[0];
            }
        } catch (error) {
            console.warn("Error al parsear imágenes:", error);
        }
    }

    const isAvailable = car.status;

    const handleViewDetails = () => {
        navigate(`/auto/${car.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Función para quitar de favoritos
    const handleRemoveFavorite = () => {
        if (onRemoveFavorite) {
            onRemoveFavorite(car.id);
        }
    };

    return (
        <div className={styles.card}>
            {/* Sección Izquierda */}
            <div className={styles.cardContent}>
                <img className={styles.cardContent_image} src={imageUrl} alt={car.name} />
                <header className={styles.cardContent_header}>
                    <h3 className={styles.cardContent_title}>{car.brand} {car.name}</h3>
                    <h4 className={styles.cardContent_subtitle}>
                        {isAvailable ? "Disponible" : "No disponible"}
                    </h4>
                    <div className={styles.cardContent_detailsScores}>
                        <div className="flex-row align-middle">
                            <Star />
                            <span>4.5</span>
                        </div>
                        <div className="flex-row align-middle">
                            <CarOutline />
                            <span>5</span>
                        </div>
                    </div>
                    <div className={styles.detailsprice}>
                        <p>Precio: {`$${car.reserveCost} / día`}</p>
                    </div>
                </header>
            </div>
            <div className={styles.space}></div>
            {/* Sección Derecha */}
            <div className={styles.card_right}>
                <div className={styles.card_isFavorite}>
                    <button className="favoriteButton" onClick={handleRemoveFavorite}>
                        <HeartOutline />
                    </button>
                </div>
                <div className={styles.cardContent_detailsRental}>
                    <button className={styles.cardContent_button} onClick={handleViewDetails}>
                        Ver Detalle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCarCard;
