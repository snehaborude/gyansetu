import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Truck, Search, CheckCircle, AlertCircle, Plus, Book as BookIcon, ArrowRight } from 'lucide-react';

const NGODashboard = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);
    const [requests, setRequests] = useState([]);
    const [reqForm, setReqForm] = useState({ quantity: 1, bookType: '' });
    const [activeTab, setActiveTab] = useState('available'); // available, accepted, requests
    const [cityFilter, setCityFilter] = useState('');
    const [sentFeedbacks, setSentFeedbacks] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDonations();
        }, 500);
        return () => clearTimeout(timer);
    }, [cityFilter]);

    useEffect(() => {
        fetchMyRequests();
        fetchSentFeedbacks();
    }, []);

    const fetchSentFeedbacks = async () => {
        try {
            const res = await api.get('/feedback/ngo');
            setSentFeedbacks(res.data);
        } catch (error) {
            console.error('Error fetching sent feedbacks', error);
        }
    };

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            await api.post('/feedback', {
                donationId: selectedDonation._id,
                message: feedbackMessage
            });
            setShowFeedbackModal(false);
            setFeedbackMessage('');
            setSelectedDonation(null);
            fetchSentFeedbacks();
            alert('Thank you! Your note of gratitude has been sent to the donor.');
        } catch (error) {
            console.error('Error submitting feedback', error);
            alert(error.response?.data?.message || 'Failed to send note.');
        }
    };

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
                                        <img src={`http://localhost:5080${d.imageUrl}`} alt="Book" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
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
                                    <img src={`http://localhost:5080${d.imageUrl}`} alt="Book" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
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
                                        <div style={{ marginTop: '0.4rem', fontSize: '0.75rem' }}>
                                            <b>Tracking ID: </b>
                                            <code 
                                                style={{ 
                                                    background: '#f1f5f9', 
                                                    padding: '0.1rem 0.3rem', 
                                                    borderRadius: '4px', 
                                                    cursor: 'pointer', 
                                                    fontFamily: 'monospace',
                                                    border: '1px solid #cbd5e1'
                                                }}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(d._id);
                                                    alert('Copied Tracking ID to clipboard!');
                                                }}
                                                title="Click to copy ID"
                                            >
                                                {d._id}
                                            </code>
                                        </div>
                                        <div style={{ marginTop: '0.4rem' }}>
                                            <Link to={`/track/${d._id}`} style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                                                Trace Shipment <ArrowRight size={12} />
                                            </Link>
                                        </div>
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {sentFeedbacks.some(f => f.donation === d._id || f.donation?._id === d._id) ? (
                                            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 700 }}>
                                                ✓ Gratitude Sent
                                            </span>
                                        ) : (
                                            <button 
                                                className="btn-primary" 
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--secondary)', borderRadius: '4px' }}
                                                onClick={() => {
                                                    setSelectedDonation(d);
                                                    setShowFeedbackModal(true);
                                                }}
                                            >
                                                Send Gratitude
                                            </button>
                                        )}
                                        <div style={{ background: 'var(--secondary)', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
                                            <CheckCircle size={20} />
                                        </div>
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

            {/* Gratitude Modal */}
            {showFeedbackModal && selectedDonation && (
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    background: 'rgba(15, 23, 42, 0.6)', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    zIndex: 2000, 
                    backdropFilter: 'blur(4px)' 
                }}>
                    <form onSubmit={handleSubmitFeedback} className="glass-card animate-fade-up" style={{ width: '100%', maxWidth: '500px', background: 'white', padding: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--dark)', fontFamily: 'Outfit' }}>Send Message of Gratitude</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Write a quick thank-you message to the donor (<b>{selectedDonation.donor?.name}</b>) for donating <b>{selectedDonation.bookName}</b>. Let them know how their books are helping your students!
                        </p>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <textarea 
                                required
                                placeholder="E.g., Thank you so much for donating these science textbooks! Our 8th-grade students are using them daily in our science lab..."
                                value={feedbackMessage}
                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    height: '120px', 
                                    padding: '0.8rem', 
                                    border: '1px solid #cbd5e1', 
                                    borderRadius: 'var(--radius-sm)', 
                                    resize: 'none',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button 
                                type="button" 
                                className="glass-card" 
                                style={{ padding: '0.6rem 1.2rem', background: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer', borderRadius: '4px' }} 
                                onClick={() => {
                                    setShowFeedbackModal(false);
                                    setSelectedDonation(null);
                                    setFeedbackMessage('');
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn-primary" 
                                style={{ padding: '0.6rem 1.5rem', borderRadius: '4px' }}
                            >
                                Send Note
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NGODashboard;
