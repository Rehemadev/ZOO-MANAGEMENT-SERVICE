import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { animalService, healthRecordService, feedingScheduleService } from '../../services/apiServices';

const ZooMap = () => {
    const navigate = useNavigate();
    const [animals, setAnimals] = useState([]);
    const [selectedZone, setSelectedZone] = useState('All');
    const [activeAnimal, setActiveAnimal] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [healthRecords, setHealthRecords] = useState([]);
    const [feedingSchedules, setFeedingSchedules] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        animalService.getAll().then(data => {
            setAnimals(data.filter(a => {
                if (!a.healthStatus) return true;
                const status = (a.healthStatus || '').toLowerCase();
                return status.includes('health') || status === 'good' || status === 'okay' || status === 'normal';
            }));
        }).catch(console.error);
    }, []);

    const getZoneForAnimal = (species) => {
        const lower = (species || '').toLowerCase();
        if (lower.includes('lion') || lower.includes('elephant') || lower.includes('zebra') || lower.includes('giraffe')) return 'Savanna Region';
        if (lower.includes('monkey') || lower.includes('gorilla')) return 'Primate Jungle';
        if (lower.includes('snake') || lower.includes('crocodile') || lower.includes('lizard')) return 'Reptile House';
        if (lower.includes('bird') || lower.includes('parrot') || lower.includes('eagle')) return 'Aviary Flight';
        return 'General Exhibition';
    };

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

    const getEmoji = (species) => {
        const lower = species.toLowerCase();
        if (lower.includes('lion')) return '🦁';
        if (lower.includes('elephant')) return '🐘';
        if (lower.includes('zebra')) return '🦓';
        if (lower.includes('bird')) return '🦜';
        if (lower.includes('monkey') || lower.includes('gorilla')) return '🐒';
        if (lower.includes('snake')) return '🐍';
        if (lower.includes('crocodile')) return '🐊';
        if (lower.includes('giraffe')) return '🦒';
        return '🐾';
    };

    const getPosition = (id, zone) => {
        let basePathX = 0, basePathY = 0;
        if(zone === 'Savanna Region') { basePathX = 25; basePathY = 25; }
        else if(zone === 'Primate Jungle') { basePathX = 70; basePathY = 30; }
        else if(zone === 'Reptile House') { basePathX = 30; basePathY = 75; }
        else if(zone === 'Aviary Flight') { basePathX = 75; basePathY = 70; }
        else { basePathX = 50; basePathY = 50; } 
        
        const spreadX = ((id * 31) % 18) - 9; 
        const spreadY = ((id * 47) % 18) - 9; 
        
        return { top: `${basePathY + spreadY}%`, left: `${basePathX + spreadX}%` };
    };

    const zones = ['All', 'Savanna Region', 'Primate Jungle', 'Reptile House', 'Aviary Flight'];

    const displayedAnimals = selectedZone === 'All' 
        ? animals 
        : animals.filter(a => getZoneForAnimal(a.species) === selectedZone);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="text-end" style={{ width: '100%' }}>
                        <h1 className="text-gradient" style={{ margin: 0 }}>Zoo Map</h1>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Wildlife Habitat Tracker</p>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="mb-4">
                    <div className="glass-panel" style={{ 
                        display: 'flex', 
                        gap: '10px', 
                        padding: '12px',
                        overflowX: 'auto',
                        background: 'white'
                    }}>
                        {zones.map(zone => (
                            <button 
                                key={zone}
                                onClick={() => setSelectedZone(zone)}
                                className="btn-premium"
                                style={{
                                    flexGrow: 1,
                                    background: selectedZone === zone ? 'var(--primary)' : '#f8fafc',
                                    color: selectedZone === zone ? 'white' : '#64748b',
                                    padding: '10px 20px',
                                    border: '1px solid #e2e8f0',
                                    whiteSpace: 'nowrap',
                                    fontSize: '13px',
                                    fontWeight: '700'
                                }}
                            >
                                {zone}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Classical Grid Map */}
                <div className="glass-panel" style={{ 
                    height: '700px', 
                    position: 'relative', 
                    backgroundColor: '#f1f5f9', // Slightly darker background for the "ground"
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    backgroundImage: 'radial-gradient(#cbd5e1 0.5px, transparent 0.5px)',
                    backgroundSize: '30px 30px'
                }}>
                    {/* Decorative Elements */}
                    <div style={{ position: 'absolute', top: '45%', left: '45%', width: '100px', height: '60px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '40% 60% 50% 50%', filter: 'blur(10px)' }}></div>
                    <div style={{ position: 'absolute', bottom: '20%', left: '20%', width: '150px', height: '80px', background: 'rgba(5, 150, 105, 0.05)', borderRadius: '60% 40% 70% 30%', filter: 'blur(15px)' }}></div>

                    
                    {/* Architectural Zones */}
                    <div style={{ position: 'absolute', top: '5%', left: '5%', width: '40%', height: '40%', border: '2px dashed rgba(5, 150, 105, 0.2)', background: 'rgba(5, 150, 105, 0.02)', borderRadius: '12px' }}>
                        <div style={{ padding: '15px', color: '#059669', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>Savanna Region</div>
                    </div>
                    
                    <div style={{ position: 'absolute', top: '10%', right: '5%', width: '40%', height: '35%', border: '2px dashed rgba(217, 119, 6, 0.2)', background: 'rgba(217, 119, 6, 0.02)', borderRadius: '12px' }}>
                        <div style={{ padding: '15px', color: '#d97706', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>Primate Jungle</div>
                    </div>
                    
                    <div style={{ position: 'absolute', bottom: '5%', left: '10%', width: '35%', height: '35%', border: '2px dashed rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.02)', borderRadius: '12px' }}>
                        <div style={{ padding: '15px', color: '#ef4444', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>Reptile House</div>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '45%', height: '40%', border: '2px dashed rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.02)', borderRadius: '12px' }}>
                        <div style={{ padding: '15px', color: '#3b82f6', fontWeight: '800', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>Aviary Flight</div>
                    </div>

                    {displayedAnimals.map(animal => {
                        const zone = getZoneForAnimal(animal.species);
                        const pos = getPosition(animal.id, zone);
                        const isHovered = activeAnimal?.id === animal.id;
                        
                        return (
                            <div 
                                key={animal.id} 
                                onMouseEnter={() => setActiveAnimal(animal)}
                                onMouseLeave={() => setActiveAnimal(null)}
                                onClick={() => handleObserveDetails(animal)}
                                style={{
                                    position: 'absolute',
                                    top: pos.top,
                                    left: pos.left,
                                    cursor: 'pointer',
                                    zIndex: isHovered ? 100 : 10,
                                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            >
                                {/* Marker */}
                                <div style={{ 
                                    background: isHovered ? 'var(--primary)' : 'white',
                                    border: `2px solid ${isHovered ? 'white' : '#e2e8f0'}`,
                                    borderRadius: '50%',
                                    width: '48px',
                                    height: '48px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '22px',
                                    boxShadow: isHovered ? '0 12px 24px rgba(5, 150, 105, 0.3)' : '0 4px 12px rgba(0,0,0,0.08)',
                                    overflow: 'hidden'
                                }}>
                                    {animal.imageUrl ? (
                                        <img src={animal.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : getEmoji(animal.species)}
                                </div>

                                {/* Information Box */}
                                {isHovered && (
                                    <div className="glass-panel fade-in" style={{
                                        position: 'absolute',
                                        bottom: 'calc(100% + 15px)',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        padding: '20px',
                                        minWidth: '220px',
                                        boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                                        pointerEvents: 'none',
                                        zIndex: 1000,
                                        background: 'white',
                                        borderRadius: '16px'
                                    }}>
                                        <h5 style={{ color: '#1e293b', margin: '0 0 5px 0', fontWeight: '800' }}>{animal.name}</h5>
                                        <div style={{ color: 'var(--primary)', fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.5px' }}>{animal.species}</div>
                                        
                                        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                                            <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}><span>ID:</span> <span style={{ color: '#1e293b' }}>#{animal.id}</span></div>
                                            <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}><span>Age:</span> <span style={{ color: '#1e293b' }}>{animal.age} yrs</span></div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Status:</span> <span style={{ color: '#059669' }}>{animal.healthStatus}</span></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Entrance */}
                    <div className="glass-panel" style={{ 
                        position: 'absolute', 
                        bottom: '25px', 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        textAlign: 'center',
                        zIndex: 2,
                        padding: '12px 32px',
                        color: '#64748b',
                        fontWeight: '800',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '11px',
                        background: 'white',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        border: '1px solid #f1f5f9'
                    }}>
                        ⬇ Main Entrance Gate ⬇
                    </div>
                </div>
            </div>

            {/* Reuse the Detail Modal from ExploreAnimals */}
            {selectedAnimal && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 2000,
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

export default ZooMap;
