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
                    <button className="app-header__btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        <span className="app-header__btn-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
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
