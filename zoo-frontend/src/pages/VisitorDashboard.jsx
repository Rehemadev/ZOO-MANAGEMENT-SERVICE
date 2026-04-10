import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const VisitorDashboard = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/visitor_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div className="glass-panel fade-in" style={{ padding: '40px', marginBottom: '30px' }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Explorer Hub</h1>
                            <p style={{ color: 'var(--text-muted)' }}>Wildlife awaits you, <span className="text-gradient" style={{ fontWeight: '600' }}>{user?.fullName || 'Explorer'}</span></p>
                        </div>
                        <button className="btn-premium" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' }} onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="glass-card fade-in" style={{ padding: '20px', marginBottom: '40px', border: 'none', background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))' }}>
                    <div className="text-center fw-bold text-gradient" style={{ fontSize: '1.2rem' }}>
                        🦁 LIVE EVENT: Feeding the Lions at 3:00 PM! Join us at the Main Habitat.
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/animals" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in" style={{ padding: '30px', height: '100%', textAlign: 'center' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🐾</div>
                                <h4 style={{ color: 'white' }}>Explore</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Discover exotic species.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/book" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in" style={{ padding: '30px', height: '100%', textAlign: 'center' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎟️</div>
                                <h4 style={{ color: 'white' }}>Tickets</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Secure your entry.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/events" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in" style={{ padding: '30px', height: '100%', textAlign: 'center' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎪</div>
                                <h4 style={{ color: 'white' }}>Events</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Show timetables.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/map" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in" style={{ padding: '30px', height: '100%', textAlign: 'center' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
                                <h4 style={{ color: 'white' }}>Map</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Navigate the park.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitorDashboard;


