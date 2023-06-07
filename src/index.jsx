import React from "react";
import { PropTypes } from "prop-types";
import { Calendar } from "react-multi-date-picker";
import { FormHelperText, Radio } from "@mui/material";
import { Spinner } from "react-bootstrap";
import "./index.css";
import { format, parse, parseISO } from "date-fns";

const AppointmentDatetimeSelector = ({
    availableDays,
    calendarLocale,
    selectedDate,
    handleChangeSelectedDate,
    dateHasError,
    dateErrorMessage,
    selectedTime,
    timeHasError,
    timeErrorMessage,
    dayAvailability,
    loadingDayAvailability,
    onSelect,
    shouldShowTimeZoneDisclaimer,
    timeZoneDisclaimerText,
}) => {
    const handleChangeSelectedTime = (event) => {
        onSelect({ time: event.target.value, date: selectedDate });
    };

    return (
        <>
            <Calendar
                value={selectedDate}
                onChange={handleChangeSelectedDate}
                locale={calendarLocale}
                mapDays={(params) =>
                    mapAvailableDays({ ...params, availableDays })
                }
            />
            {dateHasError && (
                <div className="m-4 mb-0 mt-0">
                    <FormHelperText error>{dateErrorMessage}</FormHelperText>
                </div>
            )}
            {loadingDayAvailability ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <>
                    {dayAvailability && dayAvailability.length > 0 && (
                        <>
                            <div className="avaibility-time-container">
                                {dayAvailability.map((time, index) => (
                                    <AvailabilityTimeSlot
                                        time={time}
                                        key={time}
                                        index={index}
                                        selectedTime={selectedTime}
                                        onChange={handleChangeSelectedTime}
                                    />
                                ))}

                                {timeHasError && (
                                    <div className="m-4 mb-0 mt-0">
                                        <FormHelperText error>
                                            {timeErrorMessage}
                                        </FormHelperText>
                                    </div>
                                )}
                            </div>
                            {shouldShowTimeZoneDisclaimer && (
                                <>
                                    <FormHelperText>
                                        {timeZoneDisclaimerText}
                                    </FormHelperText>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

AppointmentDatetimeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    availableDays: PropTypes.array.isRequired,
    handleChangeSelectedDate: PropTypes.func.isRequired,
    selectedTime: PropTypes.string,
    dateHasError: PropTypes.bool,
    dateErrorMessage: PropTypes.string,
    timeHasError: PropTypes.bool,
    timeErrorMessage: PropTypes.string,
    dayAvailability: PropTypes.arrayOf(PropTypes.string),
    loadingDayAvailability: PropTypes.bool,
    shouldShowTimeZoneDisclaimer: PropTypes.bool,
    timeZoneDisclaimerText: PropTypes.string,
    selectedDate: PropTypes.any,
    calendarLocale: PropTypes.object,
};

AppointmentDatetimeSelector.defaultProps = {
    calendarLocale: spanish_es_lowercase,
    shouldShowTimeZoneDisclaimer: false,
    selectedTime: "",
    dateHasError: false,
    dateErrorMessage: "Debe seleccionar una fecha",
    timeHasError: false,
    timeErrorMessage: "Debe seleccionar una hora",
    dayAvailability: [],
    loadingDayAvailability: false,
    timeZoneDisclaimerText: "Todas las horas son en horario de Uruguay (UTC-3)",
    selectedDate: "",
    availableDays: [],
};

export default AppointmentDatetimeSelector;

//Helper components and functions

const AvailabilityTimeSlot = ({ time, selectedTime, onChange, index }) => {
    let timeSlot = time.split(":");
    if (timeSlot.length > 2) {
        timeSlot = timeSlot[0] + ":" + timeSlot[1]; //removing seconds
    } else {
        timeSlot = time;
    }

    return (
        <div className="day-time-availability">
            <span>{timeSlot}</span>
            <Radio
                key={time}
                checked={selectedTime === time}
                onChange={onChange}
                data-testid={`time-slot-${index}`}
                value={time}
                name="radio-buttons"
                inputProps={{ "aria-label": time }}
            />
        </div>
    );
};

AvailabilityTimeSlot.propTypes = {
    time: PropTypes.string.isRequired,
    selectedTime: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

const spanish_es_lowercase = {
    name: "spanish_es_lowercase",
    months: [
        ["Enero", "Ene"],
        ["Febrero", "Feb"],
        ["Marzo", "Mar"],
        ["Abril", "Abr"],
        ["Mayo", "May"],
        ["Junio", "Jun"],
        ["julio", "Jul"],
        ["Agosto", "Ago"],
        ["Septiembre", "Sep"],
        ["Octubre", "Oct"],
        ["Noviembre", "Nov"],
        ["Diciembre", "Dic"],
    ],
    weekDays: [
        ["Sábado", "Sáb"],
        ["Domingo", "Dom"],
        ["Lunes", "Lun"],
        ["Martes", "Mar"],
        ["Miércoles", "Mié"],
        ["Jueves", "Jue"],
        ["Viernes", "Vie"],
    ],
    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    meridiems: [
        ["AM", "am"],
        ["PM", "pm"],
    ],
};

const parseDateAppointmentCalendar = (date) => {
    return typeof date === "string"
        ? parse(date, "yyyy-MM-dd", today())
        : parse(date.toString(), "yyyy/MM/dd", today());
};

const today = () => {
    return parseISO(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"));
};

const mapAvailableDays = ({
    date,
    today,
    selectedDate,
    currentMonth,
    isSameDate,
    availableDays,
}) => {
    let props = {};

    let isDisabled = !availableDays.includes(
        parseDateAppointmentCalendar(date).toString(),
    );

    if (isDisabled)
        return {
            disabled: true,
            style: { color: "#ccc" },
        };

    props.style = {
        borderRadius: "3px",
        color: "#0099DA",
        border: "1px solid #0099DA",
        backgroundColor: "transparent",
    };

    props["data-testid"] =
        "day-" +
        availableDays.indexOf(parseDateAppointmentCalendar(date).toString());

    if (isSameDate(date, today)) props.style.color = "black";
    if (isSameDate(date, selectedDate))
        props.style = {
            ...props.style,
            color: "white",
            fontWeight: "bold",
            backgroundColor:
                date.month.index === currentMonth.index ? "#0099DA" : " unset",
        };

    return props;
};
