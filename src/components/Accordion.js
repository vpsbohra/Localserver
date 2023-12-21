import React, { useState } from 'react';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Circle_Chev_Downa from '../images/Circle_Chev_Down01.png';

function Accordion({ title, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <img src={Circle_Chev_Downa}/>
        {/* <span className={isExpanded ? 'icon expanded' : 'icon'}>
          {isExpanded ? <FontAwesomeIcon icon={faCircleChevronDown} /> : <FontAwesomeIcon icon={faCircleChevronDown} />}
        </span> */}
      </div>
      {isExpanded && <div className="accordion-content">{content}</div>}
    </div>
  );
}

export default Accordion;
