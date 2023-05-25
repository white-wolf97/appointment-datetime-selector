import React from "react";
import { PropTypes } from "prop-types";


/**
 * AppointmentDatetimeSelector Component.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onSelect - A function that is called when a given time is selected.
 * @param {string} props.dataTestId - The test ID for the component.
 */
const AppointmentDatetimeSelector = ({
  onSelect,
  dataTestId,
  ...rest
}) => {

  return (
    <>
    </>
  );
};

AppointmentDatetimeSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,

};

AppointmentDatetimeSelector.defaultProps = {
};

export default AppointmentDatetimeSelector