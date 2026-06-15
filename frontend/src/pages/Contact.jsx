import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess('Your message has been sent successfully. We will get back to you shortly!');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(''), 5000);
    };

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Get in Touch</span>
                <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', color: 'var(--dark)' }}>Contact Us</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Have questions about bulk onboarding or donations? Write to us.</p>
            </div>

            <div className="card-light-blue" style={{ background: 'white', border: '1px solid #cbd5e1', padding: '3.5rem', borderRadius: 'var(--radius-sm)', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3rem' }}>
                    
                    {/* Information Column */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>Contact Details</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                            Our support desk is available to assist you with registration queries, transport coordination, and corporate book-drive collaborations.
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#f0f7ff', padding: '0.6rem', borderRadius: '4px', color: 'var(--primary)' }}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Address</h4>
                                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--dark)', fontWeight: 600 }}>support@gyansetu.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#f0f7ff', padding: '0.6rem', borderRadius: '4px', color: 'var(--primary)' }}>
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone Hotline</h4>
                                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--dark)', fontWeight: 600 }}>+91 98765 43210</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#f0f7ff', padding: '0.6rem', borderRadius: '4px', color: 'var(--primary)' }}>
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>HQ Location</h4>
                                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--dark)', fontWeight: 600 }}>Pune, Maharashtra, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--dark)' }}>Send a Message</h2>
                        
                        {success && (
                            <div style={{ 
                                color: '#065f46', 
                                background: '#ecfdf5', 
                                padding: '1rem', 
                                borderRadius: '4px', 
                                marginBottom: '1.5rem',
                                fontSize: '0.9rem',
                                border: '1px solid #a7f3d0'
                            }}>
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.8rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.95rem' }} 
                                    value={form.name}
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                />
                            </div>
                            <div style={{ marginBottom: '1.2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.8rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.95rem' }} 
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Message Text</label>
                                <textarea 
                                    required
                                    rows={4}
                                    className="glass-card" 
                                    style={{ width: '100%', padding: '0.8rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.95rem', fontFamily: 'inherit' }} 
                                    value={form.message}
                                    onChange={(e) => setForm({...form, message: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', borderRadius: '4px', fontSize: '1rem' }}>
                                <MessageSquare size={18} /> Submit Enquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
