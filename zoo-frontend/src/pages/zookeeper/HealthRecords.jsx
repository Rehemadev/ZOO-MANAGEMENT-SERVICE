import React, { useState, useEffect } from 'react';
import { animalService, healthRecordService } from '../../services/apiServices';

const HealthRecords = () => {
    const [animals, setAnimals] = useState([]);
    const [selectedAnimalId, setSelectedAnimalId] = useState('');
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({ checkupDate: '', diagnosis: '', treatment: '' });

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
        healthRecordService.getByAnimal(animalId).then(setRecords).catch(console.error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await healthRecordService.create({ animalId: selectedAnimalId, ...formData });
        setFormData({ checkupDate: '', diagnosis: '', treatment: '' });
        loadRecords(selectedAnimalId);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="mb-5">
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Medical Registry</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Clinical monitoring and health history of sanctuary inhabitants</p>
                </div>

                <div className="glass-panel fade-in mb-5" style={{ padding: '40px', background: 'white' }}>
                    <label style={{ display: 'block', marginBottom: '15px', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px' }}>SELECT ANIMAL SUBJECT</label>
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
                    <div className="glass-panel fade-in mb-5" style={{ padding: '40px', background: 'white', borderLeft: '6px solid #ef4444' }}>
                        <h4 style={{ color: '#1e293b', marginBottom: '30px', fontWeight: '800' }}>➕ Add Clinical Entry</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-md-12">
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>CHECKUP DATE</label>
                                    <input type="date" value={formData.checkupDate} onChange={e => setFormData({...formData, checkupDate: e.target.value})} required style={{ background: '#f8fafc' }} />
                                </div>
                                <div className="col-md-12">
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>DIAGNOSIS / CLINICAL OBSERVATION</label>
                                    <textarea placeholder="Describe current health status..." value={formData.diagnosis} onChange={e => setFormData({...formData, diagnosis: e.target.value})} required style={{ background: '#f8fafc', height: '100px', resize: 'none' }} />
                                </div>
                                <div className="col-md-12">
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>PRESCRIBED TREATMENT / ACTION PLAN</label>
                                    <input type="text" placeholder="e.g. 500mg Amoxicillin daily" value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})} required style={{ background: '#f8fafc' }} />
                                </div>
                            </div>
                            <div className="text-end mt-4">
                                <button type="submit" className="btn-premium" style={{ background: '#ef4444', color: 'white', fontWeight: '800', padding: '14px 40px' }}>Register Record</button>
                            </div>
                        </form>
                    </div>
                )}

                {selectedAnimalId && (
                    <div className="glass-panel fade-in" style={{ padding: '0', overflow: 'hidden', background: 'white' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', background: '#fef2f2' }}>
                            <h5 style={{ margin: 0, color: '#b91c1c', fontWeight: '800' }}>Electronic Health Records (EHR)</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead style={{ background: '#f8fafc' }}>
                                    <tr>
                                        <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>VISIT DATE</th>
                                        <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>DIAGNOSIS</th>
                                        <th style={{ padding: '16px 32px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>TREATMENT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map(rec => (
                                        <tr key={rec.id}>
                                            <td style={{ padding: '16px 32px', fontWeight: '800', color: '#1e293b' }}>{rec.checkupDate}</td>
                                            <td style={{ padding: '16px 32px', color: '#1e293b', fontWeight: '500' }}>{rec.diagnosis}</td>
                                            <td style={{ padding: '16px 32px' }}>
                                                <span style={{ padding: '4px 12px', background: '#f1f5f9', color: '#64748b', borderRadius: '12px', fontSize: '12px', fontWeight: '700', border: '1px solid #e2e8f0' }}>{rec.treatment}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {records.length === 0 && <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontWeight: '600' }}>No medical history on record for this subject.</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthRecords;
