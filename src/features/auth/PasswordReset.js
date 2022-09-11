import { useState } from 'react'
import {
    Badge,
    Form,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Copyright from '../../utils/Copyright';
import validator from 'validator';
import Logo from '../../assets/images/resetlogo.jpg';
import { ForgetPassAsync } from "./authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginlogo from '../../assets/images/loginnewlogo-dark.png';


const PasswordReset = () => {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [formState, setFormState] = useState({
        errors: {}
    })

    const dispatch = useDispatch();
    const forgetData = {
        "email_phone": email,
    }
    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            errors["email"] = "Please enter email or phone information";
        }
        if ((!validator.isMobilePhone(email)) && (!validator.isEmail(email))) {
            formIsValid = false;
            errors["email"] = "Please enter valid details";
        }

        setFormState({ errors: errors });
        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (handleValidation()) {
            dispatch(ForgetPassAsync({ postData: forgetData, history }))
        }
    }
    return (
        <>
             <div class="signup">
                    <div className='container'>
                        <div className='signup-box'>
                                <div className='signup-form'>
                                <span className='position-relative'><img src={Logo} alt='' className='img-fluid' /><figure className='userimage position-absolute'><img src={loginlogo} alt='' className='img-fluid' /></figure></span>
                                    <div className='mt-5 text-center'>
                                        <Badge bg="warning" text="dark" className='mt-5 py-3 px-4 fw-normal yellow-badge'>
                                            Complete field and instructions will be sent to you!
                                        </Badge>{' '}
                                    </div>
                                    <div>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Email or phone" value={email} onChange={e => setEmail(e.target.value)} />
                                            <span style={{ color: "red" }}>{formState?.errors["email"]}</span>
                                        </Form.Group>
                                    </Form>
                                        <Button variant="dark" onClick={handleSubmit} className='btn-black-sm fw-normal text-white ms-auto d-flex justify-content-center py-1 rounded-0 me-4 mb-5'>Reset</Button>{' '}
                                    </div>
                                <div>                          
                        </div>
                    </div>
                             <h6 className='already-content mailrecieved-content mt-4 text-center'>
                                 Remember your password? <Link to="/login">Sign in</Link>
                            </h6>
                            <div className='text-center copyright-content'>  
                                <Copyright/>
                            </div>
                         </div>
                    </div>
            </div>
        </>
    )
}

export default PasswordReset