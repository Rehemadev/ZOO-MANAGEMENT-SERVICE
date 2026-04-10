import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('VISITOR');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.register(fullName, email, password, role);
            if (user.role === 'ADMIN') navigate('/admin');
            else if (user.role === 'ZOOKEEPER') navigate('/zookeeper');
            else navigate('/visitor');
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message || 'Registration failed.';
            const detailMsg = err.response?.data?.details || '';
            setError(detailMsg ? `${errorMsg} (${detailMsg})` : errorMsg);
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
            <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '500px', padding: '48px' }}>
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
                    <p style={{ color: 'var(--text-muted)' }}>Initialize Operator Credentials</p>
                </div>

                {/* Modern Switcher Button */}
                <div style={{ 
                    display: 'flex', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '12px', 
                    padding: '4px',
                    marginBottom: '32px'
                }}>
                    <button className="w-50" onClick={() => navigate('/login')} style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                    }}>Sign In</button>
                    <button className="w-50" style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        border: 'none', 
                        borderRadius: '10px', 
                        padding: '10px', 
                        color: 'white',
                        fontWeight: '600'
                    }}>Register</button>
                </div>

                {error && (
                    <div style={{ 
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

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase' }}>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase' }}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@zms.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase' }}>Account Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="VISITOR">Visitor (Guest)</option>
                            <option value="ZOOKEEPER">Zookeeper (Staff)</option>
                            <option value="ADMIN">Administrator (Owner)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-premium btn-primary-gradient w-100" style={{ marginTop: '12px', height: '52px', fontSize: '16px' }}>
                        Create Operator Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;


