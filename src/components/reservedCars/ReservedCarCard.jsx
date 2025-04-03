import { useNavigate } from "react-router-dom";
// import HeartOutline from "../svgIcons/HeartOutline";
import Star from "../svgIcons/Star";
// import CarOutline from "../svgIcons/CarOutline";
import styles from "./ReservedCarCard.module.css";

const ReservedCarCard = ({ car }) => {
    const navigate = useNavigate();
    let imageUrl = "/default-car.jpg";

    if (car.cars[0].images?.length > 0) {
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

    return (
        <div className={styles.card}>
            {/* Sección Izquierda */}
            <div className={styles.cardContent}>
                <img className={styles.cardContent_image} src={imageUrl} alt={car.cars[0].name} />
                <header className={styles.cardContent_header}>
                    <h3 className={styles.cardContent_title}>{car.cars[0].brand} {car.cars[0].name}</h3>
                    <h4 className={styles.cardContent_subtitle}>
                        {isAvailable ? "Disponible" : `No disponible - Reservado por ${car.user.name}`}
                    </h4>
                    <div className={styles.cardContent_detailsScores}>
                        <div className="flex-row align-middle">
                            <Star />
                            <span>4.5</span>
                        </div>
                        {/*  <div className="flex-row align-middle">
                            <CarOutline />
                            <span>5</span>
                        </div> */}
                    </div>
                    <div className={styles.detailsprice}>
                        <p>Precio: {`$${car.cars[0].reserveCost} / día`}</p>
                    </div>
                </header>
            </div>
            <div className={styles.space}></div>
            {/* Sección Derecha */}
            <div className={styles.card_right}>
                <div className={styles.cardContent_detailsRental}>
                    <button className={styles.cardContent_button} onClick={handleViewDetails}>
                        Ver Detalle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservedCarCard;
