import React, { useState, useEffect } from 'react';
import { animalService, feedingScheduleService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const FeedingSchedules = () => {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimalId, setSelectedAnimalId] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [formData, setFormData] = useState({ feedingTime: '', foodType: '' });
    const navigate = useNavigate();

    useEffect(() => {
        animalService.getAll().then(setAnimals).catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedAnimalId) {
            loadSchedules(selectedAnimalId);
        } else {
            setSchedules([]);
        }
    }, [selectedAnimalId]);

    const loadSchedules = (animalId) => {
        feedingScheduleService.getByAnimal(animalId).then(setSchedules).catch(console.error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // The backend expects LocalTime (HH:mm:ss), HTML input type="time" gives HH:mm
        const formattedTime = formData.feedingTime.length === 5 ? formData.feedingTime + ":00" : formData.feedingTime;
        await feedingScheduleService.create({ animalId: selectedAnimalId, feedingTime: formattedTime, foodType: formData.foodType });
        setFormData({ feedingTime: '', foodType: '' });
        loadSchedules(selectedAnimalId);
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>&larr; Back to Dashboard</button>
            <h2>Manage Feeding Schedules</h2>
            
            <div className="mb-4 mt-3">
                <label className="form-label fw-bold">Select Animal</label>
                <select className="form-select form-select-lg shadow-sm border-warning" value={selectedAnimalId} onChange={e => setSelectedAnimalId(e.target.value)}>
                    <option value="">-- Choose an Animal --</option>
                    {animals.map(a => <option key={a.id} value={a.id}>{a.name} ({a.species})</option>)}
                </select>
            </div>

            {selectedAnimalId && (
                <div className="card shadow-sm mb-4 border-warning">
                    <div className="card-body bg-light">
                        <h4 className="text-warning text-darken">Add Feeding Time</h4>
                        <form onSubmit={handleSubmit} className="row g-3 mt-1">
                            <div className="col-md-5">
                                <input type="time" className="form-control" value={formData.feedingTime} onChange={e => setFormData({...formData, feedingTime: e.target.value})} required />
                            </div>
                            <div className="col-md-7">
                                <input type="text" className="form-control" placeholder="Food Type (e.g. 10kg Meat, Vegetables)" value={formData.foodType} onChange={e => setFormData({...formData, foodType: e.target.value})} required />
                            </div>
                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-warning fw-bold">Save Schedule</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedAnimalId && schedules.length > 0 && (
                <table className="table table-bordered table-hover shadow-sm">
                    <thead className="table-warning">
                        <tr>
                            <th>Time</th>
                            <th>Food Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(sch => (
                            <tr key={sch.id}>
                                <td className="fw-bold">{sch.feedingTime}</td>
                                <td>{sch.foodType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {selectedAnimalId && schedules.length === 0 && (
                <div className="alert alert-secondary">No feeding schedules exist yet for this animal.</div>
            )}
        </div>
    );
};

export default FeedingSchedules;
