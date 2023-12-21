import Chat from '../chat/Chat';
import React, { useEffect, useState } from 'react';
import AuthUser from '../../components/AuthUser';
import CurrentlyReading from './CurrentlyReading';
import Calendar from 'react-calendar';
import { useLocation } from "react-router-dom";

export default function ParentHeaderSection(props) {
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const toggle = searchParams.get("datetoggle");
    const selectedDate = searchParams.get("selectedDate");
    const [childProfiles, setChildProfiles] = useState([]);
    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState('');
    const { user } = AuthUser();
    const [userId, setUserId]  = useState(user.id);

    useEffect(() => {
        fetchUserDetail();
      }, []);
    const fetchUserDetail = () => {
        setUserdetail(user);
        setUserId(user.id);
        http.get(`/child-profiles?user_id=${userId}`).then((res) => {
          setChildProfiles(res.data); 
        });
      };
    return (
        <>
            <div className='right_sidebar_parent'>
              {toggle?(
                <>
                <CurrentlyReading toggle={toggle} selectedDate={selectedDate}/>
                </>
              ):(
                <>
                <CurrentlyReading toggle={toggle} selectedDate={selectedDate}/>
                {props.childId && <Chat key={props.childId} dataId={props.childId} userId={props.userId}/>}</>
              )}
                 
            </div>
        </>
    );
}