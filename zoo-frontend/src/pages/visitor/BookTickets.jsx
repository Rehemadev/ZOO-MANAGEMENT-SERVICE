import React, { useState, useEffect } from 'react';
import { bookingService, paymentService } from '../../services/apiServices';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const BookTickets = () => {
    const [tickets, setTickets] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    
    const user = authService.getCurrentUser();
    const TICKET_PRICE = 20;

    useEffect(() => {
        if (user && user.id) {
            loadBookings(user.id);
        }
    }, [user.id]);

    const loadBookings = () => {
        bookingService.getMyBookings().then(setBookings).catch(console.error);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setMessage(null);

        try {
            // 1. Create Booking
            const bookingResult = await bookingService.create({ 
                userId: user.id, 
                numberOfTickets: tickets 
            });

            // 2. Process Payment
            await paymentService.process({
                bookingId: bookingResult.id,
                paymentMethod: paymentMethod
            });

            setMessage({ type: 'success', text: `Successfully booked ${tickets} ticket(s)!` });
            setTickets(1);
            loadBookings();
        } catch (error) {
            console.error("Booking error", error);
            setMessage({ type: 'danger', text: 'Error processing your booking or payment.' });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mt-4 pb-5">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back to Dashboard</button>
            <h2 className="mb-4">Book Your Visit</h2>
            
            {message && (
                <div className={`alert alert-${message.type} alert-dismissible`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
                </div>
            )}

            <div className="card shadow mb-5 border-success">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Ticket Order Form</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fw-bold">Number of Tickets</label>
                            <div className="col-sm-4">
                                <input type="number" className="form-control" min="1" max="20" value={tickets} onChange={e => setTickets(parseInt(e.target.value) || 1)} required />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fw-bold">Price per Ticket</label>
                            <div className="col-sm-4">
                                <input type="text" readOnly className="form-control-plaintext text-muted" value={`$${TICKET_PRICE}.00`} />
                            </div>
                        </div>
                        <hr />
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fw-bold fs-5">Total Cost</label>
                            <div className="col-sm-4">
                                <input type="text" readOnly className="form-control-plaintext fw-bold text-success fs-5" value={`$${tickets * TICKET_PRICE}.00`} />
                            </div>
                        </div>
                        
                        <div className="mb-4 mt-4 row">
                            <label className="col-sm-3 col-form-label fw-bold">Payment Method</label>
                            <div className="col-sm-4">
                                <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                                    <option>Credit Card</option>
                                    <option>PayPal</option>
                                    <option>Crypto</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-success btn-lg w-50" disabled={isProcessing}>
                                {isProcessing ? 'Processing...' : 'Confirm Checkout & Pay'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <h3 className="mb-3">Your Booking History</h3>
            {bookings.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-hover shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Booking ID</th>
                                <th>Date</th>
                                <th>Tickets</th>
                                <th>Total Paid</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.id}>
                                    <td className="fw-bold">#{b.id}</td>
                                    <td>{new Date(b.bookingDate).toLocaleString()}</td>
                                    <td>{b.numberOfTickets}</td>
                                    <td className="text-success fw-bold">${(b.totalAmount || 0).toFixed(2)}</td>
                                    <td><span className="badge bg-success">PAID</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="alert alert-secondary text-center">
                    You have not made any bookings yet.
                </div>
            )}
        </div>
    );
};

export default BookTickets;
