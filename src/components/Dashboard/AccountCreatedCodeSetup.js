import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../../components/AuthUser';
import protectImg from '../../images/036-protect.png';

export default function AccountCreatedCodeSetup() {
  const [code, setCode] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const { updateCode } = AuthUser();
  const { user } = AuthUser();
  
  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    setUserdetail(user);
  };

  function renderElement() {
    if (userdetail) {
      return <p>{userdetail.name.split(' ')[0]}</p>;
    } else {
      return <p>Loading.....</p>;
    }
  }

  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    const maxDigits = 4;

    if (inputValue.length <= maxDigits) {
      setCode(inputValue);
    }
  };
  const handleGetStarted = () => {
    updateCode(code)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="account_created">
        <div className="container">
          <div className="account_created_mainsr">
            <div className="account_created_header">
              <h1>Welcome, {renderElement()}</h1>
              <h4>You've successfully created your account!</h4>
            </div>
            <div className="row">
              <div className="account_created_formsr">
                <img src={protectImg} alt="protected" />
                <p>Create a 4-digit code to access the parental dashboard</p>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Code"
                  onChange={handleCodeChange}
                  value={code}
                  id="code" maxLength={4} 
                />
                <Link className="continue-code" onClick={handleGetStarted}>
                  LET'S GET STARTED
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
