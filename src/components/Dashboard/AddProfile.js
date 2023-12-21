/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Plus from "../../images/Circle Plus.png";
import axios from 'axios';
import close_iconImage from '../../images/close_icon_sr.png';
import ForwardPopup from './forward_Popup';
import AuthUser from '../AuthUser';

export default function DashboardAddprofile() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState(null);
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
  const [showForwardPopup, setForwardPopup] = useState(false);

  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name);
      console.log(user.name);
      if (user.spouse) {
        setSelectedItem(user.spouse);
      }
    }
  }, []);
  const handleCloseForwardPopup = () => {
    setForwardPopup(false);
    removeBodyClass();
  };
  const handleClick = (itemName) => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedUser = { ...user, spouse: itemName };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setSelectedItem(itemName);
    }
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
    axios.post('https://developer.dbuglab.com/DK/AS/test/backend/public/api/add-member', memberData, { headers })
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
  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { plan } = user;
    const { billing } = user;
    const { id } = user;
    setCurrentPlan(plan);
    setCurrentBilling(billing);
    setUserId(id);
  }, []);
  function close() {
    setAddMemberSuccess(false);
    isMember(false);
    setShowPopup(false);
    setShowMember(false);
  }
  useEffect(() => {
    fetchMembers();
  }, [userId]);
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`https://developer.dbuglab.com/DK/AS/test/backend/public/api/members/${userId}`);
      const membersData = response.data;
      setMembers(membersData);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  return (
    <>
      <div class="account_created-dash add_profile_page">
        <div className="who-are-you_inner">
          <div className="container">
            <div className="who-are-you_header">
            </div>
            <div className="row addprofile_row">
              <div className={`item-who-are-you profile_type_two col-md-4 ${selectedItem === 'Pierre' ? 'selected' : ''}`} onClick={() => handleClick(username.split(" ")[0])} >
                <Link to="/create-child-profile" name="Pierre">
                  <span className='profile_type_letter'>{username ? username.charAt(0) : ''}</span> {username}
                </Link>
              </div>
              {members.map((member) => (
                <div className={`item-who-are-you profile_type_two col-md-4 ${selectedItem === 'Pierre' ? 'selected' : ''}`} onClick={() => handleClick(username.split(" ")[0])} >
                  <Link to="/create-child-profile" name="Pierre">
                    <span className='profile_type_letter'>{member.first_name ? member.first_name.charAt(0) : ''}</span> {member.first_name}
                  </Link>
                </div>
              ))}
              <div className={`col-md-4 profilAddNew `} onClick={() => isMember(true)} >
                <span className='profile_type_letter'><img src={Plus} /></span> <p style={{
                  color: '#F28A35',
                }}>Add New</p>
              </div>
              {member && (
                <div className="password-update">
                  <button className='closed_popup_password' onClick={close}><img src={close_iconImage} alt="protected" /></button>
                  <div className="add-member">
                    {addMemberSuccess ? (
                      <div className="success">
                        {memberName} has been successfully added!
                      </div>
                    ) : (
                      <>
                        <div className="add-member">
                          <h2>Add a Member</h2>
                          <div className="form-group">
                            <label>First Name*</label>
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
                            <label>Email*</label>
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
                        <div className="form-group payment_btn_lastoption">
                          <button onClick={handleAddMember} className='add_paymentplan'>Add member</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
