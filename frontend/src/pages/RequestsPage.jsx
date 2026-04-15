import { useState, useEffect } from 'react';
import api from '../services/api';
import { BookOpen, MapPin, Calendar, Heart } from 'lucide-react';
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
            <header style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary)' }}>Active Book Requests</h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
                    Rural schools and NGOs are looking for these books. Check if you can help fulfill a need.
                </p>
            </header>

            <div style={{ maxWidth: '400px', margin: '0 auto 3rem auto', position: 'relative' }}>
                <input 
                    type="text" 
                    placeholder="Search by city..." 
                    className="glass-card"
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 1rem', background: 'white' }}
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex-center" style={{ padding: '4rem' }}>Loading requests...</div>
            ) : (
                <div className="grid-cols">
                    {requests.map(req => (
                        <div key={req._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ background: 'var(--light)', padding: '0.8rem', borderRadius: 'var(--radius-sm)' }}>
                                        <BookOpen size={24} color="var(--primary)" />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)' }}>{req.status.toUpperCase()}</span>
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{req.bookType}</h3>
                                <p style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
                                    {req.quantity} <span style={{ fontSize: '1rem', fontWeight: 400 }}>Books Needed</span>
                                </p>
                                <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1rem 0' }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    <MapPin size={16} />
                                    <span>NGO: {req.ngo?.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <Calendar size={16} />
                                    <span>Posted: {new Date(req.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            <Link to={`/dashboard/donor?bookType=${encodeURIComponent(req.bookType)}&category=${encodeURIComponent(req.bookType)}`} className="btn-primary" style={{ marginTop: '2rem', justifyContent: 'center' }}>
                                <Heart size={18} /> Donate Now
                            </Link>
                        </div>
                    ))}
                    {requests.length === 0 && <p className="flex-center" style={{ gridColumn: '1/-1', padding: '4rem' }}>No active requests found.</p>}
                </div>
            )}
        </div>
    );
};

export default RequestsPage;
