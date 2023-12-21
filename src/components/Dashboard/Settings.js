//everything is fine expecting country ,cities and screen time limit value is not displaying

import React, { useState, useEffect } from 'react';
import PopupOne from './settingsPopupOne';
import PopupTwo from './settingsPopupTwo';
import PopupThree from './settingsPopupThree';
import Select from 'react-select';

import AuthUser from '../AuthUser';
import axios from 'axios';
import CirclePlu01Img from '../../images/Circle_Plus012.png';
import close_iconImage from '../../images/close_icon_sr.png';
import close_btnImage from '../../images/Close_btn_sr.png';
import Image_UploadImage from '../../images/Image_Upload.png';
import { getCountries, getCities } from 'countries-cities';

const Settings = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { user, token } = AuthUser();
  const userString = sessionStorage.getItem('user');
  const user_detail = JSON.parse(userString);
  const [userData, setUserData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
  const [childd, isChild] = useState(false);
  const { getUserId } = AuthUser();
  const { http, setToken } = AuthUser();
  const userId = getUserId();
  const [fieldErrors, setFieldErrors] = useState(null);
  const [fieldErrorsPassMatched, setFieldErrorsPassMatched] = useState(null);
  const [UploadDiv, setUploadDiv] = useState(true);
  const [Upload, setUpload] = useState(null);
  const [btn, setBtn] = useState(true);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [screenTimeLimit, setScreenTimeLimit] = useState('1');
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [showbtns, setshowbtns] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const removeBodyClass1 = () => {
    document.body.classList.remove('popup_active');
    setShowPopupOne(false);
    setShowPopupTwo(false);
  };



  const refreshComponentHandler = () => {
    setRefreshComponent(true);
    fetchUserData();
    fetchChildData();
    fetchProfileImage();
  };

  const Update = () => {
    handleUpdate('fname');
    handleUpdate('lname');
    handleUpdate('email');
    handleUpdate('user_code');
    handleUpdate('country');
    handleUpdate('city');
    handleUpdate('postal_code');

  }
  const countries = getCountries().map((country) => ({
    value: country,
    label: country,
  }));

  const cities = country ? getCities(country.value).map((city) => ({
    value: city,
    label: city,
  })) : [];


  const ageOptions = Array.from({ length: 18 }, (_, index) => ({
    value: 5 + index,
    label: `${5 + index} years Old`,
  }));

  const timeOptions = Array.from({ length: 24 }, (_, index) => ({
    value: 1 + index,
    label: `${1 + index} hour per day`,
  }));



  useEffect(() => {
    fetchProfileImage();
    fetchUserData();
    fetchChildData();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setUpload(true);
    setUploadDiv(false);
    setshowbtns(true);
  };
  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
    setshowbtns(true);
    // You can set the selected country to the `editedData` state if needed.
    setEditedData((prevState) => ({
      ...prevState,
      country: selectedOption.value,


    }));
  };

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption);
    setshowbtns(true);

    setEditedData((prevState) => ({
      ...prevState,
      city: selectedOption.value,
    }));
  };
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/get-profile-image/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob',
      });

      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile_image', selectedImage);
    try {
      await axios.post(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-profile-image/${user_detail.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      await fetchUserData();

    } catch (error) {
      console.error('Error updating profile image:', error);
    }

  };

  const handleRemoveImage = async () => {
    try {
      await axios.delete(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/remove-profile-image/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      fetchProfileImage();
    } catch (error) {
      console.error('Error removing profile image:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/get-user-data/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const { name, ...userData } = response.data;
      const [fname, lname] = name.split(' ');
      console.log(response.data);
      const user_detail = JSON.stringify(response.data);
      setUserData({ fname, lname, ...userData });
      if (user_detail) {
        sessionStorage.setItem("user", user_detail);
      }


    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({ ...prevState, [name]: value }));
    setshowbtns(true);
  };

  const handleUpdate = async (field) => {
    try {
      const updateData = { ...editedData };

      if (field === 'password') {
        if (editedData.newPassword && editedData.newPassword === editedData.confirmPassword) {
          updateData.password = editedData.newPassword;
          setFieldErrorsPassMatched(null);
        } else {
          alert('Password does not match');
          setFieldErrorsPassMatched('Password does not match or check password fields are not empty!');
          return;
        }
      } else if (field === 'fname') {
        if (editedData.fname && userData.lname) {
          updateData.name = `${editedData.fname} ${userData.lname}`;
        } else {
          updateData.name = editedData.fname;
        }
        delete updateData.fname;
      } else if (field === 'lname') {
        if (editedData.lname && userData.fname) {
          updateData.name = `${userData.fname} ${editedData.lname}`;
        } else {
          updateData.name = editedData.lname;
        }
        delete updateData.lname;
      }

      await axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-user-data/${user.id}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const updatedUserData = { ...user_detail, ...updateData };
      sessionStorage.setItem('user', JSON.stringify(updatedUserData));
      fetchUserData();
      setUserData((prevState) => ({ ...prevState, ...updateData }));
      setEditedData({});
      setIsPasswordUpdate(false);
      setFieldErrors(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setFieldErrors(error.response.data.error);
      } else {
        console.error('Error:', error);
      }
    }
  };


  /******************************************** Child Information API codes ************************************************/
  const [childProfiles, setChildProfiles] = useState([]);

  const fetchChildData = async () => {
    try {
      const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/child-profiles?user_id=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const updatedChildProfiles = response.data;
      console.log(updatedChildProfiles);
      setChildProfiles(updatedChildProfiles);

    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };

  const handleChildInputChange = (index, field, value) => {
    setChildProfiles((prevState) => {
      const updatedProfiles = [...prevState];
      if (field === 'child_age') {
        updatedProfiles[index].child_age = value;
      } else if (field === 'child_name') {
        updatedProfiles[index].child_name = value;
      } else if (field === 'screenTimeLimit') {
        updatedProfiles[index].screenTimeLimit = value;
      } else if (field === 'birthday') {
        updatedProfiles[index].birthday = value;
      }
      setshowbtns(true);
      return updatedProfiles;
    });
  };








  const handleUpdateChildData = async (index) => {
    const childData = childProfiles[index];
    try {
      await axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/update-child-data?user_id=${user.id}`, childData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      fetchChildData();
    } catch (error) {
      console.error('Error updating child data:', error);
    }
  };
  const ShowChildProfile = () => {

    isChild(true);
  }
  const addChildProfile = (e) => {
    e.preventDefault();
    const { name, age, date_of_birth, screen_limit } = e.target.elements;
    const formData = {
      name: name.value,
      age: age.value,
      date_of_birth: date_of_birth.value,
      screen_limit: screen_limit.value,
    };

    http
      .post('/create-child-profile-setting', { formData, userId })
      .then((res) => {
        console.log(res);
        fetchChildData();
        isChild(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Function to add the body class when Deactivate button is clicked
  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };


  // Function to remove the body class when "Got It!" is clicked
  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
    setBtn(false);
  };

  const removeChildProfile = async (index) => {
    const childData = childProfiles[index];
    console.log(childData.id);
    try {
      await axios.patch(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/remove-child-data?user_id=${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: childData.id,
      });
      fetchChildData();
    } catch (error) {
      console.error('Error removing child data:', error);
    }
  };


  // for popup functionality

  const [showPopupOne, setShowPopupOne] = useState(false);
  const [showPopupTwo, setShowPopupTwo] = useState(false);
  const [showPopupThree, setShowPopupThree] = useState(false);

  const handleDeactivateAccount = () => {
    addBodyClass();
    setShowPopupOne(true);
  };

  const handleConfirmDeactivate = () => {
    setShowPopupOne(false);
    setShowPopupTwo(true);
  };

  const handleDeleteAccount = () => {
    setShowPopupTwo(false);
    setShowPopupThree(true);
  };
  { refreshComponent && <Settings /> }
  return (
    <>
      {refresh && (

        <div className='right_sidebar_parent'>

          {isPasswordUpdate && (
            <div className="password-update">
              <button className='closed_popup_password' onClick={() => setIsPasswordUpdate(false)}><img src={close_btnImage} alt="protected" /></button>
              <h2>Reset Password</h2>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Current Password"
                  name="currentPassword"
                  value={editedData.currentPassword || ''}
                  onChange={handleInputChange}
                />
                {fieldErrors && <span className="error-message">{fieldErrors}</span>}
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter New Password"
                  name="newPassword"
                  value={editedData.newPassword || ''}
                  onChange={handleInputChange}
                />
                <span>Your password must be at least  8 characters.</span>
              </div>
              <div className="form-group">
                <label>Re-enter Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                  value={editedData.confirmPassword || ''}
                  onChange={handleInputChange}
                />
              </div>
              {fieldErrorsPassMatched && <span className="error-message">{fieldErrorsPassMatched}</span>}
              <button className='Update_pass_btn' onClick={() => handleUpdate('password')}>Reset Password</button>
            </div>
          )}

          <div className='top_currently_parent'>
            <h1>Profile</h1>
            <div className="profile_details">
              <div className="profile_image">
                <img src={`https://phplaravel-1142377-3976235.cloudwaysapps.com/profile_images/${user.profile_image}`} alt="Profile" />
              </div>
              <div className='profile_details_right'>
                <h2>Profile Picture</h2>
                <form onSubmit={handleSubmit}>
                  {UploadDiv && (
                    <>
                    <div className='profile_item_group'>
                      <input className='file_choise_profile' type="file" onChange={handleImageChange} />
                      <span><img src={Image_UploadImage}/> Upload Image</span>
                    </div>
                    </>
                  )}
                  {Upload && (
                    <>
                      <button className='update_image' type="submit">Update Image</button>
                    </>
                  )}
                  <button className='remove_image' onClick={handleRemoveImage}>Remove</button>
                </form>
              </div>
            </div>
            <div className="personal_information information_input_sr">
              <h2>Personal Information</h2>
              <div className="personal_information_input">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    name="fname"
                    value={editedData.fname || userData.fname}
                    onChange={handleInputChange}
                  />
                  {/* {editedData.fname && <button onClick={() => handleUpdate('fname')}>Update</button>} */}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    name="lname"
                    value={editedData.lname || userData.lname}
                    onChange={handleInputChange}
                  />
                  {/* {editedData.lname && <button onClick={() => handleUpdate('lname')}>Update</button>} */}
                </div>

                <div className="form-group">
                  <label>Current Email</label>
                  <div className="form_input_field">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name="email"
                      value={editedData.email || userData.email}
                      onChange={handleInputChange}
                    />

                    {/* {editedData.email && <button className='' onClick={() => handleUpdate('email')}>Change Email Address</button>} */}
                  </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="******"
                    name="password"
                    // value={editedData.password || userData.password}
                    value='******'
                    onChange={handleInputChange}
                    disabled
                  />
                  {!isPasswordUpdate && (
                    <button className='chnage_pas_sr' onClick={() => setIsPasswordUpdate(true)}>Change Password</button>
                  )}
                </div>
                <div className="form-group">
                  <label>Parent Dashboard Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Code"
                    name="user_code"
                    value={editedData.user_code || userData.user_code}
                    onChange={handleInputChange}
                    maxLength={4} />
                  {editedData.user_code && <button onClick={() => handleUpdate('user_code')}>Change parent dashboard code</button>}
                </div>
                <div className="form-group">
                  <label>Country</label>


                  <Select
                    className="form-control"
                    name="country"
                    options={countries}
                    value={country || editedData.country || userData.country}
                    onChange={handleCountryChange}
                  />




                </div>

                <div className="form-group">
                  <label>City</label>
                  <Select
                    className="form-control"
                    options={cities}
                    value={city || editedData.city || userData.city}
                    onChange={handleCityChange}
                  />




                </div>
                <div className="form-group">
                  <label>Postal code/Zip code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter postal code"
                    name="postal_code"
                    value={editedData.postal_code || userData.postal_code}
                    onChange={handleInputChange}
                  />
                  {/* {editedData.postal_code && <button onClick={() => handleUpdate('postal_code')}>Change postel code</button>} */}
                </div>
              </div>
            </div>

            {/* *********************************************KIDZ CONTROL SECTION*****************************************************/}

            <div className="kids_control information_input_sr">
              <h2>Kids Controls</h2>
            </div>
            {childProfiles.map((child, index) => (
              <div key={index} className="kids_control information_input_sr">
                <p className='kidz_profile_section'>Child profile {index + 1}</p>
                <button className="cancel" onClick={() => removeChildProfile(index)}>
                Delete Profile
                </button>
                <div className="personal_information_input">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={'' || child.child_name}
                      onChange={(e) => handleChildInputChange(index, 'child_name', e.target.value)}

                    />

                    {/* <button onClick={() => handleUpdateChildData(index)}>Update</button> */}

                  </div>
                  <div className="form-group">
                    <label>Age</label>
                    <Select
                      className="form-control"
                      placeholder="Enter age"
                      options={ageOptions}
                      value={ageOptions.find((option) => option.value === (child.child_age || ageOptions[0].value))}
                      onChange={(selectedOption) => handleChildInputChange(index, 'child_age', selectedOption.value)}
                    />










                  </div>
                  <div className="form-group Birthday_input">
                    <label>Birthday</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter birth date"
                      value={child.birthday}
                      onChange={(e) => handleChildInputChange(index, 'birthday', e.target.value)}
                    />

                    {/* <button onClick={() => handleUpdateChildData(index)}>Update</button> */}

                    <span className="child_birthdate">Set your child’s birthday date</span>
                  </div>
                  <div className="form-group Birthday_input">
                    <label>Screen Time Limit</label>

                    <select
                      className="form-control screen_Time_select"
                      name="screen_limit"
                      value={child.screenTimeLimit || ''}
                      onChange={(e) => handleChildInputChange(index, 'screenTimeLimit', e.target.value)}
                    >
                      {timeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                  </div>
                </div>
              </div>
            ))}
            {/* *****************************************ADD CHILD DYNAMICALLY***************************************************** */}
            <div className="add-childprofile">
              {childd && (
                <form onSubmit={addChildProfile}>
                  <div className="kids_control information_input_sr">
                    <button className='cancel' onClick={() => isChild(false)}>Cancel</button>
                    <div className="personal_information_input">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name='name'
                        />
                      </div>
                      <div className="form-group">
                        <label>Age</label>
                        <Select
                          className="form-control"
                          placeholder="Enter age"
                          options={ageOptions}
                          name='age'
                          onChange={(selectedOption) => handleChildInputChange('child_age', selectedOption.value)}
                        />


                      </div>
                      <div className="form-group Birthday_input">
                        <label>Birthday</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Enter birth date"
                          name="date_of_birth"
                        />
                        <span className="child_birthdate">Set your child’s birthday date</span>
                      </div>
                      <div className="form-group Birthday_input">
                        <label>Screen Time Limit</label>
                        <Select
                          className="form-control screen_Time_select"
                          placeholder="Enter Screen Time Limit"
                          name='screen_limit'
                          options={timeOptions}
                          onChange={(selectedOption) => handleChildInputChange('screenTimeLimit', selectedOption.value)}
                        />
                      </div>
                      <button type='submit' className="submit-child">Add Child</button>
                    </div>
                  </div>
                </form>
              )}

              {childd ? (
                <></>
              ) : (
                <button className='add_profile_Sr' onClick={ShowChildProfile}><img src={CirclePlu01Img} alt="protected" /> Add child profile</button>
              )}
            </div>
            <div className="notifications information_input_sr">
              <h2>Notifications</h2>
              <p>Enable reminders if you haven't responded to your children's messages within a certain period of time</p>
              <div className="personal_information_input">
                <div className="form-group">
                  <p>Push Notifications</p>
                  <label className="switch">
                    <input type="checkbox" className="form-control" />
                    <span className="sliderr round"></span>
                  </label >
                </div>
                <div className="form-group">
                  <p>Email Notifications</p>
                  <label className="switch">
                    <input type="checkbox" className="form-control" />
                    <span className="sliderr round"></span>
                  </label >

                </div>



              </div>

              {showbtns && (
                <div className="personal_information_inputss">
                  <div className="form-group">


                    <div className={
                      editedData.fname ||
                        editedData.lname ||
                        editedData.email ||
                        editedData.user_code ||
                        editedData.country ||
                        editedData.city ||
                        editedData.postal_code ||
                        ageOptions
                        ? 'savebuttonactive'
                        : 'savebuttondeactive'
                    }>
                      <button className='Cancel_setting_btn' onClick={() => {
                        setRefresh(false);
  
                       setshowbtns(false);
                        setTimeout(() => {
                          setRefresh(true);
                          fetchProfileImage();
                          fetchUserData();
                          fetchChildData();
                          setEditedData({});
                        }, 1);
                      }} >Cancel</button>
                      <button className='savechanges_setting_btn'

                        onClick={() => {
                          Update();
                          childProfiles.forEach((child, index) => {
                            handleUpdateChildData(index);
                          }); 
                          setshowbtns(false);
                          setRefresh(false);
                          setTimeout(() => {
                            setRefresh(true);
                            fetchProfileImage();
                            fetchUserData();
                            fetchChildData();
                            setEditedData({});
                          }, 1);
                        }}
                      >
                        Save Changes
                      </button>
                    </div>


                  </div>
                </div>
              )}
            </div>


            <div className='delete_account'>
              <h3>Delete Account</h3>
              <p>Delete your account and all of your content permanently.</p>
              <button className={btn == true ? 'activebtn' : 'deactivebtn'} onClick={handleDeactivateAccount}>Delete</button>
              <button className={btn == true ? 'deactivebtn' : 'activebtn'} >Reactivate</button>

            </div>

          </div>

          {showPopupOne && (
            <PopupOne handleConfirmDeactivate={handleConfirmDeactivate} />
          )}

          {showPopupTwo && (
            <PopupTwo removeBodyClass1={removeBodyClass1} handleDeleteAccount={handleDeleteAccount} />

          )}

          {showPopupThree && <PopupThree removeBodyClass={removeBodyClass} />}
        </div>
      )}
    </>
  );
};

export default Settings;



