import React, { useState, useEffect } from 'react';

export default function BadgeCard({ badge, obtenu, justUnlocked, description }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (justUnlocked) {
      setAnimate(true);
      import('canvas-confetti').then(confetti => {
        confetti.default({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      });
      setTimeout(() => setAnimate(false), 1800);
    }
  }, [justUnlocked]);

  return (
    <div
      className={`badge-card${obtenu ? ' obtenu' : ' bloque'}${animate ? ' animate' : ''}`}
      style={{
        display: 'inline-block',
        margin: '0.7rem',
        padding: '1.1rem 0.7rem 0.7rem 0.7rem',
        borderRadius: '16px',
        background: obtenu ? '#fff' : '#eee',
        boxShadow: obtenu ? '0 2px 8px #e0e0e0' : 'none',
        opacity: obtenu ? 1 : 0.5,
        transition: 'all 0.5s',
        position: 'relative',
        cursor: obtenu ? 'pointer' : 'default',
        border: animate ? '2px solid #43a047' : '2px solid transparent',
        transform: animate ? 'scale(1.12)' : 'scale(1)',
        boxShadow: animate ? '0 0 18px #43a04788' : (obtenu ? '0 2px 8px #e0e0e0' : 'none'),
        animation: animate ? 'badgeVibrate 0.5s linear 2' : 'none',
      }}
      title={description || ''}
    >
      <div style={{fontSize:'2.2rem', marginBottom:'0.3rem'}}>{badge.nom.split(' ')[0]}</div>
      <div style={{fontWeight:700, fontSize:'1.08rem', color: obtenu ? '#1976d2' : '#888'}}>{badge.nom}</div>
      <div style={{fontSize:'0.95rem', color:'#888', marginTop:'0.2rem'}}>
        {obtenu ? 'Débloqué' : 'À débloquer'}
      </div>
      <style jsx>{`
        @keyframes badgeVibrate {
          0% { transform: scale(1.12) rotate(-2deg); }
          25% { transform: scale(1.12) rotate(2deg); }
          50% { transform: scale(1.12) rotate(-2deg); }
          75% { transform: scale(1.12) rotate(2deg); }
          100% { transform: scale(1.12) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
