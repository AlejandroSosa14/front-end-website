import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getCarById } from "../../api/cars";
import { getUserByName } from "../../api/users";
import styles from "./CarReservation.module.css"; // Importa los estilos

const CarReservation = ({ onClose }) => {
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCarAndUser = async () => {
      const carId = localStorage.getItem("CarId");
      const userId = localStorage.getItem("userId");

      if (!carId) {
        console.error("No hay un ID de auto en localStorage");
        return;
      }

      const carData = await getCarById(carId);
      if (carData) setCar(carData);

      if (userId) {
        const userData = await getUserByName();
        if (userData) setUser(userData);
      }
    };

    fetchCarAndUser();
  }, []);

  useEffect(() => {
    if (!car || !user) return;

    Swal.fire({
      title: "Información de Reserva",
      html: `
        <div class="${styles.modalContent}">
          <label for='model'>Vehículo:</label>
          <input type='text' id='model' class='swal2-input' readonly />

          <label for='userInfo'>Contacto:</label>
          <input type='text' id='userInfo' class='swal2-input' readonly />

          <label for='reserveCost'>Precio de Reserva:</label>
          <input type='text' id='reserveCost' class='swal2-input' readonly />
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirmar Reserva",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: styles.customPopup, 
        confirmButton: styles.confirmButton,
        cancelButton: styles.cancelButton,
      },
      didOpen: () => {
        document.getElementById("model").value = `${car.brand} ${car.name}`;
        document.getElementById("userInfo").value = `${user.name} ${user.email}`;
        document.getElementById("reserveCost").value = `$${car.reserveCost}`;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Reserva confirmada");
      }
      onClose();
    });

  }, [car, user, onClose]);

  return null;
};

export default CarReservation;
