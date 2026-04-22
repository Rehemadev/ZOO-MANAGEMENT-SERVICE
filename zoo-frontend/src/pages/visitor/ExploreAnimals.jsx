import React, { useState, useEffect } from 'react';
import { animalService } from '../../services/apiServices';
import { useNavigate, useLocation } from 'react-router-dom';

const ExploreAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search') || '';

    useEffect(() => {
        animalService.getAll(searchQuery).then(setAnimals).catch(console.error);
    }, [searchQuery]);

    const visibleAnimals = (animals || []).filter(a => a && a.healthStatus !== 'Under Treatment');

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
                                    {(animal.species || '').toLowerCase().includes('lion') ? '🦁' : 
                                     (animal.species || '').toLowerCase().includes('elephant') ? '🐘' : 
                                     (animal.species || '').toLowerCase().includes('zebra') ? '🦓' : 
                                     (animal.species || '').toLowerCase().includes('monkey') ? '🐒' : 
                                     (animal.species || '').toLowerCase().includes('bird') ? '🦜' : '🐾'}
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
                                    <button className="btn-premium w-100" style={{ background: 'white', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', fontWeight: '700' }}>
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
        </div>
    );
};

export default ExploreAnimals;
