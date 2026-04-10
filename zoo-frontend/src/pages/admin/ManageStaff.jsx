import React, { useState, useEffect } from 'react';
import { userService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const ManageStaff = () => {
    const [staff, setStaff] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = () => {
        userService.getAllStaff().then(setStaff).catch(console.error);
    };

    const handleDelete = async (id) => {
        await userService.delete(id);
        loadStaff();
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back to Dashboard</button>
            <h2>Manage Staff</h2>
            <div className="alert alert-info py-2">
                New staff (Admins/Zookeepers) can be registered via the public Registration page.
            </div>

            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td><span className={`badge bg-${user.role === 'ADMIN' ? 'danger' : 'success'}`}>{user.role}</span></td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.id)}>Revoke Access</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageStaff;
