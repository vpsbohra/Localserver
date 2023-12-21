

// PopupTwo.js
import React from 'react';

const PopupTwo = ({ handleDeleteAccount, removeBodyClass1 }) => {
    return (
        <div className="are_you_sure">
            <div className="are_you_sure_inner">
                <h3>Are You Sure You Want to Leave?</h3>
                <div className='are_you_sure_content areyou_sure_checkItem'>
                    <p>We're sorry to see you go. To continue with the deletion, please review and confirm the following details:</p>

                </div>
                <div className='checkbox_with_content areyou_sure_checkItem'>
                    <div className='areyou_sure_checkbox'>
                        <input type='checkbox' />
                        <span className='checkmark custom_checkbox'></span>
                    </div>
                    <p>I acknowledge that by deleting my account, all my account data and billing information will be permanently removed.</p>
                </div>
                <div className='checkbox_with_content areyou_sure_checkItem'>
                <div className='areyou_sure_checkbox'>
                        <input type='checkbox' />
                        <span className='checkmark custom_checkbox'></span>
                    </div>
                    <p>I understand that, in the case of account deletion, I will not receive a refund for any remaining subscription time. However, I will retain access to my account until the next regular billing cycle begins.</p>
                </div>
                <div className='are_you_sure_buttons'>
                    <button className='Nevermind_btn' onClick={removeBodyClass1}>Nevermind</button>
                    <button className='delete_account_btn' onClick={handleDeleteAccount}>Delete My Account</button>
                </div>
            </div>
        </div>


    );
};

export default PopupTwo;
