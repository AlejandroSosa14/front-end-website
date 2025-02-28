import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const DeleteModal = ({ car, onConfirm }) => {
    if (!car) return null;

    Swal.fire({
        title: "Confirmar Eliminación",
        html: `¿Estás seguro de que deseas eliminar el auto <strong>${car.brand} ${car.model}</strong>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm(car.id);
        }
    });

    return null;
};

export default DeleteModal;
