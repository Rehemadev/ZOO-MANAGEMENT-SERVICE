import React, { useState, useEffect } from 'react';
import { animalService, healthRecordService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const HealthRecords = () => {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimalId, setSelectedAnimalId] = useState('');
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({ treatment: '', recordDate: '', notes: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        animalService.getAll().then(setAnimals).catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedAnimalId) {
            loadRecords(selectedAnimalId);
        } else {
            setRecords([]);
        }
    }, [selectedAnimalId]);

    const loadRecords = (animalId) => {
        healthRecordService.getByAnimal(animalId)
            .then(setRecords)
            .catch(err => setError("Failed to load health records."));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await healthRecordService.create({ ...formData, animalId: selectedAnimalId });
            setSuccess('Health record saved successfully!');
            setFormData({ treatment: '', recordDate: '', notes: '' });
            loadRecords(selectedAnimalId);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save health record.');
        }
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back to Dashboard</button>
            <h2>Manage Health Records</h2>

            {error && <div className="alert alert-danger shadow-sm">{error}</div>}
            {success && <div className="alert alert-success shadow-sm">{success}</div>}
            
            <div className="mb-4 mt-3">
                <label className="form-label fw-bold">Select Animal</label>
                <select className="form-select form-select-lg shadow-sm" value={selectedAnimalId} onChange={e => setSelectedAnimalId(e.target.value)}>
                    <option value="">-- Choose an Animal --</option>
                    {animals.map(a => <option key={a.id} value={a.id}>{a.name} ({a.species})</option>)}
                </select>
            </div>

            {selectedAnimalId && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body bg-light">
                        <h4>Add Treatment Record</h4>
                        <form onSubmit={handleSubmit} className="row g-3 mt-1">
                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder="Treatment/Condition" value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})} required />
                            </div>
                            <div className="col-md-3">
                                <input type="date" className="form-control" value={formData.recordDate} onChange={e => setFormData({...formData, recordDate: e.target.value})} required />
                            </div>
                            <div className="col-md-5">
                                <input type="text" className="form-control" placeholder="Additional Notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
                            </div>
                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-danger">Save Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedAnimalId && records.length > 0 && (
                <table className="table table-bordered table-hover shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Treatment</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(rec => (
                            <tr key={rec.id}>
                                <td>{rec.recordDate}</td>
                                <td>{rec.treatment}</td>
                                <td>{rec.notes || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {selectedAnimalId && records.length === 0 && (
                <div className="alert alert-secondary">No health records exist yet for this animal.</div>
            )}
        </div>
    );
};

export default HealthRecords;
