import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const AdminDashboard = () => {
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
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: '#1e293b', fontWeight: '800' }}>Admin Command</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Management Overview for <span className="text-gradient" style={{ fontWeight: '700' }}>{user?.fullName || 'Administrator'}</span></p>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-4">
                        <Link to="/admin/animals" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '32px', background: 'white', borderLeft: '4px solid var(--primary)' }}>
                                <div style={{ fontSize: '40px', marginBottom: '20px' }}>🦁</div>
                                <h3 style={{ color: '#1e293b', marginBottom: '12px', fontWeight: '700' }}>Inhabitants</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>Add, update, or remove animals from the sanctuary database.</p>
                                <div className="mt-4" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '13px' }}>OPEN DATABASE →</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/admin/staff" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '32px', background: 'white', borderLeft: '4px solid #3b82f6' }}>
                                <div style={{ fontSize: '40px', marginBottom: '20px' }}>👥</div>
                                <h3 style={{ color: '#1e293b', marginBottom: '12px', fontWeight: '700' }}>Personnel</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>View and manage staff accounts and security permissions.</p>
                                <div className="mt-4" style={{ color: '#3b82f6', fontWeight: '700', fontSize: '13px' }}>VIEW DIRECTORY →</div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/admin/reports" style={{ textDecoration: 'none' }}>
                            <div className="glass-card fade-in h-100" style={{ padding: '32px', background: 'white', borderLeft: '4px solid #f59e0b' }}>
                                <div style={{ fontSize: '40px', marginBottom: '20px' }}>📊</div>
                                <h3 style={{ color: '#1e293b', marginBottom: '12px', fontWeight: '700' }}>Revenue</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>Analyze ticket bookings and sanctuary revenue metrics.</p>
                                <div className="mt-4" style={{ color: '#f59e0b', fontWeight: '700', fontSize: '13px' }}>VIEW ANALYTICS →</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
