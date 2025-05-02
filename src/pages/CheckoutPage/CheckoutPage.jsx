import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import Processors from '../../components/Processors/Processors';
import './CheckoutPage.css';
import { GET_CHECKOUT } from '../../queries';

function getProcessors(checkoutId) {
  return [
    { 
      id: 'hyperpay',
      label: 'Hyperpay', 
      src: `http://local.overhang.io:8000/hyperpay/payment/pay/?checkoutId=${checkoutId}`,
      logo: 'https://reporting.hyperpay.com/logonew.png',
    },
  ];
}

export default function CheckoutPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const checkoutId = params.get('checkout');
  const processors = getProcessors(checkoutId);

  const [activeProc, setActiveProc] = useState(processors[0].id);

  const { loading, error, data } = useQuery(GET_CHECKOUT, {
    variables: { id: checkoutId },
    skip: !checkoutId,
  });

  if (loading) return <p className="loading">Loading...</p>;
  if (error)   return <p className="error">Error: {error.message}</p>;

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
