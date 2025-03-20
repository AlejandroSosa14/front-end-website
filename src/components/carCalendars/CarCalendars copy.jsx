import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";

import "react-calendar/dist/Calendar.css";
import styles from "./CarCalendars.module.css";

const CarCalendars = ({ unavailableDates }) => {
	const [currentDate, setCurrentDate] = useState(new Date());

	// Convierte las fechas no disponibles a objetos Date
	const unavailableDatesTransformed = unavailableDates.map((date) => dayjs(date).toDate());

	const isDateUnavailable = (date) => {
		return unavailableDatesTransformed.some((unavailableDate) => {
			return (
				unavailableDate.getDate() === date.getDate() &&
				unavailableDate.getMonth() === date.getMonth() &&
				unavailableDate.getFullYear() === date.getFullYear()
			);
		});
	};

	const isPastDate = (date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	const isSameDay = (date1, date2) => dayjs(date1).isSame(dayjs(date2), "day");

	const tileClassName = ({ date, view }) => {
		if (view === "month") {
			if (isPastDate(date)) {
				return styles.pastDate;
			} else if (isDateUnavailable(date)) {
				return styles.unavailableDate;
			} else if (isSameDay(date, new Date())) {
				return styles.today;
			}
		}
		return "";
	};

	const formatMonthYear = ({ date }) => {
		const month = date.toLocaleString("es", { month: "long" });
		const year = date.getFullYear();
		return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
	};

	// Función para manejar el cambio de fecha en el primer calendario
	const handleFirstCalendarChange = (newDate) => {
		setCurrentDate(newDate);
	};

	// Calcular el mes siguiente al del primer calendario
	const nextMonthDate = dayjs(currentDate).add(1, "month").toDate();

	// Función para deshabilitar el botón "mes anterior" en el primer calendario
	const isPrevMonthDisabledForFirstCalendar = (activeStartDate) => {
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const isDisabled =
			activeStartDate.getMonth() === currentMonth && activeStartDate.getFullYear() === currentYear;
		console.log("isDisabled on first calendar? ", isDisabled);
		return isDisabled;
	};

	// Función para deshabilitar el botón "mes anterior" en el segundo calendario
	const isPrevMonthDisabledForSecondCalendar = (activeStartDate) => {
		// Aquí calculamos el mes siguiente al primer calendario
		const firstCalendarNextMonth = dayjs(currentDate).add(1, "month").startOf("month");
		// Compara si el mes mostrado en el segundo calendario es el mes siguiente al primero
		const isDisabled = dayjs(activeStartDate).isSame(firstCalendarNextMonth, "month");
		console.log("isDisabled on second calendar? ", isDisabled);
		return isDisabled;
	};

	return (
		<div className={styles.calendarContainer}>
			{/* Primer calendario */}
			<Calendar
				value={currentDate}
				onChange={handleFirstCalendarChange}
				tileClassName={tileClassName}
				minDate={new Date()}
				prev2Label={null}
				next2Label={null}
				prevAriaLabel="Mes anterior"
				nextAriaLabel="Mes siguiente"
				prevButtonDisabled={isPrevMonthDisabledForFirstCalendar(currentDate)} // Deshabilitar si estamos en el mes actual
				navigationLabel={formatMonthYear}
			/>
			{/* Segundo calendario (mes siguiente al del primero) */}
			<Calendar
				value={nextMonthDate} // El segundo calendario siempre muestra el siguiente mes
				onChange={handleFirstCalendarChange} // Sincronizamos con el primer calendario
				tileClassName={tileClassName}
				minDate={new Date()}
				prev2Label={null}
				next2Label={null}
				prevAriaLabel="Mes anterior"
				nextAriaLabel="Mes siguiente"
				prevButtonDisabled={isPrevMonthDisabledForSecondCalendar(nextMonthDate)} // Deshabilitar si es el siguiente mes
				navigationLabel={formatMonthYear}
			/>
		</div>
	);
};

export default CarCalendars;
