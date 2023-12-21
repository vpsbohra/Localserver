



import { Link, useLocation } from 'react-router-dom';
import { useNavigate, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import ReactivePopup from './ReactivePopup';
import axios from 'axios';
import AuthUser from '../../components/AuthUser';
import protectImg1 from '../../images/036-protect.png';
export default function Dashboard() {
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showPopupReactive, setshowPopupReactive] = useState(false);
    const [owner, setOwner] = useState(false);
    const [username, setUsername] = useState(null);
    const [members, setMembers] = useState([]);
    const [userId, setUserId] = useState('');
    const { http } = AuthUser();
    const { user } = AuthUser();
    const [childProfiles, setChildProfiles] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState(null);
    const childId = selectedChildId;
    const [childFetched, setchildFetched] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isParentalSwitchActive, setIsParentalSwitchActive] = useState(false);
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const [userdetail, setUserdetail] = useState('');
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const user = JSON.parse(storedUser);
        setUsername(user.name);
        console.log(user);
        if (user['account_status'] == "inactive") {
            setshowPopupReactive(true);
            addBodyClass();
        } else {
            setshowPopupReactive(false);
        }
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.spouse) {
                setSelectedItem(user.spouse);
            }
        }
    }, []);
    const setOWner = () => {
        sessionStorage.setItem('owner', true);
    }
    const setOWNer = () => {
        sessionStorage.setItem('owner', false);
    }




    const fetchMembers = async () => {
        try {
            const response = await axios.get(`https://phplaravel-1142377-3976235.cloudwaysapps.com/api/members/${userId}`);
            const membersData = response.data;
            setMembers(membersData);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };
    const addBodyClass = () => {
        document.body.classList.add('popup_actives');
    };
    const removeBodyClass = () => {
        document.body.classList.remove('popup_actives');
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
    const handleClosePopup = () => {
        setshowPopupReactive(false);
        removeBodyClass();
    };

    const fetchUserDetail = () => {
        console.log('Fetching user detail');
        setUserdetail(user);
        setUserId(user.id);
        http.get(`/child-profiles?user_id=${userId}`).then((res) => {
            setChildProfiles(res.data);

        });
    };

    const handleChildClick = (childId, child_name) => {
        console.log(childId);
        setSelectedChildId(childId);
        sessionStorage.setItem('childId', childId);
        sessionStorage.setItem('setChildName', child_name);

    };


    const handleParentalSwitch = () => {
        setShowPopup(true);
        setErrorMessage('');
        setIsParentalSwitchActive(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const storedCode = JSON.parse(sessionStorage.getItem('user')).user_code;
        if (code === storedCode) {
            setIsParentalSwitchActive("false");
            document.documentElement.classList.remove('parental-switch-active');

            navigate('/parent-dashboard');

        } else {
            setErrorMessage('Invalid code entered. Please try again.');
            console.log('Incorrect code entered!');
        }
    };

    const handleCancel = () => {
        setShowPopup(false);
        setIsParentalSwitchActive(false);
    };
    const handleCodeEntry = (event) => {
        setCode(event.target.value);
    };


    useEffect(() => {
        const handleBackButton = (event) => {
            event.preventDefault();
            //   alert('true');
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [showPopup]);


    function renderElement() {
        if (userdetail) {
            return <p>{userdetail.name.split(' ')[0]}</p>;
        } else {
            return <p>Loading.....</p>;
        }
    }






    useEffect(() => {


        const userInformation = sessionStorage.getItem('user');

        const user = JSON.parse(userInformation);
        const { id } = user;
        setUserId(id);

    }, []);


    useEffect(() => {
        if (isParentalSwitchActive) {
            document.documentElement.classList.add('parental-switch-active');
        } else {
            document.documentElement.classList.remove('parental-switch-active');
        }
    }, [isParentalSwitchActive]);


    useEffect(() => {

        fetchMembers();
        fetchUserDetail();

        console.log("userdetail", userdetail);

    }, [userId]);
    return (
        <>
            <div className="who-are-you_inner">
                <div className="container">
                    <div className="who-are-you_header">
                        <h1>Who are you?</h1>
                    </div>
                    <div className="row who-are-you-parents">

                        <div className={`item-who-are-you profile_type_two col-md-4 ${selectedItem === 'owner' ? 'selected' : ''}`} onClick={() => { handleClick(username ? username.split(" ")[0] : ''); setOWner() }}>
                            <Link onClick={handleParentalSwitch} name="owner">
                                <span className='profile_type_letter'>{username ? username.charAt(0) : ''}</span> {username}
                            </Link>
                        </div>
                        {members.map((member) => (
                            <div key={member.id} className={`item-who-are-you profile_type_two col-md-4 ${selectedItem === 'user' ? 'selected' : ''}`} onClick={() => { handleClick(member.first_name ? member.first_name.split(" ")[0] : ''); setOWNer() }}>
                                <Link onClick={handleParentalSwitch} name="user">
                                    <span className='profile_type_letter'>{member.first_name ? member.first_name.charAt(0) : ''}</span> {member.first_name}
                                </Link>
                            </div>
                        ))}
                        {childProfiles.map((childProfile) => (
                                    <div className='item-who-are-you profile_type_two col-md-4 '>
                                        <Link className='col'
                                            key={childProfile.id}
                                            userId={user.id}
                                            childId={childId}
                                            to={`/Kids-view`}
                                            onClick={() => handleChildClick(childProfile.id, childProfile.child_name)}
                                        >
                                            <span className='profile_type_letter'>{childProfile.child_name ? childProfile.child_name.charAt(0) : ''}
                                            </span>


                                            {childProfile.child_name}
                                        </Link>
                                    </div>
                                ))}

                    </div>

                    {/* <div className="who-are-you-kids">
                        {childProfiles.length > 0 ? (
                            <div className='row'>
                                {childProfiles.map((childProfile) => (
                                    <div className='item-who-are-you profile_type_two col-md-4 '>
                                        <Link className='col'
                                            key={childProfile.id}
                                            userId={user.id}
                                            childId={childId}
                                            to={`/Kids-view`}
                                            onClick={() => handleChildClick(childProfile.id, childProfile.child_name)}
                                        >
                                            <span className='profile_type_letter'>{childProfile.child_name ? childProfile.child_name.charAt(0) : ''}
                                            </span>


                                            {childProfile.child_name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No child profiles found.</p>
                        )}
                    </div> */}


                </div>
                {showPopupReactive && <ReactivePopup handleClose={handleClosePopup} />}


                {showPopup && (
                    <div className="code-popup">
                        {/* <h1>Welcome, {renderElement()}</h1> */}
                        <img src={protectImg1} alt="protected" />
                        <p className='digit_code_prgp'>Enter a 4-digit code to access the parental dashboard</p>
                        <form onSubmit={handleSubmit}>
                            <input type="password" maxLength={4} className="form-control" placeholder="Enter Code" value={code} onChange={handleCodeEntry} />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <div className='btn_control_codePopup'>
                                <button type="button" onClick={() => handleCancel()}>Cancel</button>
                                <button type="submit" className="continue-code">ENTER</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}