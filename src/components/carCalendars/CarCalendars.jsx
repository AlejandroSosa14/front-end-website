import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";

import "react-calendar/dist/Calendar.css";
import styles from "./CarCalendars.module.css";

const CarCalendars = ({ unavailableDates }) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [firstCalendarMonth, setFirstCalendarMonth] = useState(
		dayjs(new Date()).startOf("month").toDate()
	);
	const [secondCalendarDate, setSecondCalendarDate] = useState(
		dayjs(new Date()).add(1, "month").toDate()
	);

	useEffect(() => {
		setSecondCalendarDate(dayjs(firstCalendarMonth).add(1, "month").toDate());
	}, [firstCalendarMonth]);

	const handleFirstCalendarChange = (newDate) => {
		setCurrentDate(newDate);
	};

	const handleFirstCalendarViewChange = ({ activeStartDate }) => {
		setFirstCalendarMonth(activeStartDate);
		setCurrentDate(activeStartDate);
	};

	const handleSecondCalendarViewChange = ({ activeStartDate }) => {
		const expectedFirstMonth = dayjs(secondCalendarDate).subtract(1, "month").startOf("month");
		if (dayjs(activeStartDate).isSame(dayjs(expectedFirstMonth).add(1, "month"), "month")) {
			setFirstCalendarMonth(dayjs(activeStartDate).subtract(1, "month").toDate());
			setCurrentDate(dayjs(activeStartDate).subtract(1, "month").toDate());
		}
	};

	const unavailableDatesDayjs = unavailableDates.map((date) => dayjs(date));

	const isDateUnavailable = (date) => {
		return unavailableDatesDayjs.some((unavailableDate) =>
			dayjs(date).isSame(unavailableDate, "day")
		);
	};

	const isPastDate = (date) => {
		return dayjs(date).isBefore(dayjs().startOf("day"));
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
		return dayjs(date).format("MMMM YYYY");
	};

	const isPrevMonthDisabledForFirstCalendar = (activeStartDate) => {
		return dayjs(activeStartDate).isSame(dayjs().startOf("month"), "month");
	};

	const isPrevMonthDisabledForSecondCalendar = (activeStartDate) => {
		return dayjs(activeStartDate).isSame(
			dayjs(currentDate).add(1, "month").startOf("month"),
			"month"
		);
	};

	return (
		<div className={styles.calendarContainer}>
			<Calendar
				value={currentDate}
				onChange={handleFirstCalendarChange}
				onActiveStartDateChange={handleFirstCalendarViewChange}
				tileClassName={tileClassName}
				minDate={new Date()}
				prev2Label={null}
				next2Label={null}
				prevAriaLabel="Mes anterior"
				nextAriaLabel="Mes siguiente"
				prevButtonDisabled={({ activeStartDate }) =>
					isPrevMonthDisabledForFirstCalendar(activeStartDate)
				}
				navigationLabel={formatMonthYear}
			/>
			<Calendar
				value={secondCalendarDate}
				onChange={() => {}}
				onActiveStartDateChange={handleSecondCalendarViewChange}
				tileClassName={tileClassName}
				minDate={new Date()}
				prev2Label={null}
				next2Label={null}
				prevAriaLabel="Mes anterior"
				nextAriaLabel="Mes siguiente"
				prevButtonDisabled={({ activeStartDate }) =>
					isPrevMonthDisabledForSecondCalendar(activeStartDate)
				}
				navigationLabel={formatMonthYear}
			/>
			<input type="date" name="fecha"></input>
		</div>
	);
};

export default CarCalendars;
