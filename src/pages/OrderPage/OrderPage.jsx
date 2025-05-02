import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ORDER } from '../../queries';
import Order from '../../components/Order/Order';
import './OrderPage.css';

export default function OrderPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('order');

  const { loading, error, data } = useQuery(GET_ORDER, {
    variables: { id: orderId },
    skip: !orderId,
  });

  if (loading) return <p className="loading">Loading...</p>;
  if (error)   return <p className="error">Error: {error.message}</p>;

  return (
    <div className="order-container">
      <Order order={data?.order} />
    </div>
  );
}
