import React from 'react';
import './Checkout.css';

export default function Checkout({ checkout }) {
  if (!checkout) return null;

  const subtotal = checkout.lines.reduce((sum, line) => sum + line.totalPrice.net.amount, 0);
  const currency = checkout.totalPrice.net.currency;

  return (
    <div className="co-root">
      <div className="co-header"><h2 className="co-title">Your Cart</h2></div>
      {checkout.lines.map(line => (
        <div key={line.id} className="co-item">
          <img src={line.variant.product.media[0].url} alt={line.variant.product.media[0].alt} className="co-img" />
          <div className="co-details">
            <span className="co-name">{line.variant.product.name}</span>
            <span className="co-qty">Qty: {line.quantity}</span>
          </div>
          <span className="co-price">{currency} {line.totalPrice.net.amount.toFixed(2)}</span>
        </div>
      ))}
      <div className="co-summary">
        <div className="co-summary-row">
          <span className="co-summary-label">Subtotal</span>
          <span className="co-summary-value">{currency} {subtotal.toFixed(2)}</span>
        </div>
        <div className="co-summary-row">
          <span className="co-summary-label">
            Shipping 
            <span title="Shipping will be calculated at the next step" className="co-info">?</span>
          </span>
          <span className="co-summary-value">Not required</span>
        </div>
      </div>
      <div className="co-total">
        <span className="co-total-label">Total</span>
        <span className="co-total-amount">{currency} {checkout.totalPrice.net.amount.toFixed(2)}</span>
      </div>
    </div>
  );
}
