import React, { useState, useEffect } from 'react';
import { userService } from '../../services/apiServices';

const ManageStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <button className="btn-premium btn-primary-gradient" style={{ height: '48px' }}>
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
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Security Role</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map(member => (
                                    <tr key={member.id}>
                                        <td style={{ padding: '20px 30px', color: 'var(--primary)', fontWeight: '700' }}>#STF-{member.id}</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--text-main)', fontWeight: '700' }}>{member.fullName}</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--text-muted)', fontSize: '14px' }}>{member.email}</td>
                                        <td style={{ padding: '20px 30px' }}>
                                            <span style={{ 
                                                padding: '6px 14px', 
                                                background: member.role === 'ADMIN' ? 'rgba(5, 150, 105, 0.08)' : 'rgba(59, 130, 246, 0.08)', 
                                                color: member.role === 'ADMIN' ? 'var(--primary)' : '#3b82f6', 
                                                borderRadius: '20px', 
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                border: `1px solid ${member.role === 'ADMIN' ? 'rgba(5, 150, 105, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`
                                            }}>
                                                {member.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px 30px', textAlign: 'right' }}>
                                            <button 
                                                onClick={() => handleDelete(member.id)}
                                                className="btn-premium"
                                                style={{ 
                                                    background: 'transparent', 
                                                    border: '1px solid #fee2e2', 
                                                    color: '#ef4444', 
                                                    padding: '8px 16px',
                                                    fontSize: '12px',
                                                    fontWeight: '700'
                                                }}
                                            >
                                                Revoke Access
                                            </button>
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
        </div>
    );
};

export default ManageStaff;
