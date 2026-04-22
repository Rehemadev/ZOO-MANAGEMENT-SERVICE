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
        const formattedTime = formData.feedingTime.length === 5 ? formData.feedingTime + ":00" : formData.feedingTime;
        await feedingScheduleService.create({ animalId: selectedAnimalId, feedingTime: formattedTime, foodType: formData.foodType });
        setFormData({ feedingTime: '', foodType: '' });
        loadSchedules(selectedAnimalId);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="mb-5">
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Feeding Protocols</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage dietary requirements and nutritional logs for inhabitants</p>
                </div>

                <div className="glass-panel fade-in mb-5" style={{ padding: '40px', background: 'white' }}>
                    <label style={{ display: 'block', marginBottom: '15px', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px' }}>Select Inhabitant</label>
                    <select 
                        style={{ 
                            fontSize: '18px', 
                            padding: '16px', 
                            background: '#f1f5f9',
                            color: '#1e293b',
                            fontWeight: '700',
                            border: '1px solid #e2e8f0'
                        }} 
                        value={selectedAnimalId} 
                        onChange={e => setSelectedAnimalId(e.target.value)}
                    >
                        <option value="">-- Choose Subject --</option>
                        {animals.map(a => (
                            <option key={a.id} value={a.id}>
                                {(a.name || 'Unknown').toUpperCase()} — {a.species || 'Unknown'}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedAnimalId && (
                    <div className="glass-panel fade-in mb-5" style={{ padding: '40px', background: 'white', borderLeft: '6px solid #f59e0b' }}>
                        <h4 style={{ color: '#1e293b', marginBottom: '30px', fontWeight: '800' }}>⚡ Register New Diet Entry</h4>
                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-4">
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>Feeding Time</label>
                                <input type="time" value={formData.feedingTime} onChange={e => setFormData({...formData, feedingTime: e.target.value})} required style={{ background: '#f8fafc' }} />
                            </div>
                            <div className="col-md-8">
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>Food Inventory (e.g. 5kg Fresh Meat)</label>
                                <input type="text" placeholder="Specify food type and quantity..." value={formData.foodType} onChange={e => setFormData({...formData, foodType: e.target.value})} required style={{ background: '#f8fafc' }} />
                            </div>
                            <div className="col-12 text-end mt-4">
                                <button type="submit" className="btn-premium" style={{ background: '#f59e0b', color: 'white', fontWeight: '800', px: '40px' }}>Add Entry</button>
                            </div>
                        </form>
                    </div>
                )}

                {selectedAnimalId && (
                    <div className="glass-panel fade-in" style={{ padding: '0', overflow: 'hidden', background: 'white' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', background: '#fffbeb' }}>
                            <h5 style={{ margin: 0, color: '#d97706', fontWeight: '800' }}>Historical Feeding Logs</h5>
                        </div>
                        {schedules.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead style={{ background: '#f8fafc' }}>
                                        <tr>
                                            <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>LOG ID</th>
                                            <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>TIMESTAMP</th>
                                            <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>FOOD SPECIFICATION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedules.map((sch, index) => (
                                            <tr key={sch.id}>
                                                <td style={{ padding: '16px 32px', color: '#94a3b8', fontWeight: '600' }}>#LOG-{index + 1}</td>
                                                <td style={{ padding: '16px 32px', fontWeight: '800', color: '#1e293b' }}>{sch.feedingTime}</td>
                                                <td style={{ padding: '16px 32px', color: '#64748b', fontWeight: '600' }}>{sch.foodType}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontWeight: '600' }}>
                                No dietary logs found for this subject.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedingSchedules;
