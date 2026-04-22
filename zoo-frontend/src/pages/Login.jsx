import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.login(email, password);
            if (user.role === 'ADMIN') navigate('/admin');
            else if (user.role === 'ZOOKEEPER') navigate('/zookeeper');
            else navigate('/visitor');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-dark)',
            padding: '20px'
        }}>
            <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '450px', padding: '48px', background: 'var(--bg-panel)' }}>
                <div className="text-center mb-8">
                    <div style={{ 
                        background: 'linear-gradient(135deg, var(--primary), #047857)',
                        width: '64px',
                        height: '64px',
                        borderRadius: '18px',
                        margin: '0 auto 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        fontWeight: '900',
                        color: 'white',
                        boxShadow: '0 10px 20px rgba(5, 150, 105, 0.2)'
                    }}>
                        ZMS
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '800' }}>Zoo Management</h1>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Access your sanctuary account</p>
                </div>

                <div style={{ 
                    display: 'flex', 
                    background: 'var(--bg-input)', 
                    borderRadius: '14px', 
                    padding: '5px',
                    marginBottom: '32px'
                }}>
                    <button className="w-50" style={{ 
                        background: 'white', 
                        border: 'none', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        color: '#1e293b',
                        fontWeight: '700',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>Sign In</button>
                    <button className="w-50" onClick={() => navigate('/register')} style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        color: '#64748b',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}>Register</button>
                </div>

                {error && (
                    <div className="alert-custom mb-4" style={{ 
                        padding: '12px 16px', 
                        background: '#fef2f2', 
                        border: '1px solid #fee2e2',
                        borderRadius: '12px',
                        color: '#ef4444',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@example.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                        />
                    </div>

                    <button type="submit" className="btn-premium btn-primary-gradient w-100" style={{ marginTop: '12px', height: '56px', fontSize: '16px' }}>
                        Sign In Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
