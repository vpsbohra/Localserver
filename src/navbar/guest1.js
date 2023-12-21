import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Faq from '../components/Faq';
import Home from '../components/home';
import Login from '../components/login';
// import Register from '../components/register';
import SignUp from '../components/SignUp';
import Suscription from '../components/Subscription';
import Logo from '../images/KIDZCONNECT-1.png';
import StripePayment from '../components/PaymentGateway/StripePayment';
import ContactUs from '../components/ContactUs';
import SuggestFeatures from '../components/Dashboard/SuggestFeatures';

function Guest() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/sign-up';
    const isSubscriptionPage = location.pathname === '/subscription';
    const isParentDashboard = location.pathname === '/parent-dashboard';
  
    return (
        <>
    {!isLoginPage && !isRegisterPage && !isSubscriptionPage &&(
        <div className="header_inner">
        <div className="container">
            <nav className="navbar navbar-expand-sm"><button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="logo"><Link to="/"><img src={Logo} alt="Description of the image" /></Link></div>
                <div className="collapse navbar-collapse" id="navbarNav">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">ABOUT US</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/faq">HELP</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact-us">CONTACT US</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link"> </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/"> </Link>
                    </li> */}
                    <li>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.8895 0H0V15.9999H24.8895V0Z" fill="#000066"/>
<path d="M0 0V1.78885L22.1068 16H24.8895V14.2112L2.78264 5.33332e-05L0 0ZM24.8895 0V1.78879L2.78264 15.9999H0V14.2112L22.1068 0H24.8895Z" fill="white"/>
<path d="M10.3706 0V15.9999H14.5189V0H10.3706ZM0 5.33331V10.6666H24.8895V5.33331H0Z" fill="white"/>
<path d="M0 6.39998V9.59997H24.8895V6.39998H0ZM11.2003 0V15.9999H13.6892V0H11.2003Z" fill="#CC0000"/>
<path d="M0 15.9999L8.29649 10.6666H10.1516L1.85509 15.9999H0ZM0 0L8.29649 5.33331H6.44139L0 1.19258L0 0ZM14.7379 5.33331L23.0344 0H24.8895L16.593 5.33331H14.7379ZM24.8895 15.9999L16.593 10.6666H18.4481L24.8895 14.8074V15.9999Z" fill="#CC0000"/>
</svg>
                    </button>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="#"><svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.8895 0H0V15.9999H24.8895V0Z" fill="#000066"/>
<path d="M0 0V1.78885L22.1068 16H24.8895V14.2112L2.78264 5.33332e-05L0 0ZM24.8895 0V1.78879L2.78264 15.9999H0V14.2112L22.1068 0H24.8895Z" fill="white"/>
<path d="M10.3706 0V15.9999H14.5189V0H10.3706ZM0 5.33331V10.6666H24.8895V5.33331H0Z" fill="white"/>
<path d="M0 6.39998V9.59997H24.8895V6.39998H0ZM11.2003 0V15.9999H13.6892V0H11.2003Z" fill="#CC0000"/>
<path d="M0 15.9999L8.29649 10.6666H10.1516L1.85509 15.9999H0ZM0 0L8.29649 5.33331H6.44139L0 1.19258L0 0ZM14.7379 5.33331L23.0344 0H24.8895L16.593 5.33331H14.7379ZM24.8895 15.9999L16.593 10.6666H18.4481L24.8895 14.8074V15.9999Z" fill="#CC0000"/>
</svg> EN</Link>
                        <Link className="dropdown-item" to="#"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="-10 -10 3020 2020">
	<g id="French_Flag_by_Adam_Stanislav">
		<title>Flag of France, by Adam Stanislav</title>
		<rect fill="rgb(0%,14%,58%)" x="0" y="0" width="1010" height="2000" />
		<rect fill="rgb(97%,97%,97%)" x="1000" y="0" width="1010" height="2000" />
		<rect fill="rgb(93%,16%,22%)" x="2000" y="0" width="1000" height="2000" />
		<rect fill="none" stroke="rgb(55%,55%,55%)" strokeWidth="10" x="0" y="0" width="3000" height="2000" />
	</g>
</svg> FR</Link>
                    </div>
                    </div>
                    </li>
                  
                    <li className="nav-item login-btn">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
              </div>
            </nav>
            </div>
            </div>
        )}
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/subscription" element={<Suscription />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/payment" element={<StripePayment />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/suggest-features" element={<SuggestFeatures />} />
                    <Route path="/logout" element={<Home />} />
                </Routes>
            </div>
        </>
    );
}

export default Guest;
