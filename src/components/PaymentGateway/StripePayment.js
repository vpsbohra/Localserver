import React from 'react';
import { ElementsConsumer,CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51JglL5SImsibraserGbtcoJ6f1G9Imi6yYx0QVjWoRlcwQQtaIL2LaetfIlrTDhTnlgothW78Tl7qu6wbD2yvg4J00y3GgDUgu');

const StripePayment = () => {
  return (
    <>
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
    </>
  );
};

export default StripePayment;
