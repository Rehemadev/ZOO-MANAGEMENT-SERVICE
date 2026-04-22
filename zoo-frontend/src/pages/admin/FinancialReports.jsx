import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const FinancialReports = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        bookingService.getAll().then(data => setBookings(data || [])).catch(console.error);
    }, []);

    const totalRevenue = (bookings || []).reduce((sum, b) => sum + (b.totalAmount || b.totalCost || 0), 0);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-dark)',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="mb-5">
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Financial Registry</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Revenue monitoring and transaction logs</p>
                </div>

                <div className="glass-panel fade-in mb-5" style={{ 
                    padding: '40px', 
                    background: 'var(--bg-panel)', 
                    textAlign: 'center',
                    borderLeft: '6px solid #f59e0b'
                }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                        Total Sanctuary Revenue
                    </div>
                    <div style={{ fontSize: '48px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '15px' }}>
                        ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div style={{ 
                        display: 'inline-block',
                        padding: '8px 20px',
                        background: 'rgba(245, 158, 11, 0.08)',
                        color: '#f59e0b',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '700'
                    }}>
                        📈 Verified across {bookings.length} transactions
                    </div>
                </div>

                <div className="glass-panel fade-in" style={{ padding: '0', overflow: 'hidden', background: 'var(--bg-panel)' }}>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead style={{ background: 'var(--bg-input)' }}>
                                <tr>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>TXN ID</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Client</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Timestamp</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>Qty</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(book => (
                                    <tr key={book.id}>
                                        <td style={{ padding: '20px 30px', color: 'var(--primary)', fontWeight: '800' }}>#TRX-{book.id}</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--text-muted)', fontSize: '14px' }}>{book.userEmail || 'Guest'}</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--text-muted)', fontSize: '14px' }}>
                                            {book.bookingDate ? new Date(book.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                        </td>
                                        <td style={{ padding: '20px 30px', color: '#3b82f6', fontWeight: '800' }}>{book.numberOfTickets || book.ticketCount} Units</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--primary)', fontWeight: '800', textAlign: 'right' }}>
                                            ${(book.totalAmount || book.totalCost || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            No financial records found in the registry.
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

export default FinancialReports;
