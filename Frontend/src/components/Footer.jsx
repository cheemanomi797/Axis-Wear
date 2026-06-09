import React from 'react';

// Custom SVG Icons to avoid dependency/export issues with custom builds of lucide-react
const Phone = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTok = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', padding: '4rem 0 2rem', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img src="/logo.jpeg" alt="" className="logo-image" style={{ height: '40px', width: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ margin: 0, letterSpacing: '2px', fontWeight: 800, lineHeight: '1' }} className="text-gradient">AXIS</h2>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>URBAN. INNOVATION. STYLE.</span>
              </div>
            </div>
            <p className="text-secondary">Premium clothing for the modern individual. Designed for comfort, built for style.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/" className="text-secondary hover:text-primary">Home</a>
              <a href="/shop" className="text-secondary hover:text-primary">Shop</a>
              <a href="/admin/login" className="text-secondary hover:text-primary">Admin Portal</a>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Customer Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="text-secondary">Shipping & Returns</span>
              <span className="text-secondary">FAQ</span>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <a href="https://wa.me/923101748362" className="text-secondary hover:text-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} /> +92 307 6268687
              </a>
            </div>
            <h4 style={{ marginBottom: '1rem' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.instagram.com/axiswearofficialpk?igsh=ZjExanByeGVta3Rh" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/share/18hKQJKcSs/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@axis.wear2026?_r=1&_t=ZS-971zhHmhrpV" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <TikTok size={20} />
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>&copy; {new Date().getFullYear()} Axis Wear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
