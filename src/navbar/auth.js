/* eslint-disable react/jsx-pascal-case */
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
import ChosenStory from '../components/Dashboard/Chosenbook.js';
import StartBook from '../components/Dashboard/Startbook';
import OpenBook from '../components/Dashboard/OpenBook.js';
import KidsStory from '../components/Dashboard/KidzStory';
import KidzOnGoingStory from '../components/Dashboard/KidzOnGoingStory';
import Home from '../components/home';
import DoneWithBook from '../components/Dashboard/DoneWithbook.js';
import GettingStartedQuiz from '../components/Dashboard/GettingStartedQuiz';
import Quiz from '../components/Dashboard/QuizQuestion';
import RecordedAnswer from '../components/Dashboard/RecordedAnswer';
import RecordedExtraAnswer from '../components/Dashboard/RecordedExtraAnswer';
import Code from '../components/Dashboard/Code.js';
import AllActivity from '../components/Dashboard/AllActivity.js';
import QuizMultiple from '../components/Dashboard/quizpage.js';
import Login from '../components/login';
import All_characters from '../components/Dashboard/All_characters';
import Selected_character from '../components/Dashboard/Selected_character';
import DashboardAddprofile from '../components/Dashboard/AddProfile';
import About from '../components/about';
import ContactUs from '../components/ContactUs';
import Faq from '../components/Faq';
import PlayStory from '../components/Dashboard/playStory';

function Auth() {

    return (
        <>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/add-profile" element={<DashboardAddprofile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/faq" element={<Faq />} />
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
                    <Route path="/chosenstory" element={<ChosenStory />} />
                    <Route path="/startbook" element={<StartBook />} />
                    <Route path="/openbook" element={<OpenBook />} />
                    <Route path="/logout" element={<Home />} />
                    <Route path="/kidzstory" element={<KidsStory />} />
                    <Route path="/kidzongoingstory" element={<KidzOnGoingStory />} />
                    <Route path="/donewithbook" element={<DoneWithBook />} />
                    <Route path="/gettingstartedquiz" element={<GettingStartedQuiz />} />
                    <Route path="/RecordedAnswer" element={<RecordedAnswer />} />
                    <Route path="/Recorded-extra-answer" element={<RecordedExtraAnswer />} />
                    <Route path="/quiz-question" element={<Quiz />} />
                    <Route path="/code" element={<Code />} />
                    <Route path="/all-activity" element={<AllActivity />} />
                    <Route path="/quiz" element={<QuizMultiple />} />
                    <Route path="/allcharacters" element={<All_characters />} />
                    <Route path="/selectedcharacter" element={<Selected_character />} />
                    <Route path="/PlayStory" element={<PlayStory />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;
