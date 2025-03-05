import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const WarningModal = ({ car }) => {
    if (!car) return null;

    if (!car.reservation) {
        Swal.fire({
            title: "Aviso",
            html: `El auto <strong>${car.brand} ${car.model}</strong> no se puede eliminar porque tiene una reserva en este momento.`,
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Entendido",
        });
    }

    return null;
};

export default WarningModal;
