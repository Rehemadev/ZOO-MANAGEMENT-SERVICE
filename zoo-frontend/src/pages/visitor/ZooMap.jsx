import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { animalService } from '../../services/apiServices';

const ZooMap = () => {
    const navigate = useNavigate();
    const [animals, setAnimals] = useState([]);
    const [selectedZone, setSelectedZone] = useState('All');
    const [activeAnimal, setActiveAnimal] = useState(null);

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
        const lower = species.toLowerCase();
        if (lower.includes('lion') || lower.includes('elephant') || lower.includes('zebra') || lower.includes('giraffe')) return 'Savanna Region';
        if (lower.includes('monkey') || lower.includes('gorilla')) return 'Primate Jungle';
        if (lower.includes('snake') || lower.includes('crocodile') || lower.includes('lizard')) return 'Reptile House';
        if (lower.includes('bird') || lower.includes('parrot') || lower.includes('eagle')) return 'Aviary Flight';
        return 'General Exhibition';
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
                    backgroundColor: '#ffffff',
                    overflow: 'hidden',
                    border: '1px solid #f1f5f9'
                }}>
                    
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
                                style={{
                                    position: 'absolute',
                                    top: pos.top,
                                    left: pos.left,
                                    cursor: 'pointer',
                                    zIndex: isHovered ? 100 : 10,
                                    transform: 'translate(-50%, -50%)',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {/* Marker */}
                                <div style={{ 
                                    background: isHovered ? 'var(--primary)' : 'white',
                                    border: `2px solid ${isHovered ? 'white' : '#e2e8f0'}`,
                                    borderRadius: '50%',
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '22px',
                                    boxShadow: isHovered ? '0 8px 20px rgba(5, 150, 105, 0.2)' : '0 4px 10px rgba(0,0,0,0.05)'
                                }}>
                                    {getEmoji(animal.species)}
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
        </div>
    );
};

export default ZooMap;
