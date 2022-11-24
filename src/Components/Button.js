import React from 'react';

const Button = ({children}) => {
    return (
        <button className="btn bg-gradient-to-r from-primary to-secondary text-white btn-primary my-5">{children}</button>
    );
};

export default Button;