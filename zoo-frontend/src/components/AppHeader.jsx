import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './AppHeader.css';

const AppHeader = () => {
    const location = useLocation();
    const user = authService.getCurrentUser();
    
    // Map paths to friendly names
    const getPageTitle = (path) => {
        const parts = path.split('/').filter(p => p);
        if (parts.length === 0) return 'Welcome';
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    };

    const navigate = useNavigate();
    const [theme, setTheme] = React.useState(localStorage.getItem('zoo-theme') || 'light');

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('zoo-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            const currentPath = location.pathname;
            navigate(`${currentPath}?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header className="app-header">
            <div className="app-header__left">
                <h2 className="app-header__title">{getPageTitle(location.pathname)}</h2>
                <div className="app-header__breadcrumb">
                    <span>ZMS</span>
                    <span className="app-header__sep">/</span>
                    <span className="app-header__current">{getPageTitle(location.pathname)}</span>
                </div>
            </div>
            
            <div className="app-header__right">
                <div className="app-header__search">
                    <span className="app-header__search-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        onKeyDown={handleSearch}
                        defaultValue={new URLSearchParams(location.search).get('search') || ''}
                    />
                </div>
                
                <div className="app-header__actions">
                    <button 
                        className="theme-toggle-btn" 
                        onClick={toggleTheme} 
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '14px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-panel)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: 'var(--shadow-sm)',
                            padding: 0
                        }}
                    >
                        {theme === 'dark' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/>
                            </svg>
                        )}
                    </button>
                </div>
                
                <div className="app-header__divider"></div>
                
                <div className="app-header__date">
                    <span className="app-header__date-icon">📅</span>
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
