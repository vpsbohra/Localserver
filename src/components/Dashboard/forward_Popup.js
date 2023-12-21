


import React, { useState } from 'react';
import Facebook from '../../images/Facebook_Icon.png'
import Whatsapp from '../../images/whatsapp_Icon.png'
import Copy from '../../images/Copy_Link.png'
import Copy_small from '../../images/Copy.png'
import close_iconImage from '../../images/close_icon.png'; 

const ForwardPopup = ({ onClose }) => {
  const [link, setLink] = useState('https://link.kidzconnect.xxxxx');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const linkInput = document.getElementById('link-input');
    linkInput.select();
    document.execCommand('copy');
    setIsCopied(true);
  };

  return (
    <>
      <div className="forward_popup">
        <div className="close-button" onClick={onClose}>
          <img src={close_iconImage} alt="Close" /> {/* Close button */}
        </div>
        <div className="forward_popup_inner">
                    <h3>Forward to Auntie (+32 477 337717)</h3>
                    <div className='social_icons'>
                        <a className='social_icons_item' href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`} target="_blank">
            <img src={Facebook} alt="Facebook" />
            <span>Facebook</span>
          </a>
                        <a className='social_icons_item' href="https://web.whatsapp.com/send?text= Please Visit https://link.kidzconnect.xxxxx"  target="_blank"><img src={Whatsapp} />
                          <span>Whatsapp</span></a>
                        <div className='social_icons_item'>
                        <img src={Copy} alt="Copy Small" onClick={handleCopyClick} style={{ cursor: 'pointer' }} />
                        <span onClick={handleCopyClick} style={{cursor: 'pointer'}}>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
                         
                        </div>
                    </div>
                    <div className='copylink'>
                        <input
                            type='text'
                            id='link-input'
                            value={link}
                            readOnly
                        />
                      <div className='copylink_right'>
                        <img src={Copy_small} alt="Copy Small" onClick={handleCopyClick} style={{ cursor: 'pointer' }} />
                        <p onClick={handleCopyClick} style={{ cursor: 'pointer' }}>{isCopied ? 'Link Copied!' : 'Copy Link'}</p>
                      </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ForwardPopup;



