import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Truck, Search, CheckCircle, AlertCircle, Plus } from 'lucide-react';

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
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>NGO Panel: {user?.name}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your book requests and active collections.</p>
                </div>
                <button className="btn-primary" onClick={() => setActiveTab('new-request')}>
                    <Plus size={20} /> New Request
                </button>
            </header>

            <div className="tabs flex-center" style={{ gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                <button 
                    onClick={() => setActiveTab('available')}
                    style={{ background: 'none', fontWeight: activeTab === 'available' ? 700 : 400, color: activeTab === 'available' ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                    Available Donations
                </button>
                <button 
                    onClick={() => setActiveTab('accepted')}
                    style={{ background: 'none', fontWeight: activeTab === 'accepted' ? 700 : 400, color: activeTab === 'accepted' ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                    My Pickups
                </button>
                <button 
                    onClick={() => setActiveTab('requests')}
                    style={{ background: 'none', fontWeight: activeTab === 'requests' ? 700 : 400, color: activeTab === 'requests' ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                    My Requests
                </button>
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
                        <div key={d._id} className="glass-card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ background: 'var(--light)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{d.category}</span>
                                <span style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700 }}>AVAILABLE</span>
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{d.bookName}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Condition: <b>{d.condition}</b></p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                Method: <b style={{ color: d.deliveryMethod === 'Self Drop-off' ? 'var(--secondary)' : 'var(--primary)' }}>{d.deliveryMethod || 'Pickup Request'}</b>
                            </p>
                            {(!d.deliveryMethod || d.deliveryMethod === 'Pickup Request') && (
                                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}><Truck size={14} style={{ marginRight: '0.5rem' }} /> {d.pickupAddress}</p>
                            )}
                            {d.deliveryMethod === 'Self Drop-off' && (
                                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}><CheckCircle size={14} style={{ marginRight: '0.5rem' }} /> Donor will drop off</p>
                            )}
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
                            <div>
                                <h3 style={{ margin: 0 }}>{d.bookName}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>From: {d.donor?.name || 'Anonymous Donor'}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: 0 }}>Contact: {d.donor?.phone || 'N/A'}</p>
                                {d.pickupDate && <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: '0.2rem 0' }}>Schedule: {new Date(d.pickupDate).toLocaleDateString()}</p>}
                                {d.city && <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', margin: 0 }}>City: {d.city}</p>}
                            </div>
                            <div className="flex-center" style={{ gap: '1rem' }}>
                                <select 
                                    className="glass-card" 
                                    style={{ padding: '0.5rem', background: 'white' }}
                                    value={d.status}
                                    onChange={(e) => handleUpdateStatus(d._id, e.target.value)}
                                >
                                    <option value="Accepted">Accepted</option>
                                    <option value="Picked">Picked</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                {d.status === 'Delivered' && <CheckCircle color="var(--secondary)" />}
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
