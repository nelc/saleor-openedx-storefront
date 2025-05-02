import React from 'react';
import './Order.css';
import { renderAddress } from './utils';

export default function Order({ order }) {
  if (!order) return null;

  const subtotal = order.lines.reduce((sum, line) => sum + (line.totalPrice?.net?.amount || 0), 0);
  const currency =
    (order.total && order.total.net && order.total.net.currency) ||
    (order.totalPrice && order.totalPrice.net && order.totalPrice.net.currency) ||
    '';

  return (
    <div className="order-root">
      <div className="order-header">
        <h2 className="order-title">Order Summary</h2>
        <span className="order-id">Order ID: {order.number || order.id}</span>
        <span className="order-status">
          Status: <span className={`order-status-badge status-${order.status?.toLowerCase()}`}>{order.status}</span>
        </span>
        <span className="order-date">
          Placed on: {order.created ? new Date(order.created).toLocaleString() : '-'}
        </span>
        <span className="order-email">
          Email: {order.userEmail}
        </span>
      </div>
      <div className="order-addresses">
        <div>
          <h4>Billing Address</h4>
          <div className="order-address">
            {renderAddress(order.billingAddress)}
          </div>
        </div>
        <div>
          <h4>Shipping Address</h4>
          <div className="order-address">
            {renderAddress(order.shippingAddress)}
          </div>
        </div>
      </div>
      <div className="order-lines-title">Items</div>
      {order.lines.map(line => {
        const product = line.variant?.product;
        const media = product?.media && product.media.length > 0 ? product.media[0] : null;
        return (
          <div key={line.id} className="order-item">
            {media && media.url ? (
              <img src={media.url} alt={media.alt || product?.name || 'Product image'} className="order-img" />
            ) : (
              <div className="order-img order-img-placeholder">No image</div>
            )}
            <div className="order-details">
              <span className="order-name">{product?.name || 'Unknown product'}</span>
              <span className="order-sku">SKU: {line.variant?.sku || '-'}</span>
              <span className="order-qty">Qty: {line.quantity}</span>
            </div>
            <span className="order-price">{currency} {(line.totalPrice?.net?.amount ?? 0).toFixed(2)}</span>
          </div>
        );
      })}
      <div className="order-summary">
        <div className="order-summary-row">
          <span className="order-summary-label">Subtotal</span>
          <span className="order-summary-value">{currency} {subtotal.toFixed(2)}</span>
        </div>
        <div className="order-summary-row">
          <span className="order-summary-label">Shipping</span>
          <span className="order-summary-value">
            {order.shippingMethod?.name || 'Not required'}
          </span>
        </div>
      </div>
      <div className="order-total">
        <span className="order-total-label">Total</span>
        <span className="order-total-amount">
          {currency} {(order.total?.net?.amount ?? order.totalPrice?.net?.amount ?? 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
