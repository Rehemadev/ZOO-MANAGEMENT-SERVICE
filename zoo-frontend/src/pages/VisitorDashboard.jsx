import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const VisitorDashboard = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div className="glass-panel fade-in" style={{ padding: '40px', marginBottom: '30px', background: 'white' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#1e293b', fontWeight: '800' }}>Visitor Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Wildlife awaits you, <span className="text-gradient" style={{ fontWeight: '700' }}>{user?.fullName || 'Explorer'}</span></p>
                    </div>
                </div>

                <div className="glass-card fade-in" style={{ padding: '24px', marginBottom: '40px', border: 'none', background: 'white', boxShadow: '0 4px 20px rgba(5, 150, 105, 0.05)' }}>
                    <div className="text-center fw-bold text-gradient" style={{ fontSize: '1.1rem' }}>
                        🦁 LIVE EVENT: Feeding the Lions at 3:00 PM! Join us at the Main Habitat.
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/animals" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '32px', textAlign: 'center', background: 'white' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐾</div>
                                <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px' }}>Explore</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>Discover exotic and majestic species.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/book" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '32px', textAlign: 'center', background: 'white' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎟️</div>
                                <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px' }}>Tickets</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>Secure your entry to the sanctuary.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/events" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '32px', textAlign: 'center', background: 'white' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎪</div>
                                <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px' }}>Events</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>View live show timetables.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <Link to="/visitor/map" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '32px', textAlign: 'center', background: 'white' }}>
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🗺️</div>
                                <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px' }}>Map</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>Navigate the entire park easily.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitorDashboard;
