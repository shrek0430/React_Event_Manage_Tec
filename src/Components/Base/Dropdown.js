import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const BaseDropdown = ({
    toggleText,
    items,
    className,
    direction,
    isNav,
    buttonClass,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Dropdown isOpen={isOpen} toggle={toggle} className={className} direction={direction} nav={isNav}>
            <DropdownToggle tag="button" className={`btn ${buttonClass}`}>
                {toggleText}
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                {items.map((item, index) => (
                    <DropdownItem key={index} className="p-0">
                        {item}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

BaseDropdown.propTypes = {
    toggleText: PropTypes.node.isRequired, 
    items: PropTypes.arrayOf(PropTypes.node).isRequired, 
    className: PropTypes.string,
    direction: PropTypes.oneOf(["up", "down", "left", "right"]),
    isNav: PropTypes.bool,
    buttonClass: PropTypes.string,
};

BaseDropdown.defaultProps = {
    className: "",
    direction: "down",
    isNav: false,
    buttonClass: "",
};

export default BaseDropdown;
