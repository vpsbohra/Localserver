import React from 'react';
import before_you_go from '../../images/before_you_go.png';
const PopupOne = ({ handleConfirmDeactivate }) => {
   
    return (
        <>
            <div className="before_you_go">
                <div className="before_you_go_inner">
                    <h3>Before you go</h3>
                    <div className="before_you_go_content">
                        <img src={before_you_go} />
                        <p>Are you sure about your decision? We'd like you to consider our Souvenir subscription plan. It not only allows you to retain your account data and interactions but also ensures that your cherished memories are preserved, even if you think your child won't be using the account anymore or has outgrown it. This valuable service comes at a nominal fee of just 2,5€ per month.</p>
                        <button className='ghet_started_btn'>Get Started</button>
                        <button className='yes_amsure_btn' onClick={handleConfirmDeactivate}>Yes I am sure</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PopupOne;