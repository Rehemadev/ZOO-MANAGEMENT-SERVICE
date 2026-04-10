import React, { useState, useEffect } from 'react';
import { animalService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const ManageAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [formData, setFormData] = useState({ name: '', species: '', age: '', healthStatus: 'Healthy' });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadAnimals();
    }, []);

    const loadAnimals = () => {
        animalService.getAll().then(setAnimals).catch(console.error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await animalService.update(editingId, formData);
            setEditingId(null);
        } else {
            await animalService.create(formData);
        }
        setFormData({ name: '', species: '', age: '', healthStatus: 'Healthy' });
        loadAnimals();
    };

    const handleEdit = (animal) => {
        setFormData({
            name: animal.name,
            species: animal.species,
            age: animal.age,
            healthStatus: animal.healthStatus
        });
        setEditingId(animal.id);
    };

    const cancelEdit = () => {
        setFormData({ name: '', species: '', age: '', healthStatus: 'Healthy' });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        await animalService.delete(id);
        loadAnimals();
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back to Dashboard</button>
            <h2>Manage Animals</h2>
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h4>{editingId ? 'Update Animal' : 'Add New Animal'}</h4>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Species" value={formData.species} onChange={e => setFormData({...formData, species: e.target.value})} required />
                        </div>
                        <div className="col-md-3">
                            <input type="number" className="form-control" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
                        </div>
                        <div className="col-md-3">
                            <select className="form-select" value={formData.healthStatus} onChange={e => setFormData({...formData, healthStatus: e.target.value})}>
                                <option>Healthy</option>
                                <option>Sick</option>
                                <option>In Treatment</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary me-2">{editingId ? 'Update Animal' : 'Add Animal'}</button>
                            {editingId && (
                                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Age</th>
                        <th>Health Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map(animal => (
                        <tr key={animal.id}>
                            <td>{animal.id}</td>
                            <td>{animal.name}</td>
                            <td>{animal.species}</td>
                            <td>{animal.age}</td>
                            <td><span className={`badge ${animal.healthStatus === 'Healthy' ? 'bg-success' : 'bg-warning text-dark'}`}>{animal.healthStatus}</span></td>
                            <td>
                                <button className="btn btn-sm btn-info text-white me-2" onClick={() => handleEdit(animal)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(animal.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAnimals;
