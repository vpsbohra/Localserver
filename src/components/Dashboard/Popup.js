import React from "react";
import Star from '../../images/Star Icon.png';

function PointEarnedPopup({ onClose }) {
  return (
    <div className="point-earned-popup">
      <img src={Star} />
      <span>+1 POINT EARNED! </span>
    </div>
  );
}

export default PointEarnedPopup;