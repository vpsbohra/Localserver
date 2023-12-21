import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthUser from '../../components/AuthUser';

export default function KidsListing() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState('');
  const { user } = AuthUser();
  const [userId, setUserId] = useState(user.id);
  const [childProfiles, setChildProfiles] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const childId = selectedChildId;

  const fetchUserDetail = () => {
    setUserdetail(user);
    setUserId(user.id);
    http.get(`/child-profiles?user_id=${userId}`).then((res) => {
      setChildProfiles(res.data);
    });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const handleChildClick = (childId,child_name) => {
    console.log(childId);
    setSelectedChildId(childId);
    sessionStorage.setItem('childId', childId);
    sessionStorage.setItem('setChildName', child_name);

};

  return (
    <>
      <div className="who-are-you_inner">
        <div className="container">
          <div className="who-are-you_header">
            <h1>Select Kid Profile</h1>
          </div>
          <div className="who-are-you-kids">
            {childProfiles.length > 0 ? (
              <div className='row'>
                {childProfiles.map((childProfile) => (
                  <div className='item-who-are-you profile_type_two col-md-4 kids-listing-cstm'>
                  <Link className='col'
                    key={childProfile.id}
                    userId={user.id}
                    childId = {childId}
                    to={`/Kids-view`}
                    onClick={() => handleChildClick(childProfile.id,childProfile.child_name)}
                  >
                    {childProfile.child_name}
                  </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No child profiles found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
