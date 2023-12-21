import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import axios from 'axios';
import CirclePlu01Img from '../../images/Circle_Plus012.png';
import close_iconImage from '../../images/close_icon_sr.png';

const Settings = () => {
const [selectedImage, setSelectedImage] = useState(null);
const [profileImage, setProfileImage] = useState(null);
const {user, token} = AuthUser();
const userString = sessionStorage.getItem('user');
const user_detail = JSON.parse(userString);
const [userData, setUserData] = useState({});
const [editedData, setEditedData] = useState({});
const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
const [childd, isChild] = useState(false);
const { getUserId } = AuthUser();
const {http,setToken} = AuthUser();
const userId = getUserId();
const [fieldErrors, setFieldErrors] = useState(null);
const [fieldErrorsPassMatched, setFieldErrorsPassMatched] = useState(null);

useEffect(() => {
    fetchProfileImage();
    fetchUserData();
    fetchChildData();
}, []);

const handleImageChange = (e) => {
setSelectedImage(e.target.files[0]);
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
            'Authorization' : `Bearer ${token}`
        },
        });
        fetchProfileImage();
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

    setUserData({ fname, lname, ...userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({ ...prevState, [name]: value }));
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
  const handleChildInputChange = (field, value) => {
    setChildProfiles((prevState) => {
      const updatedProfiles = [...prevState];
      updatedProfiles[field] = value;
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
    const  addChildProfile = (e) => {
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
  return (
    <>
         
    <div className='right_sidebar_parent'>
  
    {isPasswordUpdate && (
            <div className="password-update">
           <button className='closed_popup_password' onClick={() => setIsPasswordUpdate(false)}><img src={close_iconImage} alt="protected" /></button>
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
            {profileImage && (
              <div className="profile_image">
                <img src={profileImage} alt="Profile" />
              </div>
            )}
             <div className='profile_details_right'>
              <h2>Profile Picture</h2>
              <form onSubmit={handleSubmit}>
                  <input className='file_choise_profile' type="file" onChange={handleImageChange} />
                  <button className='update_image' type="submit">Update Image</button>
                  <button className='remove_image' onClick={handleRemoveImage}>Remove Image</button>
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
                    {editedData.fname && <button onClick={() => handleUpdate('fname')}>Update</button>}
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
                    {editedData.lname && <button onClick={() => handleUpdate('lname')}>Update</button>}
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
                      
                      {editedData.email && <button className='' onClick={() => handleUpdate('email')}>Change Email Address</button>}
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
                      />
                      {editedData.user_code && <button onClick={() => handleUpdate('user_code')}>Change parent dashboard code</button>}
                  </div>
                  <div className="form-group">
                      <label>Country</label>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Country"
                          name="country"
                          value={editedData.country || userData.country}
                          onChange={handleInputChange}
                      />
                      {editedData.country && <button onClick={() => handleUpdate('country')}>Change country</button>}
                  </div>
                  
                  <div className="form-group">
                      <label>City</label>
                      <input
                          type="text"
                          className="form-control"
                          placeholder="Enter City"
                          name="city"
                          value={editedData.city || userData.city}
                          onChange={handleInputChange}
                      />
                      {editedData.city && <button onClick={() => handleUpdate('city')}>Change City</button>}
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
                      {editedData.postal_code && <button onClick={() => handleUpdate('postal_code')}>Change postel code</button>}
                  </div>
              </div>
            </div>
            <div className="kids_control information_input_sr">
            <h2>Kids Controls</h2>
            </div>
            {childProfiles.map((child, index) => (
                <div key={index} className="kids_control information_input_sr">
                  <p>Child profile {index + 1}</p>
                  <button className="cancel" onClick={() => removeChildProfile(index)}>
                    remove
                  </button>                  
          <div className="personal_information_input">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={child.child_name || ''}
                        onChange={(e) => handleChildInputChange(index, 'child_name', e.target.value)}
                      />
                  
                        {/* <button onClick={() => handleUpdateChildData(index)}>Update</button> */}
               
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter age"
                        value={child.child_age || ''}
                        onChange={(e) => handleChildInputChange(index, 'child_age', e.target.value)}
                      />
                  
                        <button onClick={() => handleUpdateChildData(index)}>Update</button>
                  
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Screen Time Limit"
                        value={child.screenTimeLimit}
                        onChange={(e) => handleChildInputChange(index, 'screenTimeLimit', e.target.value)}
                      />
                    
                        <button onClick={() => handleUpdateChildData(index)}>Update</button>
                  
                    </div>
                  </div>
                </div>
              ))}

              <div className="add-childprofile">
              {childd && (
                <form onSubmit={addChildProfile}>
                  <div className="kids_control information_input_sr">
                    <button className='cancel' onClick={() => isChild(false)} >cancel</button>
                  <div className="personal_information_input">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter age"
                        name="age"
                      />
                       <button>Update</button>
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Screen Time Limit"
                        name="screen_limit"
                      />
                       <button>Update</button>
                    </div>
                    <button type='submit' className="submit-child">Add Child</button>
                  </div>
                </div>
                </form>
              )}
              {childd ?(
              <></>
              ):(
                <button className='add_profile_Sr' onClick={ShowChildProfile}><img src={CirclePlu01Img} alt="protected" /> Add child profile</button>

              )}

              </div>
            <div className="notifications information_input_sr">
                <h2>Notifications</h2>
                <p>Enable reminders if you haven't responded to your children's messages within a certain period of time</p>
                <div className="personal_information_input">
                  <div className="form-group">
                      <p>Push Notifications</p>
                      <label  className="switch">
                          <input type="checkbox"  className="form-control"/>
                          <span className="sliderr round"></span>
                      </label >
                  </div>
                  <div className="form-group">
                      <p>Email Notifications</p>
                      <label  className="switch">
                          <input type="checkbox" className="form-control"/>
                          <span className="sliderr round"></span>
                      </label >
                  </div>
                  </div>
                
            </div>
        </div>
     </div>

    </>
  );
};

export default Settings;
