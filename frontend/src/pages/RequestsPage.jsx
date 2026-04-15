import { useState, useEffect } from 'react';
import api from '../services/api';
import { BookOpen, MapPin, Calendar, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cityFilter, setCityFilter] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const url = cityFilter ? `/requests?city=${cityFilter}` : '/requests';
                const res = await api.get(url);
                setRequests(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching requests', error);
                setLoading(false);
            }
        };
        const timer = setTimeout(() => {
            fetchRequests();
        }, 500);
        return () => clearTimeout(timer);
    }, [cityFilter]);

    return (
        <div className="requests-page animate-fade-up">
            <header style={{ 
                textAlign: 'center', 
                padding: '100px 0', 
                background: 'linear-gradient(to bottom, rgba(37,99,235,0.05), transparent)',
                borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                marginBottom: '4rem'
            }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Direct Impact</span>
                <h1 style={{ fontSize: '3.5rem', marginTop: '1rem', marginBottom: '1rem' }}>Active Book <span className="text-gradient">Requests</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Rural schools and NGOs are looking for specific resources. Check if you have what they need to fulfill a dream.
                </p>
            </header>

            <div className="container">
                <div style={{ maxWidth: '600px', margin: '0 auto 4rem auto', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                        type="text" 
                        placeholder="Search by city (e.g. Pune, Mumbai)..." 
                        className="glass-card"
                        style={{ 
                            width: '100%', 
                            padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                            background: 'white',
                            fontSize: '1rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                        }}
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex-center" style={{ padding: '4rem', flexDirection: 'column', gap: '1rem' }}>
                        <div className="animate-pulse" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.5 }}></div>
                        <p style={{ color: 'var(--text-muted)' }}>Fetching latest requests...</p>
                    </div>
                ) : (
                    <div className="grid-cols" style={{ gap: '2.5rem' }}>
                        {requests.map(req => (
                            <div key={req._id} className="glass-card step-card" style={{ 
                                padding: '2rem', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between',
                                background: 'white',
                                border: '1px solid #f1f5f9'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div style={{ 
                                            background: 'rgba(37, 99, 235, 0.1)', 
                                            padding: '1rem', 
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--primary)' 
                                        }}>
                                            <BookOpen size={28} />
                                        </div>
                                        <span style={{ 
                                            fontSize: '0.75rem', 
                                            fontWeight: 800, 
                                            color: 'var(--secondary)', 
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px'
                                        }}>
                                            {req.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{req.bookType}</h3>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{req.quantity}</span>
                                        <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Books Requested</span>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                            <MapPin size={18} color="var(--primary)" />
                                            <span><b>NGO:</b> {req.ngo?.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            <Calendar size={16} />
                                            <span>Posted on {new Date(req.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <Link 
                                    to={`/dashboard/donor?bookType=${encodeURIComponent(req.bookType)}&category=${encodeURIComponent(req.bookType)}`} 
                                    className="btn-primary" 
                                    style={{ marginTop: '2.5rem', justifyContent: 'center', padding: '1rem' }}
                                >
                                    <Heart size={18} /> Donate Now
                                </Link>
                            </div>
                        ))}
                        {requests.length === 0 && (
                            <div className="flex-center" style={{ gridColumn: '1/-1', padding: '6rem', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '50%' }}>
                                    <BookOpen size={48} color="#cbd5e1" />
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No active requests found in this area.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestsPage;
