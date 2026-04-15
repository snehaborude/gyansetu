import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Truck, Search, CheckCircle, AlertCircle, Plus, Book as BookIcon } from 'lucide-react';

const NGODashboard = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [reqForm, setReqForm] = useState({ quantity: 1, bookType: '' });
    const [activeTab, setActiveTab] = useState('available'); // available, accepted, requests
    const [cityFilter, setCityFilter] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDonations();
        }, 500);
        return () => clearTimeout(timer);
    }, [cityFilter]);

    useEffect(() => {
        fetchMyRequests();
    }, []);

    const fetchDonations = async () => {
        try {
            const url = cityFilter ? `/donations?city=${cityFilter}` : '/donations';
            const res = await api.get(url);
            setDonations(res.data);
        } catch (error) {
            console.error('Error fetching donations', error);
        }
    };

    const fetchMyRequests = async () => {
        try {
            const res = await api.get('/requests');
            // Filter to show only this NGO's requests if needed, 
            // but the route currently returns all. Let's filter here.
            setRequests(res.data.filter(r => r.ngo._id === user?._id));
        } catch (error) {
            console.error('Error fetching requests', error);
        }
    };

    const handleAccept = async (id) => {
        try {
            await api.put(`/donations/${id}/status`, { status: 'Accepted' });
            fetchDonations();
        } catch (error) {
            console.error('Error accepting donation', error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/donations/${id}/status`, { status });
            fetchDonations();
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        try {
            await api.post('/requests', reqForm);
            setReqForm({ quantity: 1, bookType: '' });
            fetchMyRequests();
        } catch (error) {
            console.error('Error creating request', error);
        }
    };

    return (
        <div className="dashboard animate-fade-up">
            <header style={{ 
                marginBottom: '3.5rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'end',
                padding: '2.5rem',
                background: 'linear-gradient(135deg, var(--dark) 0%, #1e293b 100%)',
                borderRadius: 'var(--radius-lg)',
                color: 'white',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div>
                    <span style={{ color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Institution Panel</span>
                    <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem' }}>Greetings, {user?.name}</h1>
                    <p style={{ opacity: 0.8, marginTop: '0.5rem' }}>Manage your scholarly requests and donor collections in one place.</p>
                </div>
                <button className="btn-primary" style={{ background: 'white', color: 'var(--dark)', padding: '1rem 2rem' }} onClick={() => setActiveTab('new-request')}>
                    <Plus size={22} /> Post New Requirement
                </button>
            </header>

            <div className="tabs flex-center" style={{ gap: '3rem', marginBottom: '3rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                {['available', 'accepted', 'requests'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{ 
                            background: 'none', 
                            fontWeight: activeTab === tab ? 800 : 500, 
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            padding: '1rem 0.5rem',
                            position: 'relative',
                            fontSize: '1rem',
                            transition: 'color 0.3s ease'
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace('available', 'Open Donations').replace('accepted', 'Active Pickups').replace('requests', 'Our Requests')}
                        {activeTab === tab && (
                            <div style={{ position: 'absolute', bottom: '-8px', left: 0, right: 0, height: '3px', background: 'var(--primary)', borderRadius: '10px' }}></div>
                        )}
                    </button>
                ))}
            </div>

            {activeTab === 'available' && (
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ position: 'relative', maxWidth: '300px', marginBottom: '1.5rem' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            placeholder="Filter by city..." 
                            className="glass-card"
                            style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', background: 'white' }}
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                        />
                    </div>
                    <div className="grid-cols">
                        {donations.filter(d => d.status === 'Pending').map(d => (
                        <div key={d._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    {d.imageUrl ? (
                                        <img src={`http://localhost:5000${d.imageUrl}`} alt="Book" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                    ) : (
                                        <div style={{ background: 'var(--light)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                                            <BookIcon size={24} color="var(--primary)" />
                                        </div>
                                    )}
                                    <div>
                                        <span style={{ background: 'var(--light)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block', marginBottom: '0.5rem' }}>{d.category}</span>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{d.bookName}</h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>Condition: <b>{d.condition}</b></p>
                                    </div>
                                </div>
                                <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>AVAILABLE</span>
                            </div>

                            <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', fontSize: '0.9rem' }}>
                                <p style={{ margin: '0 0 0.4rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Truck size={16} color="var(--primary)" /> 
                                    <b>{d.deliveryMethod || 'Pickup Request'}</b>
                                </p>
                                {(!d.deliveryMethod || d.deliveryMethod === 'Pickup Request') && (
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.pickupAddress}, {d.city} - {d.pincode}</p>
                                )}
                            </div>

                            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleAccept(d._id)}>
                                Accept Donation
                            </button>
                        </div>
                    ))}
                    {donations.filter(d => d.status === 'Pending').length === 0 && <p className="flex-center" style={{ gridColumn: '1/-1', padding: '4rem', color: 'var(--text-muted)' }}>No available donations right now.</p>}
                </div>
                </div>
            )}

            {activeTab === 'accepted' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {donations.filter(d => d.status !== 'Pending' && (d.ngo === user?._id || d.ngo?._id === user?._id)).map(d => (
                        <div key={d._id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                {d.imageUrl ? (
                                    <img src={`http://localhost:5000${d.imageUrl}`} alt="Book" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                ) : (
                                    <div style={{ background: 'var(--light)', padding: '0.8rem', borderRadius: '4px' }}>
                                        <BookIcon size={20} color="var(--primary)" />
                                    </div>
                                )}
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{d.bookName}</h3>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                                        <p style={{ margin: 0 }}><b>Donor:</b> {d.donor?.name} | <span style={{ color: 'var(--primary)' }}>{d.donor?.phone}</span></p>
                                        <p style={{ margin: '0.2rem 0 0 0' }}><b>Type:</b> {d.deliveryMethod}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-center" style={{ gap: '1.5rem' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ margin: '0 0 0.3rem 0', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Update Status</p>
                                    <select 
                                        className="glass-card" 
                                        style={{ padding: '0.5rem', background: 'white', border: '1px solid var(--glass-border)', fontSize: '0.85rem', cursor: 'pointer' }}
                                        value={d.status}
                                        onChange={(e) => handleUpdateStatus(d._id, e.target.value)}
                                    >
                                        <option value="Accepted">Accepted</option>
                                        <option value="Picked">Picked Up</option>
                                        <option value="Delivered">Received / Done</option>
                                    </select>
                                </div>
                                {d.status === 'Delivered' && (
                                    <div style={{ background: 'var(--secondary)', color: 'white', padding: '0.5rem', borderRadius: '50%' }}>
                                        <CheckCircle size={20} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {donations.filter(d => d.status !== 'Pending' && (d.ngo === user?._id || d.ngo?._id === user?._id)).length === 0 && <p style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No active pickups.</p>}
                </div>
            )}

            {activeTab === 'requests' && (
                <div className="grid-cols">
                    {requests.map(r => (
                        <div key={r._id} className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <h3 style={{ margin: 0 }}>{r.bookType}</h3>
                            <p style={{ fontSize: '1.5rem', fontWeight: 800, margin: '1rem 0' }}>{r.quantity} Books</p>
                            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: r.status === 'Open' ? '#dbeafe' : '#dcfce7', color: r.status === 'Open' ? 'var(--primary)' : 'var(--secondary)', borderRadius: '4px', fontWeight: 700 }}>
                                {r.status.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'new-request' && (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <form className="glass-card" style={{ width: '100%', maxWidth: '500px' }} onSubmit={handleCreateRequest}>
                        <h2 style={{ marginBottom: '2rem' }}>Request Books</h2>
                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Type of Books needed</label>
                            <input 
                                type="text" 
                                required 
                                className="glass-card" 
                                style={{ width: '100%', padding: '0.8rem', background: 'white' }} 
                                placeholder="e.g. Middle School Math, Storybooks"
                                value={reqForm.bookType}
                                onChange={(e) => setReqForm({...reqForm, bookType: e.target.value})}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Estimated Quantity</label>
                            <input 
                                type="number" 
                                required 
                                className="glass-card" 
                                style={{ width: '100%', padding: '0.8rem', background: 'white' }} 
                                value={reqForm.quantity}
                                onChange={(e) => setReqForm({...reqForm, quantity: e.target.value})}
                            />
                        </div>
                        <div className="flex-center" style={{ gap: '1rem' }}>
                            <button type="button" className="btn-primary" style={{ background: 'var(--text-muted)', width: '50%', justifyContent: 'center' }} onClick={() => setActiveTab('requests')}>Cancel</button>
                            <button type="submit" className="btn-primary" style={{ width: '50%', justifyContent: 'center' }}>Submit Request</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NGODashboard;
