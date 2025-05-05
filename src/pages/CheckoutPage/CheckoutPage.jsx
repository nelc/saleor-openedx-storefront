import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Checkout from '../../components/Checkout/Checkout';
import Processors from '../../components/Processors/Processors';
import './CheckoutPage.css';
import { GET_CHECKOUT } from '../../queries';
import { PAYMENT_GATEWAY_INITIALIZE } from '../../mutations';
import { getProcessors } from './utils';

export default function CheckoutPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const checkoutId = params.get('checkout');

  const [activeProc, setActiveProc] = useState(null);
  const [processors, setProcessors] = useState([]);

  const { loading, error, data } = useQuery(GET_CHECKOUT, {
    variables: { id: checkoutId },
    skip: !checkoutId,
  });

  const checkout = data?.checkout;
  const [paymentGatewayInitialize, { data2, loading2, error2 }] = useMutation(PAYMENT_GATEWAY_INITIALIZE);

  if (checkout?.availablePaymentGateways && processors.length == 0){
    const availablePaymentGateways = checkout.availablePaymentGateways;
    const gatewayIds = availablePaymentGateways.map(gateway => ({ id: gateway.id }))
    paymentGatewayInitialize({ variables: { id: checkoutId,  paymentGateways: gatewayIds} }).then((result) => {
      const gatewayConfigs =  result.data.paymentGatewayInitialize.gatewayConfigs;
      setProcessors(getProcessors(gatewayConfigs, checkoutId));
    })
  }

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
