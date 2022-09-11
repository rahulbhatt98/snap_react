import { useState } from 'react'
import {
    Form,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Copyright from '../../utils/Copyright';
import validator from 'validator';
import Logo from '../../assets/images/signup-logo.png';
import { registerAsync } from "./authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const SignUp = () => {

    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formState, setFormState] = useState({
        errors: {}
    })
    const dispatch = useDispatch();

    const registerData = {
        "email_phone": emailAddress,
        "username": username,
        "password": password
    }
    // let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    // let passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        if ((!validator.isMobilePhone(emailAddress)) && (!validator.isEmail(emailAddress))) {
            formIsValid = false;
            errors["email"] = "Please enter valid details";
        }
        if(validator.isMobilePhone(emailAddress) && emailAddress<=0){
            formIsValid = false;
            errors["email"] = "Please enter valid mobile details";
        }
        if (password.length < 8) {
            formIsValid = false;
            errors["password"] = "Password should be of 8 digit";
        }
        if (!(password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/))) {
            formIsValid = false;
            errors["password"] = "Password should contain one special character, one number and one letter";
          }

        if((username.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/))){
            formIsValid = false;
            errors["username"] = "Username cannot contain a special characters";
        }
        if (!username) {
            formIsValid = false;
            errors["username"] = "Username cannot be empty";
        }
        if (!password) {
            formIsValid = false;
            errors["password"] = "Please enter Password";
        }
        if (!emailAddress) {
            formIsValid = false;
            errors["email"] = "Please enter Email or Phone";
        }

        setFormState({ errors: errors });
        return formIsValid;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (handleValidation()) {
            dispatch(registerAsync({ postData: registerData, history }))
            // await history.push('/otpmobile')
        }
    }

    return (
        <>
            <div class="signup">
                <div className='container'>
                    <div className='signup-box'>
                        <div className='signup-form'>
                            <span className='position-relative'><img src={Logo} alt='' /><figure className='userimage position-absolute'></figure></span>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email or phone</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email or phone" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
                                    <span style={{ color: "red" }}>{formState?.errors["email"]}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" maxLength={15} placeholder="Enter username" value={username} maxLength="15" onChange={e => setUsername(e.target.value)} />
                                    <span style={{ color: "red" }}>{formState?.errors["username"]}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" maxLength={8} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                                    <span style={{ color: "red" }}>{formState?.errors["password"]}</span>
                                </Form.Group>
                                <Button className='w-100 btn-black mt-2' type="button" onClick={handleSubmit}>
                                    Register
                                </Button>
                                <h6 className='text-center term-content mt-3'>
                                    By registering you agree to the <Link to="/signup">Terms of use</Link>
                                </h6>
                            </Form>
                        </div>
                        <h6 className='text-center mt-4 pt-3 text-dark fw-light already-content'>
                            <b>Already have an account? <Link to="/login">Login</Link></b>
                        </h6>
                    </div>
                    <div>


                    </div>
                    <div>

                    </div>
                    <Copyright />
                </div>
            </div>
        </>
    )
}

export default SignUp