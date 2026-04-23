import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedingScheduleService } from '../../services/apiServices';

const UpcomingEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        feedingScheduleService.getAll().then(data => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMin = now.getMinutes();
            const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
            
            const processedEvents = (data || []).map(event => {
                let timeString = '00:00';
                if (Array.isArray(event.feedingTime)) {
                    timeString = `${event.feedingTime[0].toString().padStart(2, '0')}:${event.feedingTime[1].toString().padStart(2, '0')}`;
                } else if (typeof event.feedingTime === 'string') {
                    timeString = event.feedingTime.substring(0, 5);
                }
                
                // Determine status
                let status = 'Upcoming';
                const eventTime = timeString;
                if (eventTime === currentTimeStr) {
                    status = 'Live Now';
                } else if (eventTime < currentTimeStr) {
                    status = 'Completed';
                }

                return { ...event, formattedTime: timeString, status };
            });

            const sortedEvents = processedEvents.sort((a, b) => a.formattedTime.localeCompare(b.formattedTime));
            setEvents(sortedEvents);
        }).catch(console.error);
    }, []);

    const getEmoji = (animalName) => {
        const lower = (animalName || '').toLowerCase();
        if (lower.includes('simba') || lower.includes('lion')) return '🦁';
        if (lower.includes('dumbo') || lower.includes('elephant')) return '🐘';
        if (lower.includes('zebra')) return '🦓';
        if (lower.includes('bird') || lower.includes('parrot')) return '🦜';
        if (lower.includes('monkey')) return '🐒';
        return '🥩';
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '40px 20px'
        }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="mb-5">
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0' }}>Sanctuary Chronicles</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Stay updated with the latest happenings in the sanctuary</p>
                </div>

                <div className="row g-4">
                    {events.length > 0 ? events.map((event, index) => (
                        <div className="col-12" key={index}>
                            <div className="glass-card fade-in" style={{ 
                                padding: '32px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '30px',
                                background: 'var(--bg-panel)',
                                borderLeft: `6px solid var(--primary)`,
                                color: 'var(--text-main)'
                            }}>
                                <div style={{ 
                                    background: '#f1f5f9', 
                                    padding: '24px', 
                                    borderRadius: '16px', 
                                    minWidth: '130px', 
                                    textAlign: 'center' 
                                }}>
                                    <div style={{ color: '#1e293b', fontWeight: '800', fontSize: '22px' }}>{event.formattedTime || event.feedingTime}</div>
                                    <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>TODAY</div>
                                </div>
                                
                                <div style={{ flexGrow: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '32px' }}>{getEmoji(event.animalName)}</span>
                                        <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '24px', fontWeight: '700' }}>Feeding: {event.animalName}</h3>
                                        <span style={{ 
                                            padding: '4px 12px', 
                                            borderRadius: '20px', 
                                            fontSize: '11px', 
                                            fontWeight: '800',
                                            background: event.status === 'Live Now' ? '#fef2f2' : (event.status === 'Completed' ? '#f1f5f9' : '#f0fdf4'),
                                            color: event.status === 'Live Now' ? '#ef4444' : (event.status === 'Completed' ? '#64748b' : '#059669'),
                                            border: `1px solid ${event.status === 'Live Now' ? '#fee2e2' : (event.status === 'Completed' ? '#e2e8f0' : '#dcfce7')}`
                                        }}>
                                            {event.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: '500' }}>
                                        🍽️ Menu: {event.foodType} • ⏳ Duration: 15 min
                                    </div>
                                </div>

                                <button 
                                    className="btn-premium" 
                                    disabled={event.status === 'Completed'}
                                    style={{ 
                                        border: '1px solid #e2e8f0', 
                                        background: 'white', 
                                        color: '#64748b', 
                                        fontSize: '13px', 
                                        fontWeight: '700',
                                        opacity: event.status === 'Completed' ? 0.5 : 1
                                    }}
                                >
                                    {event.status === 'Completed' ? 'Finished' : 'Notify Me'}
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-12 text-center">
                            <div className="glass-panel" style={{ padding: '80px 40px', background: 'var(--bg-panel)' }}>
                                <div style={{ fontSize: '60px', marginBottom: '24px' }}>📅</div>
                                <h3 style={{ color: '#1e293b', fontWeight: '700' }}>No Events Scheduled</h3>
                                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>The caretakers haven't finalized today's feeding roster yet. Please check back soon!</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="glass-panel mt-5 p-4 text-center" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                        * All showtimes are subject to wildlife behavior and environmental conditions. 
                        Please stay synchronized with the official ZMS broadcast.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;
