import { useState } from "react";
import { useNavigate, useLocation, useHistory } from 'react-router-dom';
import AuthUser from './AuthUser';
import FBImage from '../images/fb_icon.png';
import AppleImage from '../images/apple_icon.png';
import Select from 'react-select';
import { getCountries, getCities } from 'countries-cities';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthSignup from "./GoogleAuthSignup";

export default function Register() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const planParam = queryParams.get('plan');
    const billingParam = queryParams.get('billing');
    const priceParam = queryParams.get('price');

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const handleError = (message) => {
        setErrorMessage(message);
      };
    // const submitForm = () => {
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //     };

    //     const data = {
    //         first_name: `${firstName}`,
    //         last_name: `${lastName}`,
    //         email: email,
    //         password: password,
    //         country: country,
    //         city: city,
    //         postalCode: postalCode,
    //         plan: planParam,
    //         billing: billingParam,
    //         price: priceParam,
    //     };
    //     http
    //     .post('/register', data, { headers: headers })
    //     .then((res) => {
    //         const { access_token, user } = res.data;
    //         // console.log(access_token);
    //         // console.log(user);
    //         setToken(res.data.user,res.data.access_token);
    //         navigate('/account-created', { state: { user } });
    //     })
    //     .catch((error) => {
    //         if (error.response.status === 422) {
    //             const errors = error.response.data.errors;
    //             setErrors(errors);
    //         } else {
    //             // console.log(error.response.data.message);
    //         }
    //     });
    // };
    const countries = getCountries().map((country) => ({
        value: country,
        label: country,
    }));

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption);
        setCity(null);
    };

    const handleCityChange = (selectedOption) => {
        setCity(selectedOption);
    };

    const cities = country ? getCities(country.value).map((city) => ({
        value: city,
        label: city,
    })) : [];


    const submitFormPayment = () => {
        // Perform validation checks
        const errors = {};
    
        if (!firstName) {
            errors.firstName = 'First name is required';
        }
    
        if (!lastName) {
            errors.lastName = 'Last name is required';
        }
    
        if (!email) {
            errors.email = 'Email address is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Invalid email address';
        }
    
        if (!country) {
            errors.country = 'Country is required';
        }
    
        if (!city) {
            errors.city = 'City is required';
        }
    
        if (!postalCode) {
            errors.postalCode = 'Postal/Zip Code is required';
        }
        if (!password) {
            errors.password = 'Password is required';
        }
    
        // If there are errors, update the state and display the error messages
        if (Object.keys(errors).length > 0) {
            console.log(errors);
            setErrors(errors);
            return; // Prevent navigation to the payment page if there are errors
        }
    
        // No validation errors, navigate to the payment page
        const data = {
            first_name: firstName,
            last_name: lastName,
            email,
            country: country ? country.value : '',
            city: city ? city.value : '',
            postalCode,
            password: password,
            plan: planParam,
            billing: billingParam,
            price: priceParam,
        };
    
        navigate('/payment', { state: { data } });
    };
    
    // Function to validate email format
    const isValidEmail = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    return(
        <div className="signup_page_sr">
        <div className="container">
        <div className="row justify-content-center pt-5">
            <div className="col-sm-12">
                <div className="card signup_sr_cnt p-4">
                    <h1 className="text-center mb-3">Sign Up </h1>
                    {errorMessage && <p style={{color:'red', textAlign: 'center'}}>{errorMessage}</p>}

                     <div className="form-group login_with_btncnrl mt-3">
                                <GoogleOAuthProvider clientId="211892139032-031hag3n8u2u3m1s39nhpjjrauakc32k.apps.googleusercontent.com">
                                <GoogleAuthSignup onError={handleError}/>
                                </GoogleOAuthProvider>
                        <button type="button" className="login-with-facebook-btn" ><img src={FBImage} alt="meet-character-1" /> Sign up with Facebook</button>
                        <button type="button" className="login-with-apple-btn" ><img src={AppleImage} alt="meet-character-1" /> Sign up with Apple</button>
                    </div>  
                    <div className="form-group mt-3 or_text">
                        <span>OR</span>
                    </div>
                </div>
                <div className="signup_srform_outer">
                <div className="card signup_sr_cnt signup_srform">
                    <div className="form-group">
                        <label>First Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter first name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors && errors.first_name && (
                            <span className="text-danger">{errors.first_name}</span>
                        )}
                        {errors && errors.firstName && (
                            <span className="text-danger">{errors.firstName}</span>
                        )}
                        </div>
                        <div className="form-group">
                        <label>Last Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter last name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors && errors.last_name && (
                            <span className="text-danger">{errors.last_name}</span>
                        )}
                         {errors && errors.lastName && (
                            <span className="text-danger">{errors.lastName}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Email address*</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors && errors.email && (
                            <span className="text-danger">{errors.email}</span>
                        )}
                        </div>
                        <div className="form-group">
                        <label>Password*</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        /> 
                        {errors && errors.password && (
                            <span className="text-danger">{errors.password}</span>
                        )}
                        </div>
                        <div className="form-group">
                            <label>Country*</label>
                            <Select
                                options={countries}
                                value={country}
                                onChange={handleCountryChange}
                            />
                            {errors && errors.country && (
                                <span className="text-danger">{errors.country}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>City*</label>
                            <Select
                                options={cities}
                                value={city}
                                onChange={handleCityChange}
                            />
                            {errors && errors.city && (
                                <span className="text-danger">{errors.city}</span>
                            )}
                        </div>
                        <div className="form-group">
                        <label>Postal/Zip Code*</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter postal/zip code"
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        {errors && errors.postalCode && (
                            <span className="text-danger">{errors.postalCode}</span>
                        )}
                        </div>
                        </div>
                        <div className="form-group_btn">
                        {planParam === 'free' ? (
                            <>
                             {/* <button type="button" onClick={submitForm} className="btn btn-primary continue_signup mt-4"> */}
                                 {/* Continue */}
                             {/* </button> */}
                            </>
                        ) : (
                            <button type="button" onClick={submitFormPayment} className="btn btn-primary continue_signup mt-4">
                                Continue to payment
                            </button>
                        )}             
                        </div>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
}