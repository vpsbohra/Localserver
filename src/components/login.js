import React, { useState, useEffect } from "react";
import AuthUser from './AuthUser';
import { Link, useNavigate } from 'react-router-dom';
import GoogleImage from '../images/google_icon.png';
import FBImage from '../images/fb_icon.png';
import AppleImage from '../images/apple_icon.png';
import show_passwImage from '../images/show_passw.png';
import show_passwEYEImage from '../images/show_passwEyeOn.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthLogin from './GoogleAuthLogin';
import Load from '../images/index.gif';

export default function Login() {
  const [formStatus, setFormStatus] = React.useState('LOGIN');

    const { http, setToken } = AuthUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const[error,setError]=useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            navigate('/parent-dashboard');
        }
        const rememberMeCheck = sessionStorage.getItem("rememberMe");
        if (rememberMeCheck === "true") {
            const storedEmail = sessionStorage.getItem("email");
            if (storedEmail) {
                navigate('/parent-dashboard');
            }
        }
    }, [navigate]);

    const submitForm = () => {
        setFormStatus('loading');

        http.post('/login', { email: email, password: password }).then((res) => {

                if (rememberMe) {
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("rememberMe", true);
                } else {
                    sessionStorage.removeItem("email");
                    sessionStorage.removeItem("rememberMe");
                }
            setToken(res.data.user, res.data.access_token);
        }).catch((error) => {
            setFormStatus("LOGIN");

            setError(true);
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        });
    };

    const handleError = (message) => {
        setErrorMessage(message);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [imgSrc, setImgSrc] = useState(
        show_passwEYEImage
    );

    const changeImg = () => {
        if (imgSrc === show_passwEYEImage) {
            setImgSrc(show_passwImage);
        }
        else if (imgSrc === show_passwImage) {
            setImgSrc(show_passwEYEImage);
        }
    };

    const [errorMessage, setErrorMessage] = useState('');

    

    return (
        <div className="login_page_sr">
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <div className="col-sm-6">
                        <div className="card login_sr_cnt p-4">
                            <h1 className="text-center mb-3">Login </h1>
                            <div className="form-group">
                                <label>Email address:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={e=>setEmail(e.target.value)}
                                    id="email"
                                />
                                {errors && errors.email && (
                                    <span className="text-danger">{errors.email[0]}</span>
                                )}
                            </div>
                            <div className="form-group mt-3 Password_form_sr">
                                <label>Password:</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="pwd"
                                />
                                {errors && errors.password && (
                                    <span className="text-danger">{errors.password[0]}</span>
                                )}
                                <button className="show_passw_btn" onClick={function () { toggleShowPassword(); changeImg() }}>
                                    <img src={imgSrc} alt="meet-character-1" />
                                </button>
                                <span className={error?'actveError':'deactiveError'}>Please enter correct Email or Password</span>
                            </div>
                            <div className="form-group Password_group mt-3">
                                <div className="show-pass">
                                    <input
                                        type="checkbox"
                                        className="ch"
                                        id="rememberCheck"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)} 
                                    />
                                    Remember Me
                                </div>
                                <div className="forget-pass">
                                    <Link className="nav-link" to="/">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                            <div className="form-group login_btnsr mt-3">
                                <button type="button" onClick={submitForm} className="btn btn-primary mt-4">{formStatus === 'loading' ? (
    <img src={Load} alt="Loading..." />
):(<>LOGIN</>)}</button>
                            </div>
                            <div className="form-group mt-3 or_text">
                                <span>OR</span>
                            </div>
                            <div className="form-group login_with_btncnrl mt-3">
                                <GoogleOAuthProvider clientId="211892139032-031hag3n8u2u3m1s39nhpjjrauakc32k.apps.googleusercontent.com">
                                    <GoogleAuthLogin onError={handleError}/>
                                </GoogleOAuthProvider>
                                <button type="button" className="login-with-facebook-btn" >
                                    <img src={FBImage} alt="meet-character-1" /> Sign in with Facebook
                                </button>
                                <button type="button" className="login-with-apple-btn" >
                                    <img src={AppleImage} alt="meet-character-1" /> Sign in with Apple
                                </button>
                            </div>
                            <div className="form-group Signup_btn mt-3">
                                <p>Don't have an account?</p>
                                <Link className="btn btn-primary mt-4" to="/subscription">Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
        </div>
    );
}
