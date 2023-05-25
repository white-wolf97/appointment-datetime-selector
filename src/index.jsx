import React from "react";
import { PropTypes } from "prop-types";
import { Calendar } from "react-multi-date-picker";
import { FormHelperText } from "@mui/material";
import { Spinner } from "react-bootstrap";

/**
 * AppointmentDatetimeSelector Component.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onSelect - A function that is called when a given time is selected.
 * @param {string} props.dataTestId - The test ID for the component.
 */
const AppointmentDatetimeSelector = ({
    dateHasError,
    dateErrorMessage,
    timeHasError,
    timeErrorMessage,
    dayAvailability,
    loadingDayAvailability,
    onSelect,
    dataTestId,
    shouldShowTimeZoneDisclaimer,
    timeZoneDisclaimerText,
    ...rest
}) => {
    return (
        <>
            <Calendar
                value={selectedDate}
                onChange={handleChangeSelectedDate}
                locale={spanish_es_lowercase}
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
                        <div className="avaibility-time-container">
                            {dayAvailability.map((time, index) => (
                                <AvailabilityTimeSlot
                                    time={time}
                                    key={time}
                                    index={index}
                                    selectedTime={selectedTime}
                                    setSelectedTime={setSelectedTime}
                                />
                            ))}
                            {shouldShowTimeZoneDisclaimer && (
                                <>
                                    <FormHelperText>
                                        {timeZoneDisclaimerText}
                                    </FormHelperText>
                                </>
                            )}
                            {timeHasError && (
                                <div className="m-4 mb-0 mt-0">
                                    <FormHelperText error>
                                        {timeErrorMessage}
                                    </FormHelperText>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

AppointmentDatetimeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    dataTestId: PropTypes.string.isRequired,
};

AppointmentDatetimeSelector.defaultProps = {};

export default AppointmentDatetimeSelector;
