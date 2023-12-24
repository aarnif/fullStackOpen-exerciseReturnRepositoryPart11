import React, { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ buttonLabel, children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleIsVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <div style={{ display: isVisible ? "" : "none" }}>{children}</div>
      <button onClick={toggleIsVisible}>
        {isVisible ? "cancel" : buttonLabel}
      </button>
    </>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
