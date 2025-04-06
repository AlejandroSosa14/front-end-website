import { useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "react-calendar/dist/Calendar.css";
import styles from "./CarCalendars.module.css";
import Swal from "sweetalert2";
import CarReservation from "../modal/CarReservation"; // Importa el modal

// Extender dayjs con el plugin isBetween
dayjs.extend(isBetween);

const CarCalendars = ({ unavailableDates }) => {
	const [selectedRange, setSelectedRange] = useState([null, null]);
	const [confirmedRange, setConfirmedRange] = useState(null);
	const [isPendingConfirmation, setIsPendingConfirmation] = useState(false);
	const [showReservationModal, setShowReservationModal] = useState(false);

	const unavailableDatesDayjs = unavailableDates.map((date) => dayjs(date));

	const isDateUnavailable = (date) => {
		return unavailableDatesDayjs.some((unavailableDate) =>
			dayjs(date).isSame(unavailableDate, "day")
		);
	};

	const isDateInTempRange = (date) => {
		if (!selectedRange[0]) return false;
		if (!selectedRange[1]) return dayjs(date).isSame(selectedRange[0], "day");
		return (
			dayjs(date).isSame(selectedRange[0], "day") ||
			dayjs(date).isSame(selectedRange[1], "day") ||
			dayjs(date).isBetween(selectedRange[0], selectedRange[1], "day", "()")
		);
	};

	const isDateInConfirmedRange = (date) => {
		if (!confirmedRange) return false;
		const [start, end] = confirmedRange;
		return dayjs(date).isBetween(start, end, "day", "[]");
	};

	const tileClassName = ({ date, view }) => {
		if (view === "month") {
			if (isDateUnavailable(date)) {
				return styles.unavailableDate;
			}
			if (isPendingConfirmation && isDateInTempRange(date)) {
				return styles.tempSelectedDate;
			}
			if (isDateInConfirmedRange(date)) {
				return styles.confirmedRangeDate;
			}
		}
		return "";
	};

	const isRangeValid = (start, end) => {
		if (!start || !end) return false;
		return !unavailableDatesDayjs.some((unavailableDate) =>
			dayjs(unavailableDate).isBetween(start, end, "day", "[]")
		);
	};

	const handleDateChange = (newDate) => {
		if (!selectedRange[0] || (selectedRange[0] && selectedRange[1])) {
			setSelectedRange([newDate, null]);
			setIsPendingConfirmation(false);
		} else {
			const newRange = [selectedRange[0], newDate];

			if (!isRangeValid(newRange[0], newRange[1])) {
				Swal.fire("Error", "El rango seleccionado incluye fechas no disponibles.", "error");
				setSelectedRange([null, null]);
				return;
			}

			setIsPendingConfirmation(true);

			const formattedStartDate = dayjs(newRange[0]).format("DD/MM/YYYY");
			const formattedEndDate = dayjs(newRange[1]).format("DD/MM/YYYY");

			Swal.fire({
				title: "Confirmar Rango",
				text: `Fecha de inicio: ${formattedStartDate}\nFecha de fin: ${formattedEndDate}`,
				icon: "info",
				showCancelButton: true,
				confirmButtonText: "Aceptar",
				cancelButtonText: "Cancelar",
			}).then((result) => {
				if (result.isConfirmed) {
					setConfirmedRange(newRange);
					localStorage.setItem("selectedStartDate", formattedStartDate);
					localStorage.setItem("selectedEndDate", formattedEndDate);
				}
				setSelectedRange([null, null]);
				setIsPendingConfirmation(false);
			});
		}
	};

	return (
		<div className={styles.calendarContainer}>
			<Calendar
				onClickDay={handleDateChange}
				tileClassName={tileClassName}
				minDate={new Date()}
				prev2Label={null}
				next2Label={null}
				prevAriaLabel="Mes anterior"
				nextAriaLabel="Mes siguiente"
				formatMonthYear={(locale, date) => dayjs(date).format("MMMM YYYY")}
			/>

			{showReservationModal && confirmedRange && (
				<CarReservation
					onClose={() => setShowReservationModal(false)}
					startDate={dayjs(confirmedRange[0]).format("DD/MM/YYYY")}
					endDate={dayjs(confirmedRange[1]).format("DD/MM/YYYY")}
				/>
			)}
		</div>
	);
};

export default CarCalendars;
