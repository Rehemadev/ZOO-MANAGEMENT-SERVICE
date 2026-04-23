import React, { useState, useEffect } from 'react';
import { animalService, healthRecordService, feedingScheduleService } from '../../services/apiServices';
import { useNavigate, useLocation } from 'react-router-dom';

const ExploreAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search') || '';
    
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [healthRecords, setHealthRecords] = useState([]);
    const [feedingSchedules, setFeedingSchedules] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        animalService.getAll(searchQuery).then(setAnimals).catch(console.error);
    }, [searchQuery]);

    const visibleAnimals = (animals || []).filter(a => a && a.healthStatus !== 'Under Treatment');

    const formatTime = (time) => {
        if (!time) return '00:00';
        if (Array.isArray(time)) {
            return `${time[0].toString().padStart(2, '0')}:${time[1].toString().padStart(2, '0')}`;
        }
        return typeof time === 'string' ? time.substring(0, 5) : time;
    };

    const handleObserveDetails = async (animal) => {
        setSelectedAnimal(animal);
        setLoadingDetails(true);
        try {
            const records = await healthRecordService.getByAnimal(animal.id);
            const schedules = await feedingScheduleService.getByAnimal(animal.id);
            setHealthRecords(records || []);
            setFeedingSchedules(schedules || []);
        } catch (error) {
            console.error("Error fetching details:", error);
        } finally {
            setLoadingDetails(false);
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
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Wildlife Gallery</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Discover the majestic inhabitants of our sanctuary</p>
                </div>

                <div className="row g-4">
                    {visibleAnimals.map(animal => (
                        <div className="col-md-4 col-sm-6" key={animal.id}>
                            <div className="glass-card fade-in h-100" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--bg-panel)' }}>
                                <div style={{ 
                                    height: '200px', 
                                    background: `#f1f5f9`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '64px',
                                    position: 'relative'
                                }}>
                                    {animal.imageUrl ? (
                                        <img src={animal.imageUrl} alt={animal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        (animal.species || '').toLowerCase().includes('lion') ? '🦁' : 
                                        (animal.species || '').toLowerCase().includes('elephant') ? '🐘' : 
                                        (animal.species || '').toLowerCase().includes('zebra') ? '🦓' : 
                                        (animal.species || '').toLowerCase().includes('monkey') ? '🐒' : 
                                        (animal.species || '').toLowerCase().includes('bird') ? '🦜' : '🐾'
                                    )}
                                     <div style={{ position: 'absolute', bottom: '15px', right: '15px', fontSize: '11px', background: 'rgba(15, 23, 42, 0.05)', color: '#64748b', padding: '5px 12px', borderRadius: '20px', fontWeight: '700', letterSpacing: '0.5px' }}>
                                        {animal.age} YEARS OLD
                                     </div>
                                </div>
                                <div style={{ padding: '30px', flexGrow: 1 }}>
                                    <h3 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '1.5rem', fontWeight: '700' }}>{animal.name}</h3>
                                    <p className="text-gradient" style={{ fontWeight: '700', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1.5px', marginBottom: '24px' }}>{animal.species}</p>
                                    
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                                        <span style={{ 
                                            padding: '6px 14px', 
                                            background: 'rgba(5, 150, 105, 0.08)', 
                                            color: 'var(--primary)', 
                                            borderRadius: '20px', 
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            border: '1px solid rgba(5, 150, 105, 0.1)' 
                                        }}>
                                            {animal.healthStatus?.toUpperCase() || 'UNKNOWN'}
                                        </span>
                                        <span style={{ fontSize: '12px', fontWeight: '600', opacity: '0.7' }}>ID: #{animal.id}</span>
                                    </div>
                                </div>
                                <div style={{ padding: '20px 30px', borderTop: '1px solid #f1f5f9' }}>
                                    <button 
                                        className="btn-premium w-100" 
                                        onClick={() => handleObserveDetails(animal)}
                                        style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '700' }}
                                    >
                                        Observe Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {visibleAnimals.length === 0 && (
                        <div className="col-12 text-center">
                            <div className="glass-panel" style={{ padding: '80px 40px', background: 'var(--bg-panel)' }}>
                                <div style={{ fontSize: '60px', marginBottom: '24px' }}>🔭</div>
                                <h3 style={{ color: '#1e293b', fontWeight: '700' }}>Quiet in the Habitats</h3>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>The local wildlife is currently resting or in treatment. Explore our other activities!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedAnimal && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }} onClick={() => setSelectedAnimal(null)}>
                    <div className="glass-panel slide-up" style={{
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        background: 'white',
                        padding: 0,
                        borderRadius: '24px'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ position: 'relative', height: '300px', background: '#f1f5f9' }}>
                            {selectedAnimal.imageUrl ? (
                                <img src={selectedAnimal.imageUrl} alt={selectedAnimal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>🐾</div>
                            )}
                            <button 
                                onClick={() => setSelectedAnimal(null)}
                                style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            >✕</button>
                        </div>
                        
                        <div style={{ padding: '40px' }}>
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4px' }}>{selectedAnimal.name}</h2>
                                    <p className="text-gradient" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{selectedAnimal.species}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ 
                                        padding: '8px 20px', 
                                        background: 'rgba(5, 150, 105, 0.08)', 
                                        color: 'var(--primary)', 
                                        borderRadius: '30px', 
                                        fontWeight: '700',
                                        border: '1px solid rgba(5, 150, 105, 0.1)' 
                                    }}>
                                        {selectedAnimal.healthStatus?.toUpperCase()}
                                    </span>
                                    <p style={{ marginTop: '10px', fontWeight: '600', color: '#64748b' }}>Age: {selectedAnimal.age} Years</p>
                                </div>
                            </div>

                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <h4 style={{ fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#f1f5f9', padding: '8px', borderRadius: '10px' }}>📅</span> Feeding Schedule
                                    </h4>
                                    {loadingDetails ? <p>Loading...</p> : feedingSchedules.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {feedingSchedules.map(fs => (
                                                <div key={fs.id} style={{ padding: '15px', background: 'var(--bg-panel)', borderRadius: '15px', border: '1px solid var(--border)' }}>
                                                    <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{fs.foodType}</div>
                                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{formatTime(fs.feedingTime)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <p style={{ color: '#94a3b8' }}>No feeding schedule found.</p>}
                                </div>
                                <div className="col-md-6">
                                    <h4 style={{ fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ background: '#f1f5f9', padding: '8px', borderRadius: '10px' }}>🩺</span> Health Records
                                    </h4>
                                    {loadingDetails ? <p>Loading...</p> : healthRecords.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {healthRecords.map(hr => (
                                                <div key={hr.id} style={{ padding: '15px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #f1f5f9' }}>
                                                    <div style={{ fontWeight: '700', color: '#1e293b' }}>{hr.diagnosis}</div>
                                                    <div style={{ fontSize: '13px', color: '#64748b' }}>{new Date(hr.checkupDate).toLocaleDateString()} • {hr.treatment}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <p style={{ color: '#94a3b8' }}>No recent health records.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExploreAnimals;
