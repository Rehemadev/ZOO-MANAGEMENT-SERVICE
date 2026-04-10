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
            background: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('/zoo_bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px'
        }}>
            <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '450px', padding: '48px' }}>
                <div className="text-center mb-8">
                    <div style={{ 
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: 'white',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                    }}>
                        ZMS
                    </div>
                    <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Zoo Management Service</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Secure Gateway to the Wildlife Ecosystem</p>
                </div>

                {/* Modern Switcher Button */}
                <div style={{ 
                    display: 'flex', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '12px', 
                    padding: '4px',
                    marginBottom: '32px'
                }}>
                    <button className="w-50" style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        border: 'none', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        color: 'white',
                        fontWeight: '600'
                    }}>Sign In</button>
                    <button className="w-50" onClick={() => navigate('/register')} style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                    }}>Register</button>
                </div>

                {error && (
                    <div className="alert-custom" style={{ 
                        padding: '12px 16px', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '12px',
                        color: '#f87171',
                        marginBottom: '24px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="operator@zms.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-premium btn-primary-gradient w-100" style={{ marginTop: '12px', height: '52px', fontSize: '16px' }}>
                        Authenticate Securely
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;


