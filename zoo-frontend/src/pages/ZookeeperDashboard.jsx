import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const ZookeeperDashboard = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="glass-panel fade-in" style={{ padding: '40px', marginBottom: '30px', background: 'white' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#1e293b', fontWeight: '800' }}>Staff Portal</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome back, <span className="text-gradient" style={{ fontWeight: '700' }}>{user?.fullName || 'Zookeeper'}</span></p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <Link to="/zookeeper/schedules" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '40px', background: 'white', borderLeft: '4px solid #f59e0b' }}>
                                <div style={{ fontSize: '40px', marginBottom: '20px' }}>🥣</div>
                                <h3 style={{ color: '#1e293b', marginBottom: '12px', fontWeight: '700' }}>Feeding Schedules</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '15px' }}>Manage dietary requirements, feeding times, and food inventory for sanctuary residents.</p>
                                <div className="mt-4" style={{ color: '#f59e0b', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>VIEW SCHEDULES →</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 mb-4">
                        <Link to="/zookeeper/records" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '40px', background: 'white', borderLeft: '4px solid #ef4444' }}>
                                <div style={{ fontSize: '40px', marginBottom: '20px' }}>🏥</div>
                                <h3 style={{ color: '#1e293b', marginBottom: '12px', fontWeight: '700' }}>Medical Records</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '15px' }}>Monitor health status, log vaccinations, and update electronic health records for animals.</p>
                                <div className="mt-4" style={{ color: '#ef4444', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>VIEW RECORDS →</div>
                            </div>
                        </Link>
                    </div>
                </div>
                
                <div className="glass-panel fade-in text-center" style={{ padding: '24px', marginTop: '20px', background: 'white', border: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>SYSTEM STATUS: <span style={{ color: '#059669' }}>● OPERATIONAL</span> | ZMS CORE V2.4.0</span>
                </div>
            </div>
        </div>
    );
};

export default ZookeeperDashboard;
