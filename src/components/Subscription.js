
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AuthUser from './AuthUser';
import BillingAndSubscription from './Dashboard/BillingAndSubscription';

export default function Subscription() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState('monthly');
  const { http, setToken } = AuthUser();
  const { token } = AuthUser();
  const [errors, setErrors] = useState({});

  const selectedBillingDefault = 'monthly';
  const isSelectButtonDisabled = selectedPlan === null;
  const [currentPlan, setCurrentPlan] = useState('');
  const [oneTime, setOneTime] = useState('');
  const [user, setUser] = useState('');
  const [planType, setPlanType] = useState('');
  
  
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };
  const handleBillingSelect = (billing) => {
    setSelectedBilling(billing);
  };
  const handleBillingSelect1 = (billing) => {
    setOneTime(billing);
  };
  const handlePlanClick12 = () => {
    setOneTime('');
  };



 

  console.log("currentPlan", currentPlan);
  const renderBilledButtons = () => {


    if (selectedPlan === 'classic') {
      return (

        <div className="billed-btns">

          <label>
            <input type="radio" name="billing" value="monthly" checked={selectedBilling === 'monthly'} selected="selected" onChange={() => handleBillingSelect('monthly')} />
            Billed Monthly
          </label>
          <label>
            <input type="radio" name="billing" value="onetime" onChange={() => handleBillingSelect1('onetime')} />
            One-time purchase {selectedBilling === 'Onetime' && <span className='discount_span'>save 50%</span>}
          </label>
        </div>
      );
    }

    if (selectedPlan === 'fidelity') {
      return (
        <div className="billed-btns">
          <label>
            <input type="radio" name="billing" value="monthly" checked={selectedBilling === 'monthly'} selected="selected" onChange={() => handleBillingSelect('monthly')} />
            Billed Monthly
          </label>
          <label>
            <input type="radio" name="billing" value="quarterly" onChange={() => handleBillingSelect('quarterly')} />
            Billed Quarterly {selectedBilling === 'quarterly' && <span className='discount_span'>save 10%</span>}
          </label>
          <label>
            <input type="radio" name="billing" value="yearly" onChange={() => handleBillingSelect('yearly')} />
            Billed Annualy {selectedBilling === 'yearly' && <span className='discount_span'>save 50%</span>}
          </label>
          <label>
            <input type="radio" name="billing" value="onetime" onChange={() => handleBillingSelect1('onetime')} />
            One-time purchase {selectedBilling === 'Onetime' && <span className='discount_span'>save 50%</span>}
          </label>
          
        </div>
      );
    }

    if (selectedPlan === 'family') {
      return (
        <div className="billed-btns">
          <label>
            <input type="radio" name="billing" value="monthly" checked={selectedBilling === 'monthly'} selected="selected" onChange={() => handleBillingSelect('monthly')} />
            Billed Monthly
          </label>
          <label>
            <input type="radio" name="billing" value="quarterly" onChange={() => handleBillingSelect('quarterly')} />
            Billed Quarterly {selectedBilling === 'quarterly' && <span className='discount_span'>save 10%</span>}
          </label>
          <label>
            <input type="radio" name="billing" value="yearly" onChange={() => handleBillingSelect('yearly')} />
            Billed Annualy {selectedBilling === 'yearly' && <span className='discount_span'>save 50%</span>}
          </label>
          <label>
            <input type="radio" name="billing" value="Onetime" onChange={() => handleBillingSelect1('Onetime')} />
            One-time purchase {selectedBilling === 'Onetime' && <span className='discount_span'>save 50%</span>}
          </label>
      

        </div>
        
      );
    }

    return null;
  };



  const renderFidelityPrice = () => {
    if (selectedPlan === 'fidelity') {
      if (selectedBilling === 'monthly') {
        return '';
      } else if (selectedBilling === 'quarterly') {
        return '$24';
      } else if (selectedBilling === 'yearly') {
        return '$96';
      } else if (selectedBilling === 'Onetime') {
        return '$199';
      }
    }
    return '';
  };

  const renderFidelityPrice1 = () => {
    if (selectedPlan === 'fidelity') {
      if (selectedBilling === 'monthly') {
        return '$8/mo';
      } else if (selectedBilling === 'quarterly') {
        return '$21.6/qtly';
      } else if (selectedBilling === 'yearly') {
        return '$48/yr';
      } else if (selectedBilling === 'Onetime') {
        return '$199';
      }
    }
    return '$8/mo';
  };

  const renderFamilyPrice = () => {
    if (selectedPlan === 'family') {
      if (selectedBilling === 'monthly') {
        return '';
      } else if (selectedBilling === 'quarterly') {
        return '$57';
      } else if (selectedBilling === 'yearly') {
        return '$228';
      } else if (selectedBilling === 'Onetime') {
        return '$199';
      }
    }
    return '';
  };
  const renderFamilyPrice1 = () => {
    if (selectedPlan === 'family') {
      if (selectedBilling === 'monthly') {
        return '$19/mo';
      } else if (selectedBilling === 'quarterly') {
        return '$51.3/qtly';
      } else if (selectedBilling === 'yearly') {
        return '$114/yr';
      } else if (selectedBilling === 'Onetime') {
        return '$199';
      }
    }
    return '$19/mo';
  };
  const renderClassicPrice = () => {
    if (selectedPlan === 'classic') {
      return '$5/mo';
    }
  };
  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');

    if (userInformation) {
      const user = JSON.parse(userInformation);
      const { plan } = user;
      const { billing } = user;
      setCurrentPlan(plan);
      setPlanType(billing);
      setUser(user);

    } else {
      console.log('User information not found in sessionStorage.');
    }
  }, []);



  useEffect(() => {
    console.log("currentPlan", currentPlan);
  
    if (currentPlan === 'family') {
      setSelectedPlan('family');
      handleBillingSelect('yearly');
      console.log("selectedPlan", selectedPlan);
    }
  
    if (currentPlan === 'fidelity') {
      setSelectedPlan('fidelity');
      handleBillingSelect('yearly');
      console.log("selectedPlan", selectedPlan);
    }
  }, [currentPlan]);  
  









  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');
    if (userInformation) {
      document.body.classList.add('user-logged-in');
    } else {
      document.body.classList.remove('user-logged-in');
      console.log('User information not found in sessionStorage.');
    }
    return () => {
      document.body.classList.remove('user-logged-in');
    };
  }, []);



  console.log("planType", planType);
  console.log("selectedBilling", selectedBilling);










  return (
    <>


      {oneTime ? (
        <>
          <section className="section-plans one-time">
            <div className="container">
              <div className="row plans_header">
                <h2>Select your plan</h2>

              </div>
              <div className="row plans_row_sr">

                <div className={`col plans_item_sr selected`} >
                  <h2>One-time Purchase</h2>
                  <p className="classic-price" ><span className='discount-number'>$299</span> $199</p>
                  <ul>
                    <li><FontAwesomeIcon icon={faCheck} /> Everything from our Fidelity plan + </li>
                    <li><FontAwesomeIcon icon={faCheck} /> Up to 4 child profiles</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Up to 4 parents and relatives</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Includes all new features</li>

                  </ul>
                  {currentPlan === 'classic' ? (
                    <button type="button" className='disabled-plan-btns' disabled>
                      Current Plan
                    </button>
                  ) : currentPlan === 'fidelity' ? (
                    <button type="button" onClick={() => handlePlanClick('classic')}>
                      Select
                    </button>
                  ) : currentPlan === 'family' ? (
                    <button type="button" onClick={() => handlePlanClick('classic')}>
                      Select
                    </button>
                  ) : (
                    <button type="button" onClick={() => handlePlanClick('classic')}>
                      Select
                    </button>
                  )}
                </div>

              </div>
              <div className="prev-next-page">
                {user ? (
                  <Link className='button_cntr_sub button_cntrlogin' to="/parent-dashboard">
                    <button type="button">Back</button>
                  </Link>
                ) : (
                  <Link className='button_cntr_sub button_cntrlogin'>
                    <button onClick={() => handlePlanClick12()} type="button">Back</button>
                  </Link>
                )}


                {user ? (
                  <Link to={`/upgrade-plan?plan=${selectedPlan}${selectedPlan === 'family' ? `&price=${renderFidelityPrice1()}&billing=${selectedBilling}`
                    : ''
                    }${selectedPlan === 'fidelity' ? `&price=${renderFidelityPrice1()}&billing=${selectedBilling}` : ''}${selectedPlan === 'classic' ? `&price=${renderClassicPrice()}&billing=${selectedBilling}` : ''
                    }`} className='button_cntr_sub button_cntrcontinue' >
                    <button type="button">
                      Continue
                    </button>
                  </Link>
                ) : (
                  <Link
                    className='button_cntr_sub button_cntrcontinue'
                    to="/sign-up?plan=onetime&price=$199&billing=onetime" >
                    <button type="button">
                      Continue
                    </button>
                  </Link>
                )}

              </div>
            </div>
          </section>
        </>
      ) : (
        <>


          <section className="section-plans">
            <div className="container">
              <div className="row plans_header">
                <h2>Select your plan</h2>

                {user ? (
                  <></>
                ) : (
                  <p className='free_trial_prgp'>You will not be charged until your free trial is over</p>

                )}
                {renderBilledButtons()}
              </div>
              <div className="row plans_row_sr">

                <div className={`col plans_item_sr ${selectedPlan === 'classic' ? 'selected' : ''}`} onClick={() => handlePlanClick('classic')}>
                  <h2>Classic</h2>
                  <p className="classic-price" >$5/mo</p>
                  <ul>
                    <li><FontAwesomeIcon icon={faCheck} /> Everything from Free plan + </li>
                    <li><FontAwesomeIcon icon={faCheck} /> Parent dashboard</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Unlimited children profiles</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Full access to sharing of interactions</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Recorded interactions (audios, child activities, etc) for 1 month</li>

                  </ul>
                  {currentPlan === 'classic' ? (
                    <button type="button" className='disabled-plan-btns' disabled>
                      Current Plan
                    </button>
                  ) : currentPlan === 'fidelity' ? (
                    <button type="button" onClick={() => handlePlanClick('classic')}>
                      Select
                    </button>
                  ) : currentPlan === 'family' ? (
                    <button type="button" onClick={() => handlePlanClick('classic')}>
                      Select
                    </button>
                  ) : (
                    <button type="button" onClick={() => handlePlanClick('classic')}>
                      Select
                    </button>
                  )}
                </div>



                <div className={`col plans_item_sr ${selectedPlan === 'fidelity' ? 'selected' : ''}`} onClick={() => handlePlanClick('fidelity')}>
                  <h2>Fidelity</h2>
                  <p className="fiedly-price"><span className='discount-number'>{renderFidelityPrice()}</span>{renderFidelityPrice1()}</p>
                  <ul>
                    <li><FontAwesomeIcon icon={faCheck} /> Everything from Classic plan +</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Recorded interactions (audios, child activities, etc) for 24 months</li>
                    <li><FontAwesomeIcon icon={faCheck} /> Interaction history for 24 months</li>
                  </ul>

                  {currentPlan === 'fidelity' && selectedBilling != "yearly"  && planType == selectedBilling ?(

                    
                    <button type="button" disabled className='disabled-plan-btns'>
                      Current Plan
                    </button>
                  ) : (

                    <button type="button" onClick={() => handlePlanClick('fidelity')}>
                      Select
                    </button>
                  )}

                </div>


                {currentPlan === 'family' ? (
                  <div className={`col plans_item_sr ${selectedPlan === 'family' ? 'selected' : ''}`}onClick={() => handlePlanClick('family')}  >
                    <h2>Family</h2>
                    <p className="fiedly-price"><span className='discount-number'>{renderFamilyPrice()}</span> {renderFamilyPrice1()}</p>
                    <ul>
                      <li><FontAwesomeIcon icon={faCheck} /> Everything from Fidelity plan +</li>
                      <li><FontAwesomeIcon icon={faCheck} /> Up to 3 child profiles</li>
                      <li><FontAwesomeIcon icon={faCheck} /> Up to 7 parents and relatives</li>
                    </ul>
                    {currentPlan === 'family' && selectedBilling != "yearly"  && planType == selectedBilling ?(
                      <button type="button" className='disabled-plan-btns' disabled>
                        Current Plan
                      </button>
                    ) : (

                      <button type="button" onClick={() => handlePlanClick('family')}>
                        Select
                      </button>
                    )}
                  </div>
                ) : currentPlan === '' ? (
                  <div className={`col plans_item_sr ${selectedPlan === 'family' ? 'selected' : ''}`} onClick={() => handlePlanClick('family')} >
                    <h2>Family</h2>
                    <p className="fiedly-price"><span className='discount-number'>{renderFamilyPrice()}</span>{renderFamilyPrice1()}</p>
                    <ul>
                      <li><FontAwesomeIcon icon={faCheck} /> Everything from Fidelity plan +</li>
                      <li><FontAwesomeIcon icon={faCheck} /> Up to 3 child profiles</li>
                      <li><FontAwesomeIcon icon={faCheck} /> Up to 7 parents and relatives</li>
                    </ul>
                    {currentPlan === 'family' ? (
                      <button type="button" className='disabled-plan-btns' disabled>
                        Current Plan
                      </button>
                    ) : (
                      <button type="button" onClick={() => handlePlanClick('family')}>
                        Select
                      </button>
                    )}
                  </div>
                ) : (

                  <>
                    <div className={`col plans_item_sr ${selectedPlan === 'family' ? 'selected' : ''}`} onClick={() => handlePlanClick('family')}>
                      <h2>Family</h2>
                      <p className="fiedly-price"><span className='discount-number'>{renderFamilyPrice()}</span>{renderFamilyPrice1()}</p>
                      <ul>
                        <li><FontAwesomeIcon icon={faCheck} /> Everything from Fidelity plan +</li>
                        <li><FontAwesomeIcon icon={faCheck} /> Up to 3 child profiles</li>
                        <li><FontAwesomeIcon icon={faCheck} /> Up to 7 parents and relatives</li>
                      </ul>
                      {currentPlan === 'family' ? (
                        <button type="button" className='disabled-plan-btns' disabled>
                          Current Plan
                        </button>
                      ) : (
                        <button type="button" onClick={() => handlePlanClick('family')}>
                          Select
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

         
              <div className="prev-next-page">
                {user ? (
                  <Link className='button_cntr_sub button_cntrlogin' to="/parent-dashboard">
                    <button type="button">Back</button>
                  </Link>
                ) : (
                  <Link className='button_cntr_sub button_cntrlogin' to="/login">
                    <button type="button">Back</button>
                  </Link>
                )}


                {user ? (
                  <Link to={`/upgrade-plan?plan=${selectedPlan}${selectedPlan === 'family' ? `&price=${renderFamilyPrice1()}&billing=${selectedBilling}`
                    : ''
                    }${selectedPlan === 'fidelity' ? `&price=${renderFidelityPrice1()}&billing=${selectedBilling}` : ''}${selectedPlan === 'classic' ? `&price=${renderClassicPrice()}&billing=${selectedBilling}` : ''
                    }`} className='button_cntr_sub button_cntrcontinue' >
                    <button type="button">
                      Continue
                    </button>
                  </Link>
                ) : (
                  <Link
                    className='button_cntr_sub button_cntrcontinue'
                    to={`/sign-up?plan=${selectedPlan}${selectedPlan === 'family' ? `&price=${renderFamilyPrice1()}&billing=${selectedBilling}`
                      : ''
                      }${selectedPlan === 'fidelity' ? `&price=${renderFidelityPrice1()}&billing=${selectedBilling}` : ''}${selectedPlan === 'classic' ? `&price=${renderClassicPrice()}&billing=${selectedBilling}` : ''
                      }`}
                  >
                    <button type="button">
                      Continue
                    </button>
                  </Link>
                )}

              </div>
            </div>
          </section>
        </>
      )}
    
    </>
  )
}

