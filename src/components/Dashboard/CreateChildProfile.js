import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CirclePluImg from '../../images/Circle_Plus.png';
import AuthUser from '../AuthUser';
import Select from 'react-select';


export default function CreateChildProfile() {
  const { getUserId } = AuthUser();

  const userId = getUserId();

  const [childProfiles, setChildProfiles] = useState([{ childName: '', childAge: '' }]);
  const {http,setToken} = AuthUser();
  const addChildProfile = () => {
    setChildProfiles([...childProfiles, { childName: '', childAge: '' }]);
  };
    const handleSubmit = () => {
      http
        .post('/create-child-profile', { childProfiles, userId })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  const handleChildNameChange = (index, value) => {
    const updatedChildProfiles = [...childProfiles];
    updatedChildProfiles[index].childName = value;
    setChildProfiles(updatedChildProfiles);
  };

  const handleChildAgeChange = (index, selectedOption) => {
    const updatedChildProfiles = [...childProfiles];
    updatedChildProfiles[index].childAge = selectedOption.value;
    setChildProfiles(updatedChildProfiles);
  };
  const ageOptions = Array.from({ length: 18 }, (_, index) => ({
    value: 8 + index,
    label: `${8 + index} years Old`,
  }));

  return (
    <>
      <div className="child_profile">
        <div className="container">
        <div className="child_profile_innersr">
          <h1>Create a child profile</h1>
          {childProfiles.map((childProfile, index) => (
            <>
            <h4>Child Profile: {index+1}</h4>
            <div key={index} className="child-profile">
              <div className="form-group">
                <label>Child's name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={childProfile.childName}
                  onChange={(e) => handleChildNameChange(index, e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Child's age</label>
                <Select
                    className="form-control"
                    placeholder="Select age"
                    options={ageOptions}
                    value={ageOptions.find((option) => option.value === childProfile.childAge)}
                    onChange={(selectedOption) => handleChildAgeChange(index, selectedOption)}
                  />
              </div>
            </div>
            </>
          ))}
          <div className="form-groupadd_child_sr mt-3">
             <span className="plus" onClick={addChildProfile}><img src={CirclePluImg} alt="protected" /> Add Child Profile</span>
          </div>
          <Link className="confirm"  onClick={handleSubmit} to="/parent-dashboard">Confirm</Link>
        </div>
      </div>
      </div>
    </>
  );
}
