import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const FAQs = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "Who can donate books on GyanSetu?",
            a: "Anyone! Students, parents, school graduates, professors, authors, and corporate donors can list unused reference guides, NCERT/State Board textbooks, children's storybooks, dictionaries, or competitive exam preparation books."
        },
        {
            q: "How do the books reach the destination NGO?",
            a: "When you list a book, you select a delivery preference: 'Self Drop-off' means you ship the books directly to the NGO's address via standard post/couriers; 'Pickup Request' means you authorize the local NGO to coordinate a pickup at your address (subject to their local availability)."
        },
        {
            q: "Are the books inspected for quality?",
            a: "Yes. NGOs review listings (including book details, grade, and photos) before clicking 'Accept'. Donors are requested to ensure books are readable, with all pages intact, and in Fair, Good, Like New, or New conditions."
        },
        {
            q: "Is GyanSetu free?",
            a: "Yes, GyanSetu is completely free to use. We do not charge anything for registration, listings, or matching. Our mission is pure resource equality and community education support."
        },
        {
            q: "How do I check if my books are accepted?",
            a: "Simply log into your dashboard at any time. Under the 'My Donations' table, you can check the status (Pending, Accepted, Picked, Delivered). The accepting NGO's contact details (name, phone, email) will also become visible so you can coordinate shipping."
        },
        {
            q: "Can I donate digital PDF books or e-books?",
            a: "GyanSetu focuses strictly on physical book donations because many rural schools and libraries do not have active digital reading screens, tablets, or stable internet connectivity."
        }
    ];

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Got Questions?</span>
                <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', color: 'var(--dark)' }}>Frequently Asked Questions</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Everything you need to know about listings, matching, and shipping.</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, idx) => (
                    <div key={idx} style={{ 
                        background: 'white', 
                        border: '1px solid #cbd5e1', 
                        borderRadius: 'var(--radius-sm)', 
                        overflow: 'hidden'
                    }}>
                        <button 
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            style={{ 
                                width: '100%', 
                                padding: '1.5rem', 
                                textAlign: 'left', 
                                background: 'none', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                color: 'var(--dark)',
                                cursor: 'pointer'
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <HelpCircle size={20} color="var(--primary)" /> {faq.q}
                            </span>
                            <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>{openFaq === idx ? '−' : '+'}</span>
                        </button>
                        {openFaq === idx && (
                            <div style={{ 
                                padding: '1.5rem', 
                                borderTop: '1px solid #e2e8f0', 
                                color: 'var(--text-muted)', 
                                fontSize: '0.95rem',
                                lineHeight: 1.7,
                                background: '#f8fafc'
                            }}>
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
