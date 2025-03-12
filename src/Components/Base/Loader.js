import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "reactstrap";

const BaseLoader = ({ size, color,className }) => {
    return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>
        <Spinner size={size} color={color} className="me-2" />
    </div>
    );
};

BaseLoader.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"]), 
    color: PropTypes.string, 
    className: PropTypes.string, 
};

BaseLoader.defaultProps = {
    size: "md",
    color: "primary",
    className: "",
};

export default BaseLoader;

