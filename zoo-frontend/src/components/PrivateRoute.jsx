import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ children, roles }) => {
    const user = authService.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        // Redirection based on actual role
        if (user.role === 'ADMIN') return <Navigate to="/admin" />;
        if (user.role === 'ZOOKEEPER') return <Navigate to="/zookeeper" />;
        if (user.role === 'VISITOR') return <Navigate to="/visitor" />;
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
