import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import './Sidebar.css';

const Sidebar = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    if (!user) return children;

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const adminLinks = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/animals', label: 'Animals', icon: '🦁' },
        { path: '/admin/staff', label: 'Staff', icon: '👥' },
        { path: '/admin/reports', label: 'Reports', icon: '💰' },
    ];

    const zookeeperLinks = [
        { path: '/zookeeper', label: 'Dashboard', icon: '📊' },
        { path: '/zookeeper/schedules', label: 'Feeding', icon: '🍖' },
        { path: '/zookeeper/records', label: 'Health', icon: '🏥' },
    ];

    const visitorLinks = [
        { path: '/visitor', label: 'Dashboard', icon: '🏠' },
        { path: '/visitor/animals', label: 'Animals', icon: '🐾' },
        { path: '/visitor/book', label: 'Tickets', icon: '🎟️' },
        { path: '/visitor/events', label: 'Events', icon: '🎪' },
        { path: '/visitor/map', label: 'Map', icon: '🗺️' },
    ];

    const links = user.role === 'ADMIN' ? adminLinks
        : user.role === 'ZOOKEEPER' ? zookeeperLinks
        : visitorLinks;

    const roleLabel = user.role === 'ADMIN' ? 'Administrator' 
        : user.role === 'ZOOKEEPER' ? 'Zookeeper' 
        : 'Visitor';

    const roleColor = user.role === 'ADMIN' ? '#ef4444' 
        : user.role === 'ZOOKEEPER' ? '#f59e0b' 
        : '#3b82f6';

    return (
        <div className="sidebar-layout">
            {/* Sidebar */}
            <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
                {/* Brand */}
                <div className="sidebar__brand">
                    <div className="sidebar__logo">ZMS</div>
                    {!collapsed && <span className="sidebar__brand-text">Zoo Management</span>}
                </div>

                {/* Toggle Button */}
                <button className="sidebar__toggle" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <span className="sidebar__toggle-icon">{collapsed ? '→' : '←'}</span>
                </button>

                {/* Navigation Links */}
                <nav className="sidebar__nav">
                    {links.map(link => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                                title={link.label}
                            >
                                <span className="sidebar__link-icon">{link.icon}</span>
                                {!collapsed && <span className="sidebar__link-label">{link.label}</span>}
                                {isActive && !collapsed && <span className="sidebar__link-dot"></span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info & Logout */}
                <div className="sidebar__footer">
                    <div className="sidebar__user">
                        <div className="sidebar__avatar" style={{ background: roleColor }}>
                            {(user.fullName || 'U').charAt(0).toUpperCase()}
                        </div>
                        {!collapsed && (
                            <div className="sidebar__user-info">
                                <div className="sidebar__user-name">{user.fullName || 'User'}</div>
                                <div className="sidebar__user-role" style={{ color: roleColor }}>{roleLabel}</div>
                            </div>
                        )}
                    </div>
                    <button 
                        className={`sidebar__logout ${collapsed ? 'sidebar__logout--collapsed' : ''}`}
                        onClick={handleLogout}
                        title="Logout"
                    >
                        {collapsed ? '🚪' : '🚪 Logout'}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`sidebar-content ${collapsed ? 'sidebar-content--expanded' : ''}`}>
                <AppHeader />
                <div className="sidebar-content__inner">
                    {children}
                </div>
                <AppFooter />
            </main>
        </div>
    );
};

export default Sidebar;
