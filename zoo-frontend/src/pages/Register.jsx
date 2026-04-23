import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', role: 'VISITOR' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await authService.register(formData.fullName, formData.email, formData.password, formData.role);
            navigate('/login');
        } catch (err) {
            const data = err.response?.data;
            if (data && typeof data === 'object' && !data.error) {
                // Handle validation errors from MethodArgumentNotValidException
                const fieldErrors = Object.values(data).join(', ');
                setError(fieldErrors || 'Registration failed.');
            } else {
                setError(data?.error || 'Registration failed. Please try again.');
            }
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
            <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '500px', padding: '48px', background: 'var(--bg-panel)' }}>
                <div className="text-center mb-8">
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '800' }}>Join Sanctuary</h1>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Create your account to start exploring</p>
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

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            value={formData.fullName} 
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                            required 
                            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@example.com"
                            value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required 
                            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={formData.password} 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            required 
                            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={formData.confirmPassword} 
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                            required 
                            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>Account Type</label>
                        <select 
                            value={formData.role} 
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-main)' }}
                        >
                            <option value="VISITOR">Visitor / Explorer</option>
                            <option value="ZOOKEEPER">Staff / Zookeeper</option>
                        </select>
                    </div>



                    <button type="submit" className="btn-premium btn-primary-gradient w-100" style={{ marginTop: '12px', height: '56px', fontSize: '16px' }}>
                        Create Account
                    </button>
                    
                    <div className="text-center mt-4">
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
