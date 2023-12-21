import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Plans() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/subscription');
      };

    return(
        <section className="section-plans">
            <div className="container">
                <div className="row plans_header">
                    <h2>A plan for every family</h2>
                    </div>
                    <div className="row plans_row_sr">
                        <div className="col plans_item_sr">
                            <h2>Classic</h2>
                            <p>$5/mo</p>
                            <ul>
                                <li><FontAwesomeIcon icon={faCheck} /> Everything from Free plan + </li>
                                <li><FontAwesomeIcon icon={faCheck} /> Parent dashboard</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Unlimited children profiles</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Full access to sharing of interactions</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Recorded interactions (audios, child activities, etc) for 1 month</li>

                            </ul>
                            <button onClick={handleButtonClick} type="button">Get started</button>
                        </div>
                        <div className="col plans_item_sr">
                            <h2>Fidelity</h2>
                            <p>$8/mo</p>
                            <ul>
                                <li><FontAwesomeIcon icon={faCheck} /> Everything from Classic plan +</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Recorded interactions (audios, child activities, etc) for 24 months</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Interaction history for 24 months</li>
                            </ul>
                            <button onClick={handleButtonClick} type="button">Get started</button>
                        </div>
                        <div className="col plans_item_sr">
                            <h2>Family</h2>
                            <p>$19/mo</p>
                            <ul>
                                <li><FontAwesomeIcon icon={faCheck} /> Everything from Fidelity plan +</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Up to 3 child profiles</li>
                                <li><FontAwesomeIcon icon={faCheck} /> Up to 7 parents and relatives</li>
                            </ul>
                            <button onClick={handleButtonClick}  type="button">Get started</button>
                        </div>
                </div>
            </div>
        </section>
    )
}