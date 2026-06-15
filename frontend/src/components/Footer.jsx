import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Mail, Phone, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ 
            background: 'var(--dark)', 
            color: '#cbd5e1', 
            padding: '2rem 3rem 1.5rem 3rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            margin: '0'
        }}>
            <div className="container" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
                {/* Brand Logo and tagline */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '0.35rem', borderRadius: '6px', display: 'flex' }}>
                        <Book size={16} />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit' }}>GyanSetu</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6, marginLeft: '0.5rem', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '0.5rem' }}>
                        Empowering Rural Libraries
                    </span>
                </div>

                {/* Horizontal Links */}
                <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                    <Link to="/" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>Home</Link>
                    <Link to="/about" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>About Us</Link>
                    <Link to="/how-to-help" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>How to Help</Link>
                    <Link to="/requests" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>Active Requests</Link>
                    <Link to="/impact" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>Impact Stories</Link>
                    <Link to="/faqs" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>FAQs</Link>
                    <Link to="/contact" style={{ color: '#cbd5e1', transition: 'color 0.2s' }}>Contact</Link>
                </div>
            </div>

            {/* Bottom Bar: Copyright & Contact */}
            <div className="container" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '1rem', 
                fontSize: '0.78rem', 
                opacity: 0.8
            }}>
                <div>
                    &copy; {new Date().getFullYear()} GyanSetu. Made with <Heart size={8} color="#ef4444" style={{ display: 'inline', fill: '#ef4444' }} /> for educational equity.
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Mail size={12} color="var(--primary)" /> support@gyansetu.com
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Phone size={12} color="var(--primary)" /> +91 98765 43210
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
