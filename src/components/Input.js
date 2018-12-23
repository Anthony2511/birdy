import React from "react";

const Input = ({ name, label, value, onChange, type, placeholder }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className=""
                id={name}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
