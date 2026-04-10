import React from 'react';
import { useNavigate } from 'react-router-dom';

const Placeholder = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5 text-center">
            <h3>{title}</h3>
            <p className="lead mt-3">This page is currently under construction!</p>
            <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>
                &larr; Go Back
            </button>
        </div>
    );
};

export default Placeholder;
