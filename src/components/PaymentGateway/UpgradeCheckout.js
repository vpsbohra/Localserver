import React, { useState, useEffect, useRef } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AuthUser from '../AuthUser';

import PayPalLogoImg from '../../images/PayPal-Logo.png';
import Paymnet_typeImg from '../../images/paymnet_type_Frame.png';

const UpgradeCheckout = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const formData = location.state?.data || {};
  const { http, setToken, token } = AuthUser();
  const [cardError, setCardError] = useState(null);
  const cardNumberElementRef = useRef(null);
  const cardExpiryElementRef = useRef(null);
  const cardCvcElementRef = useRef(null);
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get('plan');
  const billing = queryParams.get('billing');
  const price = queryParams.get('price');
  const [payment, setPayment] = useState(null);
  const [fname, setFName] = useState(null);
  const [lname, setLName] = useState(null);
  const [addressLine, setaddressLine] = useState(null);
  const [addressCity, setAddressCity] = useState(null);
  const [addressCountry, setAddressCountry] = useState(null);
  const [addressPostalCode, setAddressPostalCode] = useState(null);
  const [addressState, setAddressSate] = useState(null);
  const [isCardRadioChecked, setIsCardRadioChecked] = useState(false);
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
  const [planEndDate, setPlanEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const userString = sessionStorage.getItem('user');
  const user_detail = JSON.parse(userString);

  const handleCardRadioChange = (e) => {
    setIsCardRadioChecked(e.target.checked);
  };
  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { id } = user;
    setUserId(id);
    if (plan === 'fidelity') {
      if (billing === 'monthly') {
        setPlanEndDate(1);
      } else if (billing === 'quarterly') {
        setPlanEndDate(3);
      } else if (billing === 'yearly') {
        setPlanEndDate(12);
      }
    }

    if (plan === 'classic') {
      if (billing === 'monthly') {
        setPlanEndDate(1);
      }
    }
    const renderAdditionalInfo = (plan, billing) => {
      if (plan === 'fidelity') {
        if (billing === 'monthly') {
          setPlanEndDate(1);
        } else if (billing === 'quarterly') {
          setPlanEndDate(3);
        } else if (billing === 'yearly') {
          setPlanEndDate(12);
        }
      }

      if (plan === 'classic') {
        if (billing === 'monthly') {
          setPlanEndDate(1);
        }
      }

    };
    if (stripe) {
      const cardStyle = {
        base: {
          fontSize: '16px',
          color: '#333',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      };
      const elementsOptions = {
        style: cardStyle,
      };
      const cardNumberElement = elements.create('cardNumber', elementsOptions);
      cardNumberElement.mount(cardNumberElementRef.current);

      const cardExpiryElement = elements.create('cardExpiry', elementsOptions);
      cardExpiryElement.mount(cardExpiryElementRef.current);

      const cardCvcElement = elements.create('cardCvc', elementsOptions);
      cardCvcElement.mount(cardCvcElementRef.current);

      cardNumberElement.on('change', (event) => {
        setCardError(event.error ? event.error.message : '');
      });

      cardExpiryElement.on('change', (event) => {
        setCardError(event.error ? event.error.message : '');
      });

      cardCvcElement.on('change', (event) => {
        setCardError(event.error ? event.error.message : '');
      });
    }
  }, [stripe]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    
    if (!stripe || !elements) {
      return;
    }
    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);
    

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`,
    };
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
        billing_details: {
          name: fname + ' ' + lname,
          address: {
            city: addressCity,
            country: addressCountry,
            line1: addressLine,
            postal_code: addressPostalCode,
            state: addressState,
          }
        }
      });
      const cardData = {
        card_number: cardNumber && cardNumber.value,
        cvv: cardCvc && cardCvc.value,
        expiration: cardExpiry && cardExpiry.value,
        cardLast4: paymentMethod.card && paymentMethod.card.last4,
        user_id: userId,
      };
  
      axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-card`, cardData, { headers })
        .then(response => {
          console.log('Card updated successfully:', response.data);
          setErrors({});
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
            console.log('API error:', error.response.data.errors);
          } else {
            console.error('Error updating card:', error);
          }
        });
      
      const data = {
        paymentMethodId: paymentMethod.id, paymentMethodType: paymentMethod.type, payeeName: paymentMethod.billing_details, paymentMethod: paymentMethod.billing_details.address, plan: plan, billing: billing, price: price, cardLast4: paymentMethod.card, planEndDate: planEndDate, userId: user_detail.id,
      }
      
        const response = axios.patch('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/upgrade-plan', { data }, { headers: headers })
    
      
     
        .then((res) => {
          const { access_token, user } = res.data;
          setLoading(false);
          setSuccess(true);
          setToken(res.data.user, res.data.access_token);
          setPayment(res.data.payment);
          console.log(res.data.payment);
          navigate('/parent-dashboard', { state: { user } });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            setErrors(errors);
            setLoading(false);
          } else {
          }
        });
     
        

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="content payment_page">
        <div className="container">
          <h1>Add your payment details</h1>
          <div className="content_form">
            {!success ? (
              <form id="credit_card_form" onSubmit={handleSubmit}>
                <div className="PaymentLeft-content">
                  <div className="form-check paypal_payment">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      <img src={PayPalLogoImg} alt="protected" />
                    </label>
                  </div>
                  <div className="form-check Credit_Card">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="card_radio"
                      onChange={handleCardRadioChange}
                      checked='checked'
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">Credit Card</label>
                    <img src={Paymnet_typeImg} alt="protected" />
                  </div>

                  <div className="payment-inputs">
                    <label htmlFor="">Card Number</label>
                    <div className="custom-input-element" ref={cardNumberElementRef}></div>
                  </div>
                  <div className="payment-inputs_full">
                    <div className="payment-inputs">
                      <label htmlFor="">Expiration</label>
                      <div className="custom-input-element" ref={cardExpiryElementRef}></div>
                    </div>
                    <div className="payment-inputs">
                      <label htmlFor="">Security Code</label>
                      <div className="custom-input-element" ref={cardCvcElementRef}></div>
                    </div>
                  </div>
                  <div className="payment-inputs_full">
                    <div className="payment-inputs">
                      <label htmlFor="">First Name</label>
                      <input type="text" value={fname} onChange={(e) => setFName(e.target.value)} placeholder="First Name" />
                    </div>
                    <div className="payment-inputs">
                      <label htmlFor="">Last Name</label>
                      <input type="text" value={lname} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="payment-inputs">
                    <label htmlFor="">Address</label>
                    <input type="text" value={addressLine} onChange={(e) => setaddressLine(e.target.value)} placeholder="Address" />
                  </div>
                  <div className="payment-inputs">
                    <label htmlFor="">Country</label>
                    <input type="text" value={addressCountry} onChange={(e) => setAddressCountry(e.target.value)} placeholder="Country" />
                  </div>
                  <div className="payment-inputs">
                    <label htmlFor="">State</label>
                    <input type="text" value={addressState} onChange={(e) => setAddressSate(e.target.value)} placeholder="State" />
                  </div>
                  <div className="payment-inputs_full city_postal">
                    <div className="payment-inputs">
                      <label htmlFor="">City</label>
                      <input type="text" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} placeholder="City" />
                    </div>
                    <div className="payment-inputs">
                      <label htmlFor="">Postal</label>
                      <input type="text" value={addressPostalCode} onChange={(e) => setAddressPostalCode(e.target.value)} placeholder="Postal Code" />
                    </div>
                  </div>
                </div>
                <div className="Paymentright-content">
                  <h2>Your Plan</h2>
                  <div className="plan">
                    <p>{plan} ({billing})</p><p>{numericPrice} USD</p>
                  </div>
                  <div className="total">
                    <div className='total_excl'><p>Total</p><span>(excl. tax)</span></div>
                    <p className='price_ttotal'>{numericPrice} USD</p>
                  </div>
                  {loading ? <div className="loader">Loading...</div> : <button type="submit">Confirm and Pay</button>}
                </div>
              </form>
            ) : (
              <div>
                <p>Payment Successful!</p>
              </div>
            )}
            <Link className='button_cntr_sub button_cntrlogin' to="/subscription">
              <button type="button">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UpgradeCheckout;
