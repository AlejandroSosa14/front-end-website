import { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const DeleteModalCategory = ({ category, onConfirm, onClose }) => {
    useEffect(() => {
        if (!category) return;

        Swal.fire({
            title: "Confirmar Eliminación",
            html: `¿Estás seguro de que deseas eliminar la categoría <strong>${category.name}</strong>?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await onConfirm(category.id);
                    Swal.fire("Eliminado", "La categoría ha sido eliminada con éxito", "success");
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        Swal.fire({
                            title: "No se puede eliminar",
                            text: "Esta categoría está en uso y no puede ser eliminada.",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                        });
                    } else {
                        Swal.fire("Error", "Hubo un problema al eliminar la categoría", "error");
                    }
                }
            }
            onClose(); // Cierra el modal después de la acción
        });

    }, [category, onConfirm, onClose]);

    return null;
};

export default DeleteModalCategory;