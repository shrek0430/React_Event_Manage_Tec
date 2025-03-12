    import React, { useState } from "react";
    import PropTypes from "prop-types";
    import { Input, Label, FormGroup, FormFeedback, Button } from "reactstrap";

    const BaseInput = ({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    required,
    passwordToggle,
    minLength,
    maxLength,
    rows,
    disabled,
    className,
    ...props
    }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChange=(e)=>{
        const {name,value}=e.target;


        if (type === "number" && !/^\d*$/.test(value)) {
            return;
        }
        onChange(e);
    };

    
    return (
        <FormGroup>
        {label && (
            <Label for={name}>
            {label} {required && <span className="text-danger">*</span>}
            </Label>
        )}

        <div className="position-relative">
            <Input
            type={passwordToggle ? (showPassword ? "text" : "password") : type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            invalid={!!error}
            className={className}
            minLength={minLength}
            maxLength={maxLength}
            rows={rows} 
            disabled={disabled} 
            {...props}
            />

            {passwordToggle && (
            <Button
                type="button"
                color="link"
                className="position-absolute end-0 top-0 me-2 text-muted"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled} 
            >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
            </Button>
            )}
        </div>

        {error && <FormFeedback>{error}</FormFeedback>}
        </FormGroup>
    );
    };

    BaseInput.defaultProps = {
    type: "text",
    placeholder: "",
    required: false,
    passwordToggle: false,
    minLength: undefined,
    maxLength: undefined,
    rows: undefined, 
    disabled: false, 
    className: "",
    };

    BaseInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    required: PropTypes.bool,
    passwordToggle: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    rows: PropTypes.number, 
    disabled: PropTypes.bool, 
    className: PropTypes.string,
    };

    export default BaseInput;
