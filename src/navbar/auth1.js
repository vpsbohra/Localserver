import { Routes, Route } from 'react-router-dom';
// import Home from '../components/home';
import Dashboard from '../components/dashboard';
import WhoAreYou from '../components/Dashboard/WhoAreYou';
import AccountCreatedCodeSetup from '../components/Dashboard/AccountCreatedCodeSetup';
import CreateChildProfile from '../components/Dashboard/CreateChildProfile';
import ParentDashboard from '../components/Dashboard/ParentDashboard';
import KidzDashboard from '../components/Dashboard/KidzDashboard';
import ChildChat from '../components/chat/ChildChat';
import KidsListing from '../components/Dashboard/KidsListing';
import Suscription from '../components/Subscription';
import StripePayment from '../components/PaymentGateway/StripePayment';
import UpgradeStripePayment from '../components/PaymentGateway/UpgradeStripePayment';
import Support from '../components/Dashboard/Support';
import KidsStory from '../components/Dashboard/KidzStory';
import KidzOnGoingStory from '../components/Dashboard/KidzOnGoingStory';
import Home from '../components/home';

function Auth() {
    
    return (
        <>
            <div className="main">
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/who-are-you" element={<WhoAreYou />} />
                    <Route path="/account-created" element={<AccountCreatedCodeSetup />} />
                    <Route path="/create-child-profile" element={<CreateChildProfile />} />
                    <Route path="/parent-dashboard" element={<ParentDashboard />} />
                    <Route path="/Kids-view" element={<KidzDashboard />} />
                    <Route path="/kids-listing" element={<KidsListing />} />
                    <Route path="/kids-messages" element={<ChildChat />} />
                    <Route path="/subscription" element={<Suscription />} />
                    <Route path="/payment" element={<StripePayment />} />
                    <Route path="/upgrade-plan" element={<UpgradeStripePayment />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/kidzstory" element={<KidsStory />} />
                    <Route path="/kidzongoingstory" element={<KidzOnGoingStory />} />
                    <Route path="/logout" element={<Home />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;
