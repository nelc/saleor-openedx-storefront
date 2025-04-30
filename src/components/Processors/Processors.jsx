import React from 'react';
import './Processors.css';

export default function Processors({ processors, activeProc, setActiveProc }) {
  const current = processors.find(p => p.id === activeProc);

  return (
    <div className="processors-left">
      <h3 className="processors-title">Choose a Payment option!</h3>
      <div className="processors-tabs">
        {processors.map(proc => (
          <button
            key={proc.id}
            onClick={() => setActiveProc(proc.id)}
            className={`processors-tab-btn${proc.id === activeProc ? ' active' : ''}`}
          >
            {proc.label}
          </button>
        ))}
      </div>

      <iframe
        src={current.src}
        title={current.label}
        className="processors-iframe"
      />
    </div>
  );
}
