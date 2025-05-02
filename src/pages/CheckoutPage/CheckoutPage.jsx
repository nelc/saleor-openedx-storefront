import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import Processors from '../../components/Processors/Processors';
import './CheckoutPage.css';
import { GET_CHECKOUT } from '../../queries';
import { getProcessors } from './utils';

export default function CheckoutPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const checkoutId = params.get('checkout');

  const [activeProc, setActiveProc] = useState(null);

  const { loading, error, data } = useQuery(GET_CHECKOUT, {
    variables: { id: checkoutId },
    skip: !checkoutId,
  });

  const checkout = data?.checkout;
  const processors = getProcessors(checkout?.availablePaymentGateways, checkoutId);

  useEffect(() => {
    if (!activeProc && processors.length > 0) {
      setActiveProc(processors[0].id);
    }
  }, [processors, activeProc]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="checkout-container">
      <Processors
        processors={processors}
        setActiveProc={setActiveProc}
      />
      <Checkout checkout={checkout} />
    </div>
  );
}
