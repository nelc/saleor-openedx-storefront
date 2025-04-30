import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';
import Processors from './components/Processors/Processors';
import './App.css';

const GET_CHECKOUT = gql`
  query GetCheckout($id: ID!) {
    checkout(id: $id) {
      id
      lines {
        id
        quantity
        unitPrice { net { amount currency } }
        totalPrice { net { amount } }
        variant { product { name media { alt url(size: 300, format: ORIGINAL) } } }
      }
      totalPrice { net { amount currency } }
    }
  }
`;

export default function App() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const checkoutId = params.get('checkout');
  const processors = [
    { id: 'proc1', label: 'Hyperpay', src: `http://local.overhang.io:8000/hyperpay/payment/pay/?checkoutId=${checkoutId}` },
  ];

  const [activeProc, setActiveProc] = useState(processors[0].id);

  const { loading, error, data } = useQuery(GET_CHECKOUT, {
    variables: { id: checkoutId },
    skip: !checkoutId,
  });

  if (loading) return <p className="checkout-loading">Loading...</p>;
  if (error)   return <p className="checkout-error">Error: {error.message}</p>;

  const checkout = data.checkout;

  return (
    <div className="checkout-container">
      <Processors
        processors={processors}
        activeProc={activeProc}
        setActiveProc={setActiveProc}
      />
      <Checkout checkout={checkout} />
    </div>
  );
}
