import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Calendar, Truck, CheckCircle2, ChevronRight, HelpCircle, AlertCircle } from 'lucide-react';

const Tracking = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [searchId, setSearchId] = useState(id || '');
    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchTrackingDetails(id);
        }
    }, [id]);

    const fetchTrackingDetails = async (trackId) => {
        if (!trackId) return;
        setLoading(true);
        setError('');
        setDonation(null);
        try {
            const res = await api.get(`/donations/${trackId}`);
            setDonation(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Donation not found or you are not authorized to track it.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchId.trim()) {
            fetchTrackingDetails(searchId.trim());
        }
    };

    // Calculate active steps based on status
    const getActiveStep = (status) => {
        switch (status) {
            case 'Pending': return 1;
            case 'Accepted': return 2;
            case 'Picked': return 3;
            case 'Delivered': return 4;
            default: return 1;
        }
    };

    const steps = [
        { level: 1, title: "Listed", desc: "Book listed successfully by donor." },
        { level: 2, title: "Claimed", desc: "Accepted & claimed by partner NGO." },
        { level: 3, title: "In Transit", desc: "Dispatched or picked up." },
        { level: 4, title: "Delivered", desc: "Received at NGO library. Fulfillled!" }
    ];

    const currentStep = donation ? getActiveStep(donation.status) : 0;

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Trace Shipment</span>
                <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', color: 'var(--dark)' }}>Track Book Donation</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Track your books from the moment they are listed to when they hit the library shelves.</p>
            </div>

            {!user ? (
                <div className="card-light-blue animate-fade-up" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center', padding: '3.5rem' }}>
                    <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--dark)' }}>Sign In to Track Shipment</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        To protect the privacy of book donors and NGOs, shipment tracking details are only visible to authenticated members of GyanSetu.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to="/login" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                            Sign In
                        </Link>
                        <Link to="/register" style={{ fontWeight: 700, color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '3px', fontSize: '1.05rem' }}>
                            Create Account
                        </Link>
                    </div>
                </div>
            ) : (
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    
                    {/* Search Box */}
                    <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '2rem', borderRadius: 'var(--radius-sm)' }}>
                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    type="text" 
                                    placeholder="Enter Donation Tracking ID (e.g. 6a305a30ea15c8...)"
                                    className="glass-card"
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.8rem 1rem 0.8rem 3.2rem', 
                                        background: '#f8fafc',
                                        border: '1px solid #cbd5e1',
                                        fontSize: '0.95rem',
                                        borderRadius: '4px'
                                    }}
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn-primary" style={{ padding: '0 2rem', borderRadius: '4px' }}>
                                Search
                            </button>
                        </form>
                    </div>

                    {loading && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading tracking details...</div>
                    )}

                    {error && (
                        <div style={{ 
                            color: '#b91c1c', 
                            background: '#fef2f2', 
                            padding: '1.5rem', 
                            borderRadius: '4px', 
                            border: '1px solid #fee2e2',
                            fontSize: '0.95rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Tracking Results Card */}
                    {donation && (
                        <div className="card-light-blue" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            
                            {/* Summary Details */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '1.5rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800 }}>DONATION DETAIL</span>
                                    <h2 style={{ fontSize: '1.8rem', margin: '0.2rem 0 0.5rem 0', color: 'var(--dark)' }}>{donation.bookName}</h2>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                                        Category: <b>{donation.category}</b> | Condition: <b>{donation.condition}</b>
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 650 }}>STATUS</span>
                                    <h3 style={{ fontSize: '1.5rem', margin: '0.2rem 0 0 0', color: donation.status === 'Delivered' ? 'var(--secondary)' : 'var(--accent)' }}>
                                        {donation.status}
                                    </h3>
                                </div>
                            </div>

                            {/* Visual Stepper */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '2rem 0' }}>
                                
                                {/* Connector Line behind steps */}
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '15px', 
                                    left: '5%', 
                                    right: '5%', 
                                    height: '4px', 
                                    background: '#cbd5e1', 
                                    zIndex: 1 
                                }}></div>
                                
                                {/* Active portion of connector line */}
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '15px', 
                                    left: '5%', 
                                    width: `${((currentStep - 1) / (steps.length - 1)) * 90}%`, 
                                    height: '4px', 
                                    background: 'var(--primary)', 
                                    zIndex: 2,
                                    transition: 'width 0.5s ease-in-out'
                                }}></div>

                                {steps.map(step => {
                                    const isActive = currentStep >= step.level;
                                    const isCurrent = currentStep === step.level;
                                    return (
                                        <div key={step.level} style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            position: 'relative',
                                            zIndex: 3,
                                            width: '20%'
                                        }}>
                                            <div style={{ 
                                                width: '32px', 
                                                height: '32px', 
                                                borderRadius: '50%', 
                                                background: isActive ? 'var(--primary)' : '#cbd5e1',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem',
                                                border: isCurrent ? '4px solid white' : 'none',
                                                boxShadow: isCurrent ? '0 0 10px rgba(74, 123, 176, 0.4)' : 'none',
                                                transition: 'all 0.3s ease-in-out'
                                            }}>
                                                {isActive ? '✓' : step.level}
                                            </div>
                                            <h4 style={{ fontSize: '1rem', marginTop: '0.8rem', marginBottom: '0.2rem', color: isActive ? 'var(--dark)' : 'var(--text-muted)' }}>
                                                {step.title}
                                            </h4>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.3 }}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Shipment Info Block */}
                            <div style={{ background: 'white', border: '1px solid #cbd5e1', padding: '1.5rem', borderRadius: '4px' }}>
                                <h4 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: 'var(--dark)' }}>Shipment & Contact Information</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontSize: '0.9rem' }}>
                                    <div>
                                        <p style={{ margin: '0 0 0.5rem 0' }}><b>Delivery Method:</b> {donation.deliveryMethod}</p>
                                        <p style={{ margin: 0 }}>
                                            <b>Pickup Address:</b> {donation.pickupAddress}, {donation.city} - {donation.pincode}
                                        </p>
                                    </div>
                                    <div>
                                        {donation.ngo ? (
                                            <>
                                                <p style={{ margin: '0 0 0.5rem 0' }}><b>Claimed By:</b> {donation.ngo.name}</p>
                                                <p style={{ margin: '0 0 0.5rem 0' }}><b>NGO Phone:</b> {donation.ngo.phone}</p>
                                                <p style={{ margin: 0 }}><b>NGO Email:</b> {donation.ngo.email}</p>
                                            </>
                                        ) : (
                                            <p style={{ margin: 0, color: 'var(--text-muted)' }}><i>Waiting for an NGO to accept this donation list.</i></p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Tracking;
