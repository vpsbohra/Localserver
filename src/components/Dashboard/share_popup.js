import React, { useEffect, useState } from 'react';
import profile_icon from '../../images/share_popup.png';
import close_iconImage from '../../images/close_icon.png'; 
import AuthUser from '../../components/AuthUser';

const SharePopup = ({ onClose }) => {
  const [fullname, setFullName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const [childProfiles, setChildProfiles] = useState('');
  const { http } = AuthUser();
  const { user } = AuthUser();
  const child_id = sessionStorage.getItem("setChildID");

  useEffect(() => {
    fetchUserDetail();
  }, []);
  const fetchUserDetail = () => {
    setUserdetail(user.id);
    console.log(user.id);
    console.log(child_id);
    http.get(`/child-profiles?user_id=${user.id}`).then((res) => {
      let data = res.data;
      // console.log(data);
    data.map((child, index) => {
      // console.log(child.id);
      if (child.id == child_id) {
        console.log(child.child_name);
        setChildProfiles(child.child_name);
      }
    });

      
    });
  };


    const addnotification = (e) => {
      e.preventDefault();
      const formData = {
        name: fullname,
        number: phonenumber,
        user_id: userdetail,
        result: '10',
        status: "active",
        child_id: child_id,
        child_name: childProfiles,

      };

      http
        .post('add-notification', { formData })
        .then((res) => {
          console.log(res);
          onClose();
        })
        .catch((error) => {
          console.error(error);
        });
    }

  return (
    <>
      <div className="share_with_popup">
      <div className="close-button" onClick={onClose}>
          <img src={close_iconImage} alt="Close" /> {/* Close button */}
        </div>
        <div className="share_with_popup_user"> 
           <img src={profile_icon} />
        </div>
        <div className='share_with_details'>
          <div className='shareinput_field'>
            <label>Full Name</label>
            <input type='text' name='name' onChange={e=>setFullName(e.target.value)} />
          </div>
          <div className='shareinput_field'>
            <label>Phone number</label>
            <input type='number' name='number' onChange={e=>setPhoneNumber(e.target.value)} />
          </div>
        </div>
        <button className='shareWith_btnpopup' onClick={addnotification}>SHARE WITH</button> 
       
      </div>
    </>
  );
};

export default SharePopup;

