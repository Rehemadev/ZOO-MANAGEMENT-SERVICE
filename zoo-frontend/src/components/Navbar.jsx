import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = authService.getCurrentUser();

    if (!user) return null;

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const adminLinks = [
        { path: '/admin', label: '📊 Dashboard' },
        { path: '/admin/animals', label: '🦁 Animals' },
        { path: '/admin/staff', label: '👥 Staff' },
        { path: '/admin/reports', label: '💰 Reports' },
    ];

    const zookeeperLinks = [
        { path: '/zookeeper', label: '📊 Dashboard' },
        { path: '/zookeeper/schedules', label: '🍖 Feeding' },
        { path: '/zookeeper/records', label: '🏥 Health' },
    ];

    const visitorLinks = [
        { path: '/visitor', label: '🏠 Home' },
        { path: '/visitor/animals', label: '🐾 Animals' },
        { path: '/visitor/book', label: '🎟️ Tickets' },
        { path: '/visitor/events', label: '🎪 Shows' },
    ];

    const links = user.role === 'ADMIN' ? adminLinks
        : user.role === 'ZOOKEEPER' ? zookeeperLinks
        : visitorLinks;

    const roleBadgeColor = user.role === 'ADMIN' ? 'danger' : user.role === 'ZOOKEEPER' ? 'warning' : 'info';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={links[0].path}>
                    🦒 Zoo Management
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {links.map(link => (
                            <li className="nav-item" key={link.path}>
                                <Link
                                    className={`nav-link ${location.pathname === link.path ? 'active fw-bold' : ''}`}
                                    to={link.path}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-light small">
                            {user.fullName} <span className={`badge bg-${roleBadgeColor} ms-1`}>{user.role}</span>
                        </span>
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
