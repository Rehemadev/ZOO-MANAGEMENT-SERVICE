import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Admin Dashboard</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <Link to="/admin/animals" style={{textDecoration: 'none'}}>
                        <div className="card text-white bg-primary p-3 h-100">
                            <h4>Manage Animals</h4>
                            <p>Add, update, or remove animals from the zoo.</p>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4 mb-3">
                    <Link to="/admin/staff" style={{textDecoration: 'none'}}>
                        <div className="card text-white bg-success p-3 h-100">
                            <h4>Manage Staff</h4>
                            <p>View and manage Zookeepers.</p>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4 mb-3">
                    <Link to="/admin/reports" style={{textDecoration: 'none'}}>
                        <div className="card text-white bg-info p-3 h-100">
                            <h4>Financial Reports</h4>
                            <p>View bookings and total revenue.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
