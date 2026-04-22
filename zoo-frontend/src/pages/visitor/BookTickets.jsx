import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/apiServices';
import authService from '../../services/authService';

const BookTickets = () => {
    const [booking, setBooking] = useState({ ticketCount: 1, bookingDate: '', totalCost: 50 });
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const user = authService.getCurrentUser();

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        if (user?.id) {
            bookingService.getUserBookings(user.id).then(setHistory).catch(console.error);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await bookingService.create({ ...booking, userId: user.id });
            setSuccess('Booking successful! Your tickets are ready.');
            loadHistory();
            setBooking({ ticketCount: 1, bookingDate: '', totalCost: 50 });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Booking failed.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="mb-5">
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Book Your Visit</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Secure your spot at the sanctuary</p>
                </div>

                <div className="glass-panel fade-in mb-5" style={{ padding: '40px', background: 'white', border: 'none' }}>
                    <h4 style={{ color: '#1e293b', marginBottom: '30px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        🎟️ <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '16px' }}>Ticket Order Form</span>
                    </h4>
                    
                    {error && <div className="alert-custom mb-4" style={{ background: '#fef2f2', color: '#ef4444', padding: '16px', borderRadius: '12px', border: '1px solid #fee2e2', fontWeight: '600' }}>⚠️ {error}</div>}
                    {success && <div className="alert-custom mb-4" style={{ background: '#f0fdf4', color: '#059669', padding: '16px', borderRadius: '12px', border: '1px solid #dcfce7', fontWeight: '600' }}>✓ {success}</div>}

                    <form onSubmit={handleBooking}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Visit Date</label>
                                <input 
                                    type="date" 
                                    value={booking.bookingDate} 
                                    onChange={e => setBooking({...booking, bookingDate: e.target.value})} 
                                    required 
                                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '13px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Ticket Quantity</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={booking.ticketCount} 
                                    onChange={e => setBooking({...booking, ticketCount: e.target.value, totalCost: e.target.value * 50})} 
                                    required 
                                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                        </div>

                        <div className="mt-5 p-4 rounded-4" style={{ background: '#f1f5f9', border: '1px dashed #cbd5e1' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '700' }}>TOTAL AMOUNT DUE</div>
                                    <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary)' }}>${booking.totalCost}.00</div>
                                </div>
                                <button type="submit" className="btn-premium btn-primary-gradient px-5" style={{ height: '56px', fontSize: '16px' }}>
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="glass-panel fade-in" style={{ padding: '0', overflow: 'hidden', background: 'white' }}>
                    <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9' }}>
                        <h5 style={{ margin: 0, color: '#1e293b', fontWeight: '800' }}>Recent Booking History</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>BOOKING ID</th>
                                    <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>DATE</th>
                                    <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>TICKETS</th>
                                    <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>TOTAL</th>
                                    <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map(b => (
                                    <tr key={b.id}>
                                        <td style={{ padding: '16px 32px', fontWeight: '700', color: '#1e293b' }}>#ORD-{b.id}</td>
                                        <td style={{ padding: '16px 32px', color: '#64748b' }}>{b.bookingDate}</td>
                                        <td style={{ padding: '16px 32px', color: '#1e293b', fontWeight: '600' }}>{b.ticketCount} Units</td>
                                        <td style={{ padding: '16px 32px', color: 'var(--primary)', fontWeight: '700' }}>${b.totalCost}</td>
                                        <td style={{ padding: '16px 32px' }}>
                                            <span style={{ padding: '4px 12px', borderRadius: '20px', background: '#f0fdf4', color: '#059669', fontSize: '11px', fontWeight: '700', border: '1px solid #dcfce7' }}>CONFIRMED</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookTickets;
