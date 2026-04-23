import React, { useState, useEffect } from 'react';
import { userService } from '../../services/apiServices';
import authService from '../../services/authService';

const ManageStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'ZOOKEEPER'
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = () => {
        setLoading(true);
        userService.getAllStaff().then(data => {
            setStaff(data || []);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    };

    const handleRecruit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await authService.register(formData.fullName, formData.email, formData.password, formData.role);
            setShowModal(false);
            setFormData({ fullName: '', email: '', password: '', role: 'ZOOKEEPER' });
            loadStaff();
        } catch (err) {
            alert('Recruitment failed: ' + (err.response?.data?.error || 'Check your data'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await userService.approve(id);
            loadStaff();
        } catch (err) {
            alert('Approval failed: ' + (err.response?.data?.error || 'Unknown error'));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to revoke access for this staff member?')) {
            try {
                await userService.delete(id);
                loadStaff();
            } catch (err) {
                alert('Action failed: ' + (err.response?.data?.error || 'Unknown error'));
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-dark)',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Personnel Directory</h1>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Management and oversight of sanctuary staff</p>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="btn-premium btn-primary-gradient" 
                        style={{ height: '48px', padding: '0 24px', fontWeight: '800' }}
                    >
                        + Recruit New Staff
                    </button>
                </div>

                <div className="glass-panel fade-in" style={{ padding: '0', overflow: 'hidden', background: 'var(--bg-panel)' }}>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead style={{ background: 'var(--bg-input)' }}>
                                <tr>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Employee ID</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Full Name</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Contact Email</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Status & Role</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map(member => (
                                    <tr key={member.id} className="fade-in">
                                        <td style={{ padding: '20px 30px', color: 'var(--primary)', fontWeight: '700' }}>#STF-{member.id}</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--text-main)', fontWeight: '700' }}>{member.fullName}</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--text-muted)', fontSize: '14px' }}>{member.email}</td>
                                        <td style={{ padding: '20px 30px' }}>
                                            <div className="d-flex flex-column gap-2">
                                                <span style={{ 
                                                    padding: '4px 10px', 
                                                    background: member.role === 'ADMIN' ? 'rgba(5, 150, 105, 0.08)' : 'rgba(59, 130, 246, 0.08)', 
                                                    color: member.role === 'ADMIN' ? 'var(--primary)' : '#3b82f6', 
                                                    borderRadius: '20px', 
                                                    fontSize: '10px',
                                                    fontWeight: '800',
                                                    width: 'fit-content',
                                                    border: `1px solid ${member.role === 'ADMIN' ? 'rgba(5, 150, 105, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`
                                                }}>
                                                    {member.role}
                                                </span>
                                                {!member.enabled && (
                                                    <span style={{ 
                                                        padding: '4px 10px', 
                                                        background: 'rgba(245, 158, 11, 0.08)', 
                                                        color: '#f59e0b', 
                                                        borderRadius: '20px', 
                                                        fontSize: '10px',
                                                        fontWeight: '800',
                                                        width: 'fit-content',
                                                        border: '1px solid rgba(245, 158, 11, 0.1)'
                                                    }}>
                                                        PENDING APPROVAL
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 30px', textAlign: 'right' }}>
                                            <div className="d-flex justify-content-end gap-2">
                                                {!member.enabled && (
                                                    <button 
                                                        onClick={() => handleApprove(member.id)}
                                                        className="btn-premium btn-primary-gradient"
                                                        style={{ padding: '8px 16px', fontSize: '12px', fontWeight: '700', borderRadius: '8px' }}
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(member.id)}
                                                    className="btn-premium"
                                                    style={{ 
                                                        background: 'transparent', 
                                                        border: '1px solid rgba(239, 68, 68, 0.2)', 
                                                        color: '#ef4444', 
                                                        padding: '8px 16px',
                                                        fontSize: '12px',
                                                        fontWeight: '700',
                                                        borderRadius: '8px'
                                                    }}
                                                >
                                                    Revoke
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {staff.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            No staff members found in the registry.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Recruitment Modal */}
            {showModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
                        <h2 className="mb-4" style={{ color: 'white', fontWeight: '800' }}>Recruit New Staff</h2>
                        <form onSubmit={handleRecruit}>
                            <div className="mb-3">
                                <label style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700' }}>FULL NAME</label>
                                <input 
                                    type="text" className="form-control-custom"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700' }}>EMAIL ADDRESS</label>
                                <input 
                                    type="email" className="form-control-custom"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700' }}>TEMPORARY PASSWORD</label>
                                <input 
                                    type="password" className="form-control-custom"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700' }}>ASSIGN ROLE</label>
                                <select 
                                    className="form-control-custom"
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'white' }}
                                >
                                    <option value="ZOOKEEPER">Zookeeper</option>
                                    <option value="ADMIN">Administrator</option>
                                </select>
                            </div>
                            <div className="d-flex gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="btn-premium w-100"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="btn-premium btn-primary-gradient w-100"
                                >
                                    {submitting ? 'Recruiting...' : 'Recruit Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;
