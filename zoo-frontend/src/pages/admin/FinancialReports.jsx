import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const FinancialReports = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        bookingService.getAll().then(setBookings).catch(console.error);
    }, []);

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back to Dashboard</button>
            <h2>Financial Reports</h2>
            <div className="alert alert-success mt-4 mb-4 text-center">
                <h4 className="alert-heading">Total Revenue</h4>
                <h2>${totalRevenue.toFixed(2)}</h2>
                <hr />
                <p className="mb-0">Revenue calculated across {bookings.length} total bookings.</p>
            </div>

            <table className="table table-bordered shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Booking ID</th>
                        <th>User Email</th>
                        <th>Date</th>
                        <th>Tickets</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(book => (
                        <tr key={book.id}>
                            <td>#{book.id}</td>
                            <td>{book.userEmail}</td>
                            <td>{new Date(book.bookingDate).toLocaleString()}</td>
                            <td>{book.numberOfTickets}</td>
                            <td className="text-success fw-bold">${book.totalAmount.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinancialReports;
