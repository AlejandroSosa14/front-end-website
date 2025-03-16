import { useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";

import "react-calendar/dist/Calendar.css";
import styles from "./CarCalendars.module.css";

const CarCalendars = ({ unavailableDates }) => {
	const [currentDate, setCurrentDate] = useState(new Date());

	// Convertir las cadenas de unavailableDates a objetos Date
	const unavailableDatesTransformed = unavailableDates.map((date) => dayjs(date).toDate());

	// Función para verificar si la fecha está deshabilitada
	const isDateUnavailable = (date) => {
		return unavailableDatesTransformed.some((unavailableDate) => {
			return (
				unavailableDate.getDate() === date.getDate() &&
				unavailableDate.getMonth() === date.getMonth() &&
				unavailableDate.getFullYear() === date.getFullYear()
			);
		});
	};

	// Función para verificar si el día ya pasó
	const isPastDate = (date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	const isSameDay = (date1, date2) => {
		return dayjs(date1).isSame(dayjs(date2), "day");
	};

	// Definir nombre de clase CSS para  cada día
	const tileClassName = ({ date, view }) => {
		if (view === "month") {
			if (isPastDate(date)) {
				return styles.pastDate;
			} else if (isDateUnavailable(date)) {
				return styles.unavailableDate;
			} else if (isSameDay(date, new Date())) {
				console.log("Día actual:", date, "Clase aplicada:", styles.today);
				return styles.today;
			}
		}
		return "";
	};

	// Deshabilitar navegación al mes anterior
	const isPrevMonthDisabled = (activeStartDate) => {
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		return (
			activeStartDate.getMonth() === currentMonth && activeStartDate.getFullYear() === currentYear
		);
	};

	// Función para formatear el nombre del mes con la primera letra en mayúscula
	const formatMonthYear = ({ date }) => {
		const month = date.toLocaleString("es", { month: "long" });
		const year = date.getFullYear();
		return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
	};

	return (
		<div className={styles.calendarContainer}>
			<Calendar
				value={currentDate}
				onChange={setCurrentDate}
				tileClassName={tileClassName}
				minDate={new Date()}
				prev2Label={null}
				next2Label={null}
				prevLabel={"‹"}
				nextLabel="›"
				prevAriaLabel="Mes anterior"
				nextAriaLabel="Mes siguiente"
				prev2AriaLabel={null}
				next2AriaLabel={null}
				prevButtonDisabled={isPrevMonthDisabled(currentDate)}
				navigationLabel={formatMonthYear}
			/>
		</div>
	);
};

export default CarCalendars;
