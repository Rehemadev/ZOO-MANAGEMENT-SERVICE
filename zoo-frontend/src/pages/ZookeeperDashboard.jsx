import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const ZookeeperDashboard = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('/zookeeper_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="glass-panel fade-in" style={{ padding: '40px', marginBottom: '30px' }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Staff Terminal</h1>
                            <p style={{ color: 'var(--text-muted)' }}>Welcome back, <span className="text-gradient" style={{ fontWeight: '600' }}>{user?.fullName || 'Zookeeper'}</span></p>
                        </div>
                        <button className="btn-premium" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' }} onClick={handleLogout}>
                            Switch Off
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <Link to="/zookeeper/schedules" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in" style={{ padding: '40px', height: '100%', borderLeft: '4px solid #f59e0b' }}>
                                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🥣</div>
                                <h3 style={{ color: 'white', marginBottom: '12px' }}>Feeding Schedules</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Monitor and update dietary requirements for active exhibits.</p>
                                <div className="mt-4" style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px' }}>ACCESS SCHEDULES →</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 mb-4">
                        <Link to="/zookeeper/records" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in" style={{ padding: '40px', height: '100%', borderLeft: '4px solid #ef4444' }}>
                                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏥</div>
                                <h3 style={{ color: 'white', marginBottom: '12px' }}>Health Records</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Log medical treatments and track recovery progress for animals.</p>
                                <div className="mt-4" style={{ color: '#ef4444', fontWeight: '600', fontSize: '14px' }}>OPEN RECORDS →</div>
                            </div>
                        </Link>
                    </div>
                </div>
                
                <div className="glass-panel fade-in text-center" style={{ padding: '20px', marginTop: '20px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>System Status: <span style={{ color: '#22c55e' }}>● Operational</span> | ZMS Core v2.4.0</span>
                </div>
            </div>
        </div>
    );
};

export default ZookeeperDashboard;

