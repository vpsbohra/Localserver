
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthUser from '../AuthUser';

import CirclePlu01Img from '../../images/Circle_Plus01.png';
import PayPalLogoImg from '../../images/PayPal-Logo.png';
import Paymnet_typeImg from '../../images/paymnet_type_Frame.png';
import Edit_typeImg from '../../images/Edit.png';
import close_iconImage from '../../images/close_icon_sr.png';
import close_BTnImage from '../../images/Close_btn_sr.png';

const BillingAndSubscription = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState('');
  const [currenBilling, setCurrentBilling] = useState('');
  const [userId, setUserId] = useState('');
  const [member, isMember] = useState(false);
  const { token } = AuthUser();
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [payments, setPayments] = useState([]);
  const [addMemberSuccess, setAddMemberSuccess] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [owner, setOwner] = useState(false);
  const [spouse, setSpouse] = useState('');
  const[text,setText]=useState(false);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);

    const day = new Date(dateString).getDate();
    const daySuffix = getDaySuffix(day);

    return formattedDate.replace(/\d{1,2}/, `${day}${daySuffix}`);
  }

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  function close() {
    setAddMemberSuccess(false);
    isMember(false);
    setShowPopup(false);
    setShowMember(false);
  }

  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { plan } = user;
    const { billing } = user;
    const { id } = user;
    const { spouse } = user;
    const { name } = user;
    setCurrentPlan(plan);
    setCurrentBilling(billing);
    setUserId(id);
    setSpouse(spouse);
    // console.log(spouse);
    // console.log(sessionStorage.getItem("owner"))
    setOwner(sessionStorage.getItem("owner"));
    // console.log(owner);
  }, []);
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/members/${userId}`);
      const membersData = response.data;
      setMembers(membersData);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  useEffect(() => {

    fetchMembers();
  }, [userId]);
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/payment-details/${userId}`);
        const paymentsData = response.data;
        console.log("paymentData", paymentsData);
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, [userId]);
  const myComponentStyle = {
    width: '72%',
  };
  const changePaymetMethod = () => {
    setShowPopup(!showPopup);
  }
  const manageMember = (member) => {
    setSelectedMember(member);
    setShowMember(true);
  };

  const handleAddMember = () => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const firstName = document.getElementsByName('fname')[0].value;
    const lastName = document.getElementsByName('lname')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    setMemberName(firstName);
    const memberData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      user_id: userId,
    };

    axios.post('https://phplaravel-1142377-3976235.cloudwaysapps.com/api/add-member', memberData, { headers })
      .then(response => {
        console.log('Member added successfully:', response.data);
        // isMember(false);
        setErrors({});
        setAddMemberSuccess(true);
        fetchMembers();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });
  };

  const handleCardUpdate = () => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const card_number = document.getElementsByName('card_number')[0].value;
    const card_cvc = document.getElementsByName('cvv')[0].value;
    const card_expire_date = document.getElementsByName('expiration')[0].value;
    const lastFourDigits = card_number.slice(-4);

    const cardData = {
      card_number: card_number,
      cvv: card_cvc,
      expiration: card_expire_date,
      cardLast4: lastFourDigits,
      user_id: userId,
    };

    axios.post(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-card`, cardData, { headers })
      .then(response => {
        console.log('Card added successfully:', response.data);
        setErrors({});
        setShowPopup(false);
        setSelectedCard(cardData);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding card:', error);
        }
      });
  };

  const handleMemberUpdate = () => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const first_name = document.getElementsByName('fname')[0].value;
    const last_name = document.getElementsByName('lname')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    const memberData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      user_id: selectedMember.id,
    };

    axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-member`, memberData, { headers })
      .then(response => {
        console.log('Member updated successfully:', response.data);
        setErrors({});
        setShowMember(false);
        fetchMembers();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });

  }
  const removeMember = () => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/remove-member/${selectedMember.id}`, { headers })
      .then(response => {
        console.log('Member deleted successfully:', response.data);
        setShowMember(false);
        fetchMembers();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });

  }
  return (
    <>
      {showPopup ? (
        <div className="right_sidebar_parent">
          <div className="Update_Payment_parent">
            <div className="popup-container">
              <div className="popup-content">
                <h1>Update Payment Method</h1>
                <div className="form-check Credit_Card">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="card_radio"
                    checked='checked'
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">Credit Card</label>
                  <img src={Paymnet_typeImg} alt="protected" />
                </div>
                <div className="form-group">
                  <label htmlFor="card_number" className="card-number">Card Number</label>
                  <input maxLength={16} type="" name="card_number" className="form-control" />
                  {errors && errors.card_number && (
                    <p className="error-message">{errors.card_number}</p>
                  )}
                </div>
                <div className="ExpirationSecurity_group">
                  <div className="form-group">
                    <label htmlFor="expiration" className="card-expiration">Expiration</label>
                    <input type="date" name="expiration" className="form-control" />
                    {errors && errors.expiration && (
                      <p className="error-message">{errors.expiration}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv" className="card-cvv">Security Code</label>
                    <input max={4} type="number" name="cvv" className="form-control" />
                    {errors && errors.cvv && (
                      <p className="error-message">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                <div className="form-check paypal_payment">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    <img src={PayPalLogoImg} alt="protected" />
                  </label>
                </div>
                <div className="card-footer">
                  <button className="submit-card cancel_card" onClick={close}>Cancel</button>
                  <button className="submit-card" onClick={handleCardUpdate}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (<div className="main-container" style={myComponentStyle}>
        {member && (
          <div class="billing-info-popup">
          <div className="password-update">
            <button className='closed_popup_password' onClick={close}><img src={close_BTnImage} alt="protected" /></button>
            <div className="add-member">
              {addMemberSuccess ? (
                <div className="success">
                  {memberName} has been successfully added!
                </div>
              ) : (
                <div className="add-member">
                  <h2>Add a Member</h2>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      name="fname"
                    />
                    {errors && errors.first_name && (
                      <p className="error-message">{errors.first_name}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      name="lname"
                    />
                    {errors && errors.last_name && (
                      <p className="error-message">{errors.last_name}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email address"
                      name="email"
                    />
                    {errors && errors.email && (
                      <p className="error-message">{errors.email}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      name="phone"
                    />
                    {errors && errors.phone && (
                      <p className="error-message">{errors.phone}</p>
                    )}
                  </div>
                </div>
              )}
              <div className="form-group payment_btn_lastoption">
                <button onClick={handleAddMember} className='add_paymentplan'>Add to Your Payment Plan</button>
                <button className='send_invitation'>Send an Invitation</button>
                <p>*The additional fee of $3.5/month will be covered by the member themselves</p>
              </div>
            </div>

          </div>
          </div>
        )}



        {showMember && selectedMember && (
          <div className="edit_member edit_member_srmain">
            <div className="edit_member_inner_SR">
              <button className="close closed_popup_password" onClick={() => {setShowMember(false);setText(false)}} ><img src={close_BTnImage} alt="protected" /></button>
              <h2>{selectedMember.first_name} {selectedMember.last_name}</h2>
              <div className="form-group">
                <label>First Name*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="fname"
                  defaultValue={selectedMember.first_name}
                />
                <img src={Edit_typeImg} alt="protected" />
                {errors && errors.first_name && (
                  <p className="error-message">{errors.first_name}</p>
                )}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  name="lname"
                  defaultValue={selectedMember.last_name}
                />
                <img src={Edit_typeImg} alt="protected" />
                {errors && errors.last_name && (
                  <p className="error-message">{errors.last_name}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  name="email"
                  defaultValue={selectedMember.email}
                  onClick={()=>setText(true)}
                />
                <img src={Edit_typeImg} alt="protected" />
                {text && (
                  <><p>*We'll send an email to your added member, allowing them to create their 4-digit password and complete their profile.</p></>
                )}
                {errors && errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  name="phone"
                  defaultValue={selectedMember.phone}
                />
                <img src={Edit_typeImg} alt="protected" />
                {errors && errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className='button_cntrl'>
              <button className='removeMember' onClick={removeMember} >Remove Member</button>
              <button className='UpdateMember' onClick={handleMemberUpdate}>Update</button>
            </div>
          </div>
        )}
        <div className="Billing_Subscriptions_main">
          <h1>Billing and Subscriptions</h1>
          <div className="billing-content">
            <div className="current-pan">
              <h2>Current Plan</h2>
              <div className="billing_dd-pan">

                {currentPlan === 'free' ? (
                  <div className='currentPlan_sr'>
                    <p>{currentPlan}</p>
                    <p>
                      <Link to='/subscription'>Explore Plans</Link>
                    </p>

                  </div>

                ) : currentPlan === 'classic' ? (
                  <>
                    <div className='currentPlan_sr'>
                      <p>{currentPlan}</p>
                      <p>
                        {owner === "false" ? (
                          <Link to='/subscription'>Explore Plans</Link>
                        ) : (
                          <Link to='/subscription'>Upgrade Plan</Link>
                        )}

                      </p>
                    </div>
                    <p className='monthly_prgph'>Monthly (Renews on August 17th, 2023)</p>

                  </>

                ) : (
                  <>
                    <div className='currentPlan_sr'>
                      <p>{currentPlan}</p>
                      <p>
                        {owner === "false" ? (
                          <Link to='/subscription'>Explore Plans</Link>
                        ) : (
                          <Link to='/subscription'>Change Plan</Link>
                        )}
                      </p>
                    </div>
                    <p className='monthly_prgph'>Monthly (Renews on August 17th, 2023)</p>
                    <Link to='/subscription' ><span>Switch to a Yearly plan and save up to 50%</span></Link>
                  </>

                )
                }
              </div>
            </div>

            <div className="extended-family">
              {owner === "false" ? (
                <></>
              ) : (
                <>
                  {currentPlan === 'free' ? (
                    <>
                      <h2>Extended Family</h2>
                      <p>
                        Only available on our premium plans.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2>Extended Family</h2>
                      <div className="manage_member_sr">
                        <div className="members-list">
                          {members.map((member) => (
                            <div className="member-input" key={member.id}>
                              <p>{member.first_name} {member.last_name}</p> <button onClick={() => manageMember(member)}>Manage Member</button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="add-member">
                        {isMember && (
                          <button className='' onClick={() => isMember(true)}><img src={CirclePlu01Img} alt="protected" /> Add a member</button>
                        )}
                      </div>
                    </>

                  )}</>
              )}

            </div>
            <div className="payment-method">
              <h2>Payment Method</h2>
              {currentPlan === 'free' || owner === "false" ? (
                <div className='added_memberPayment'>
                  <p>
                    Your account is currently covered by the account owner's payment.
                  </p>
                  <p className='color_memberPayment' style={{ color: '#6DC1B4' }}>If you'd like to take charge of your account as an added member, please add a payment method by clicking here.</p>
                </div>
              ) : (
                <>


                  {payments.map((cardData) => (
                    <div key={cardData.id} className="payment-methods">
                      <p>Credit Card ending in {cardData.cardLast4}</p>
                      <button onClick={changePaymetMethod}>Edit</button>
                    </div>
                  ))}

                </>

              )}
            </div>




            <div className="billing-history">
              <h2>Billing History</h2>
              {currentPlan === 'free' || owner === "false" ? (
                <p>
                  Once you select a subscription plan, billing history will appear here.
                </p>
              ) : (
                <>
                  {payments.length === 0 ? (
                    <p>No billing history available</p>
                  ) : (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment) => (
                          <tr key={payment.id}>
                            <td>{formatDate(payment.created_at)}</td>
                            <td>${parseFloat(payment.price.replace(/[^0-9.]/g, ''))}.00 USD</td>
                            <td>{payment.plan}, {payment.billing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
            {/* Display other billing and subscription information here */}
          </div>
        </div>
      </div>)}

    </>
  );
};

export default BillingAndSubscription;

