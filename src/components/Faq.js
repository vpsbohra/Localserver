import React from 'react';
import { useState } from 'react';
import Footer from './Footer';
import search_keywordIMG from '../images/search_keyword.png';
import Header from './Header';
import circle_chev_BACKIMG from '../images/Circle_Chev_Down_clrr.png';



const Answers = [
	{
		question: "What is KidzConnect",
		answer: "KidzConnect, made by parents for parents, is a platform dedicated to providing an interactive and educational space for children while strengthening the parent-child bond. It offers a wide range of engaging stories, activities, and opportunities for kids to learn, be heard and have fun. Parents can join in, too, by sharing in their children's learning journey and creating lasting memories together. KidzConnect aims to innovate the way we preserve cherished moments by incorporating sound while making learning enjoyable, all while fostering meaningful family connections.",
	},
	{
		question: "Is the KidzConnect environment safe and secure for children",
		answer: "We understand how as a parent you’d have concerns about your children’s safety online. At KidzConnect, we prioritize the safety and security of children using our platform. We have implemented robust parental control solutions to create a secure environment where you will have complete control over your children's interactions and activity, ensuring their online safety.",
	},
	{
		question: "How old do you have to be to use KidzConnect",
		answer: 'KidzConnect is designed for children aged 7 to 12 years old.',
	},
	{
		question: "Is KidzConnect available on mobile",
		answer: 'Yes, KidzConnect is accessible through mobile devices with an internet connection.',
	},
	{
		question: "Is KidzConnect available in multiple languages",
		answer: 'Currently, KidzConnect is available in the following 5 languages: English, French, Spanish, Portuguese and German. ',
	},
	{
		question: "How do I create an account on KidzConnect",
		answer: "To create an account on KidzConnect, simply click onto the login button on the top right of our website's landing page and follow the easy registration process.",
	},
	{
		question: "How can I register multiple children with a single email address",
		answer: 'Each child can have their own KidzConnect account linked to a single parent email address. During the registration process, you can add multiple child profiles, the exact amount depending on your selected subscription plan. Click here for more details about all our subscription plans.',
	},
	{

		question: "How can I modify my profile information",
		answer: 'You can edit your profile information by logging into your KidzConnect account, going to your profile settings on your dashboard, and making the desired changes.',
	},
	{

		question: "How can I recover my password if I forget it",
		answer: 'If you forget your password, simply click on the "Forgot Password" link on the login page. We will send you instructions on how to reset your password via your email address.',
	},
	{

		question: "How can I cancel my KidzConnect subscription",
		answer: 'You can cancel your KidzConnect subscription by logging into your account, going to your settings on your dashboard, and following the cancellation process.',
	},
	{

		question: "How do the different subscriptions work",
		answer: 'We offer various subscription plans with different features and benefits. You can choose the subscription plan that best suits your needs, and it will grant you access to our premium content and features.',
	},
	{

		question: "What payment methods are accepted for subscriptions",
		answer: 'We accept major credit cards and other payment methods, which include [list], for subscription payment',
	},
	{

		question: "Are there any discounts",
		answer: 'We occasionally offer discounts and promotions. Keep an eye on our website and upcoming newsletter for updates on special offers.',
	},
	{

		question: "Can children listen to, read, or interact with KidzConnect content outside the website",
		answer: 'Currently, KidzConnect content is accessible only through our website.',


	},

	
	{

		question: "How does the MasterKidz game in KidzConnect work",
		answer: 'Pending.......',


	},


	{

		question: "How do kids earn more points in KidzConnect",
		answer: 'Kids can earn points by actively participating in and completing various educational activities within the KidzConnect platform.',


	},

	{

		question: "Does my child have the ability to ask questions to their parents",
		answer: 'Yes, your child can ask questions to their parents within the KidzConnect platform as part of our interactive features.',


	},



	{

		question: "How can I interact with my child's answers to questions",
		answer: "Parents can interact with their child's answers by providing feedback, encouragement, and engaging in meaningful discussions within the KidzConnect platform.",


	},

	
	{

		question: "Can my child repeat a theme more than once",
		answer: 'Currently, a child may only explore a theme once.',


	},


	{
		question: "How can I share my child's interaction with other family members",
		answer: "You can share your child's interactions and achievements with other family members by using our built-in sharing features, such as sharing on social media or sending links. You may also directly involve your other family members by adding them onto your subscription plan therefore giving them access to your child’s answers, interactions and fostering those greater bonds.",


	},
	{

		question: "How can I track my child's progress in the application",
		answer: "KidzConnect offers a comprehensive tracking system that allows parents to monitor their child's progress, completed activities, and areas of interest within the platform",


	},
	{
		question: "What are KidzConnect's rules and policies regarding respect and safety",
		answer: "KidzConnect has strict rules and policies in place to ensure a safe and respectful environment for all users. Please refer to our Terms of Use and Privacy Policy for more information.",
	},
	{
		question: "How can I contact customer support",
		answer: 'You can reach our customer support team by visiting our "Contact Us" page on the website, by logging in and going onto the “Support” section of your dashboard or by emailing (support email address).',
	},
	{
		question: "How can I report a problem or bug on the website",
		answer: "If you encounter any problems or bugs on the website, please contact our customer support team for assistance through our “Contact Us” page on the website or through the “Support” section of your dashboard."
	},
	{

		
		question: "How can I contact the development team for questions, feedback, or technical issues",
		answer: 'For questions or feedback, you may contact us by logging in and going on the "Suggest Features"  section of your dashboard, or by emailing (feedback team email address). Your input is valuable to us',


	},


	
];
export default function Faq() {

	const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
	const handleQuestionClick = (index) => {
		setSelectedQuestionIndex(index);
		setTimeout(() => scrollToTop(), 5);
	};



	const scrollToTop = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};


	const handleBackClick = () => {
		setSelectedQuestionIndex(null);
	};

	return (
        <>
			<Header />
			{selectedQuestionIndex === null ? (
				<div className="main-container faq_page">
					<div className="container">
						<div className="faq_page_inner">
							<div className="faq_page_head">
								<h1>How Can We Help</h1>
								<div className="faq_page_head_form">
									<img src={search_keywordIMG} alt="logo" />
									<input className="form-control mr-sm-2" type="search" placeholder="Search keyword" aria-label="Search" />
								</div>
							</div>
							<div className="faq_row_item">
								<div className="left_faq faq_multiitem">
									<div className="col faq_col_item">
										<h2>About KidzConnect</h2>
										<div className="content">
											<p onClick={() => handleQuestionClick(0)}>What is KidzConnect</p>
											<p onClick={() => handleQuestionClick(1)}>Is the KidzConnect environment safe and secure for children</p>
										</div>
									</div>
									<div className="col faq_col_item">
										<h2>Usage and Requirements</h2>
										<div className="content">
											<p onClick={() => handleQuestionClick(2)}>How old do you have to be to use KidzConnect</p>
											<p onClick={() => handleQuestionClick(3)}>Is KidzConnect available on mobile</p>
											<p onClick={() => handleQuestionClick(4)}>Is KidzConnect available in multiple languages</p>
										</div>
									</div>
									<div className="col faq_col_item">
										<h2>Account and Profile Management</h2>
										<div className="content">
											<p onClick={() => handleQuestionClick(5)}>How do I create an account on KidzConnect</p>
											<p onClick={() => handleQuestionClick(6)}>How can I register multiple children with a single email address</p>
											<p onClick={() => handleQuestionClick(7)}>How can I modify my profile information</p>
											<p onClick={() => handleQuestionClick(8)}>How can I recover my password if I forget it</p>
											<p onClick={() => handleQuestionClick(9)}>How can I cancel my KidzConnect subscription</p>
										</div>
									</div>
									<div className="col faq_col_item">
										<h2>Subscriptions and Pricing</h2>
										<div className="content">
											<p onClick={() => handleQuestionClick(10)}>How do the different subscriptions work</p>
											<p onClick={() => handleQuestionClick(11)}>What payment methods are accepted for subscriptions</p>
											<p onClick={() => handleQuestionClick(12)}>Are there any discounts</p>
										</div>
									</div>
								</div>


								<div className="right_faq_item faq_multiitem">
									<div className="col faq_col_item">
										<h2>Content and Features</h2>
										<div className="content">
											<p onClick={() => handleQuestionClick(13)}>Can children listen to, read, or interact with KidzConnect content outside the website</p>
											<p onClick={() => handleQuestionClick(14)}>How does the MasterKidz game in KidzConnect work</p>
											<p onClick={() => handleQuestionClick(15)}>How do kids earn more points in KidzConnect</p>
										</div>
									</div>
									<div className="col faq_col_item">
										<h2>Parental Involvment and Monitoring</h2>
										<div className="content">
											<p onClick={() => handleQuestionClick(16)}>Does my child have the ability to ask questions to their parents</p>
											<p onClick={() => handleQuestionClick(17)}>How can I interact with my child's answers to questions</p>
											<p onClick={() => handleQuestionClick(18)}>Can my child repeat a theme more than once</p>
											<p onClick={() => handleQuestionClick(19)}>How can I share my child's interaction with other family members</p>
											<p onClick={() => handleQuestionClick(20)}>How can I track my child's progress in the application</p>
										</div>
									</div>
									<div className="col faq_col_item">
										<h2>Policies and Support</h2>
										<div className="content">
											<p onClick={() => handleQuestionClick(21)}>What are KidzConnect's rules and policies regarding respect and safety</p>
											<p onClick={() => handleQuestionClick(22)}>How can I contact customer support</p>
											<p onClick={() => handleQuestionClick(23)}>How can I report a problem or bug on the website</p>
											<p onClick={() => handleQuestionClick(24)}>How can I contact the development team for questions, feedback, or technical issues</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


			) : (


				<div className="question-content answer-faq-inr">
                 <div class="container">
					<div className="question-content_left">
						<div className="question-content">
							<div className="question-content_left">
								<button className="back-button" onClick={handleBackClick}>
									<img src={circle_chev_BACKIMG} alt="logo" />
								</button>

							
							</div>
							<div className="question-content_right">
								<h2>{Answers[selectedQuestionIndex].question}</h2>

								<p>{Answers[selectedQuestionIndex].answer}</p>
							</div>
						</div>


</div>
</div>
					</div>
	)}
					<Footer />
				</>
			);
}