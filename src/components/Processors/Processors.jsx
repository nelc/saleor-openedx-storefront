// Processors.jsx
import React, { useState } from 'react';
import './Processors.css';

export default function Processors({ processors, setActiveProc }) {
  const [activeId, setActiveId] = useState(null);
  const current = processors.find(p => p.id === activeId);

  const handleSelect = (id) => {
    setActiveId(id);
    setActiveProc(id);
  };

  return (
    <div className="processors-left">
      <h3 className="processors-title">Choose Payment Option</h3>
      <div className="processors-box">
        <div className="processors-tabs">
          {processors.map(proc => (
            <button
              key={proc.id}
              onClick={() => handleSelect(proc.id)}
              className={`processors-tab-btn${proc.id === activeId ? ' active' : ''}`}
              aria-label={proc.label}
            >
              <img
                src={proc.logo}
                alt={proc.label}
                className="processors-tab-logo"
              />
            </button>
          ))}
        </div>
      </div>

      {activeId ? (
        <iframe
          src={current.src}
          title={current.label}
          className="processors-iframe"
        />
      ) : (
        <div className="processors-placeholder">
          <p>Please select a payment option to continue.</p>
        </div>
      )}
    </div>
  );
}