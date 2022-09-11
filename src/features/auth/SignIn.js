import { useState } from 'react'
import {
    Form,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Copyright from '../../utils/Copyright';
import Logo from '../../assets/images/login-logo.png';
import loginlogo from '../../assets/images/loginnewlogo-dark.png';
// import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";

import { loginAsync, selectAuth } from "./authSlice";
import { useHistory } from "react-router-dom";


const SignIn = () => {
    let history = useHistory();

    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [formState, setFormState] = useState({
        errors: {}
    })
    const dispatch = useDispatch();

    const loginData = {
        "email_phone": emailAddress,
        "password": password,
        "device_type":3

      }
    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        // if (!username) {
        //     formIsValid = false;
        //     errors["username"] = "Username cannot be empty";
        // }
        // if (password.length < 20) {
        //     formIsValid = false;
        //     errors["password"] = "Password should be of 8 digit";
        // }
        if (!emailAddress) {
            formIsValid = false;
            errors["email"] = "Please enter Email or Phone";
        }
        if (!password) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
        }
        setFormState({ errors: errors });
        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (handleValidation()) {
            dispatch(loginAsync({postData:loginData,history}))
          }
          else {
            console.log(formState.errors)
          }
    }
    return (
        <>  

        <div class="signup">
            <div className='container'>
                <div className='signup-box'>
                    <div className='signup-form'>
                        <span className='position-relative'><img src={Logo} alt='' className='img-fluid' /><figure className='userimage position-absolute'><img src={loginlogo} alt='' className='img-fluid' /></figure></span>
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                                <span style={{ color: "red" }}>{formState?.errors["username"]}</span> */}
                                 <Form.Label>Email or phone</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email or phone" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
                                    <span style={{ color: "red" }}>{formState?.errors["email"]}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                                <span style={{ color: "red" }}>{formState?.errors["password"]}</span>
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group> */}
                            <Button variant="primary" className='w-100 btn-black mt-1' type="submit" onClick={handleSubmit}>
                                Login
                            </Button>
                            <Link to="/password-reset" className='text-center already-content mt-3'>
                                Forgot your password?
                            </Link>
                        </Form>
                    </div>
            </div>
                {/* <h6 className='text-center already-content mailrecieved-content mt-4'>
                        Dont't have an account? <Link to="/signup">Sign up</Link>
                </h6> */}
                <div className='text-center copyright-content'>  
                        <Copyright/>
                </div>
            </div>                
            </div>           
        </div>

        </>
    )
}

export default SignIn