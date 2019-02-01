import React from "react";

const Input = ({ name, label, value, onChange, type, placeholder, errormessage }) => {
    return (
        <div className="form__champ">
            <label htmlFor={name} className="form__label">{label}</label>
            <input
                type={type}
                className="form__input"
                id={name}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            <small id="emailHelp">{errormessage}</small>
        </div>
    );
};

export default Input;
