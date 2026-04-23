import React, { useState, useEffect } from 'react';
import { animalService } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const ManageAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [formData, setFormData] = useState({ name: '', species: '', age: '', healthStatus: 'Healthy', imageUrl: '' });
    const [editingId, setEditingId] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadAnimals();
    }, []);

    const loadAnimals = () => {
        animalService.getAll().then(setAnimals).catch(console.error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUploading) return;
        if (editingId) {
            await animalService.update(editingId, formData);
        } else {
            await animalService.create(formData);
        }
        setFormData({ name: '', species: '', age: '', healthStatus: 'Healthy', imageUrl: '' });
        setEditingId(null);
        loadAnimals();
    };

    const handleEdit = (animal) => {
        setEditingId(animal.id);
        setFormData({ name: animal.name, species: animal.species, age: animal.age, healthStatus: animal.healthStatus, imageUrl: animal.imageUrl || '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this inhabitant?')) {
            await animalService.delete(id);
            loadAnimals();
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="mb-5">
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Animal Inventory</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage the sanctuary inhabitants and their vital information</p>
                </div>

                <div className="glass-panel fade-in mb-5" style={{ padding: '40px', background: 'white' }}>
                    <h4 style={{ color: '#1e293b', marginBottom: '30px', fontWeight: '800' }}>
                        {editingId ? '📝 Edit Inhabitant' : '➕ Register New Inhabitant'}
                    </h4>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-3">
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Name</label>
                                <input type="text" placeholder="e.g. Simba" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ background: '#f8fafc' }} />
                            </div>
                            <div className="col-md-3">
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Species</label>
                                <input type="text" placeholder="e.g. African Lion" value={formData.species} onChange={e => setFormData({...formData, species: e.target.value})} required style={{ background: '#f8fafc' }} />
                            </div>
                            <div className="col-md-2">
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Age</label>
                                <input type="number" placeholder="Years" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required style={{ background: '#f8fafc' }} />
                            </div>
                            <div className="col-md-2">
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Health Status</label>
                                <select value={formData.healthStatus} onChange={e => setFormData({...formData, healthStatus: e.target.value})} style={{ background: '#f8fafc' }}>
                                    <option value="Healthy">Healthy</option>
                                    <option value="Under Treatment">Under Treatment</option>
                                    <option value="Recovering">Recovering</option>
                                </select>
                            </div>
                            <div className="col-md-10">
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Image URL or Upload</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="https://example.com/image.jpg" 
                                        value={formData.imageUrl} 
                                        onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                                        style={{ background: '#f8fafc', flexGrow: 1 }} 
                                    />
                                    <label className="btn-premium" style={{ 
                                        background: 'var(--bg-panel)', 
                                        color: 'var(--primary)', 
                                        border: '1px solid var(--primary)', 
                                        cursor: 'pointer',
                                        height: '52px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0 20px',
                                        fontSize: '13px',
                                        fontWeight: '700',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        Upload File
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            style={{ display: 'none' }} 
                                            onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setIsUploading(true);
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData({...formData, imageUrl: reader.result});
                                                        setIsUploading(false);
                                                    };
                                                    reader.onerror = () => setIsUploading(false);
                                                    reader.readAsDataURL(file);
                                                }
                                            }} 
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="submit" disabled={isUploading} className="btn-premium btn-primary-gradient w-100" style={{ height: '52px', opacity: isUploading ? 0.6 : 1 }}>
                                    {isUploading ? 'Reading...' : (editingId ? 'Update' : 'Register')}
                                </button>
                            </div>
                        </div>
                        {editingId && (
                            <button type="button" className="btn mt-3" onClick={() => {setEditingId(null); setFormData({name:'', species:'', age:'', healthStatus:'Healthy'});}} style={{ color: '#64748b', fontWeight: '600', fontSize: '13px' }}>Cancel Editing</button>
                        )}
                    </form>
                </div>

                <div className="glass-panel fade-in" style={{ padding: '0', overflow: 'hidden', background: 'white' }}>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>ID</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>PHOTO</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>NAME</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>SPECIES</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>AGE</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>HEALTH</th>
                                    <th style={{ padding: '20px 30px', fontSize: '12px', color: '#64748b', fontWeight: '700', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animals.map(animal => (
                                    <tr key={animal.id}>
                                        <td style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600' }}>#{animal.id}</td>
                                        <td style={{ padding: '20px 30px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f1f5f9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {animal.imageUrl ? <img src={animal.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🐾'}
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 30px', color: '#1e293b', fontWeight: '700' }}>{animal.name}</td>
                                        <td style={{ padding: '20px 30px', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', fontSize: '13px' }}>{animal.species}</td>
                                        <td style={{ padding: '20px 30px', color: '#64748b', fontWeight: '600' }}>{animal.age} Yrs</td>
                                        <td style={{ padding: '20px 30px' }}>
                                            <span style={{ 
                                                padding: '4px 12px', 
                                                borderRadius: '20px', 
                                                background: animal.healthStatus === 'Healthy' ? '#f0fdf4' : '#fef2f2', 
                                                color: animal.healthStatus === 'Healthy' ? '#059669' : '#ef4444', 
                                                fontSize: '11px', 
                                                fontWeight: '700',
                                                border: `1px solid ${animal.healthStatus === 'Healthy' ? '#dcfce7' : '#fee2e2'}`
                                            }}>
                                                {(animal.healthStatus || 'Healthy').toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px 30px', textAlign: 'right' }}>
                                            <button onClick={() => handleEdit(animal)} className="btn btn-sm me-2" style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '8px', padding: '6px 12px', fontWeight: '700' }}>Edit</button>
                                            <button onClick={() => handleDelete(animal.id)} className="btn btn-sm" style={{ background: '#fef2f2', color: '#ef4444', borderRadius: '8px', padding: '6px 12px', fontWeight: '700' }}>Delete</button>
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

export default ManageAnimals;
