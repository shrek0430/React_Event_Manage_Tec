import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "reactstrap";  

const BaseButton = ({
    children,
    color,
    size,
    onClick,
    disabled,
    className,
    loader, 
    loaderText, 
    type,  
    ...props
}) => {
    return (
        <Button
            color={color}
            size={size}
            onClick={onClick}
            disabled={disabled || loader} 
            className={className}
            type={type}  
            {...props}
        >
            {loader ? (
                <>
                    <Spinner size="sm" className="me-2" />  
                    {loaderText || "Loading..."} 
                </>
            ) : (
                children
            )}
        </Button>
    );
};


BaseButton.defaultProps = {
    color: "primary",      
    size: "md",            
    disabled: false,       
    className: "",         
    loader: false,        
    loaderText: "Loading...",  
    type: "button",          
};


BaseButton.propTypes = {
    children: PropTypes.node.isRequired,   
    color: PropTypes.string,               
    size: PropTypes.string,                
    onClick: PropTypes.func,               
    disabled: PropTypes.bool,              
    className: PropTypes.string,          
    loader: PropTypes.bool,               
    loaderText: PropTypes.string,         
    type: PropTypes.oneOf(["button", "submit", "reset"]),  
};

export default BaseButton;
