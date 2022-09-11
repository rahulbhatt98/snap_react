import { useState } from 'react'
import userImg from '../../assets/images/download.jpg';
import {
    Form,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Copyright from '../../utils/Copyright';
import Logo from '../../assets/images/lock-screen.png';
import User from '../../assets/images/User.png';
import { changePassAsync } from "./authSlice";
import { selectAuth } from './authSlice'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import loginlogo from '../../assets/images/loginnewlogo-dark.png';


const LockScreen = () => {
    const [password, setPassword] = useState("")
    const [formState, setFormState] = useState({
        errors: {}
    })
    // let user_id =JSON.parse(localStorage.getItem('user')).data.user_id
    const dispatch = useDispatch();
    const userData = useSelector(selectAuth);
    console.log('userData',userData)
    const passwordData = {
        "password": password,
        "user_id": userData?.data?.user_id
    }
    let history = useHistory();

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        if (!password) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
        }
        if (password.length < 8) {
            formIsValid = false;
            errors["password"] = "Password should be of 8 digit";
        }
        setFormState({ errors: errors });
        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (handleValidation()) {
            console.log("form details are correct")
            dispatch(changePassAsync({ postData: passwordData, history }))
        }
    }


    return (

        <>
            <div class="signup">
                <div className='container'>
                    <div className='signup-box'>
                        <div className='signup-form lockscreen-form'>
                        <span className='position-relative'><img src={Logo} alt='' className='img-fluid' /><figure className='userimage position-absolute'><img src={loginlogo} alt='' className='img-fluid' /></figure></span>
                            <div className='text-center user-newcircle mt-5'>
                                <img src={userData?.data?.profile_image || User} className="img-fluid mx-auto d-flex" alt="" />
                                <h6>
                                  {userData?.data?.name || ""}
                                    </h6>
                            </div>
                            <div>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                                        <span style={{ color: "red" }}>{formState?.errors["password"]}</span>
                                    </Form.Group>
                                    <Button variant="dark" type="button" className='btn-black-sm fw-normal text-white ms-auto d-flex justify-content-center py-2 rounded-0 ' onClick={handleSubmit}>
                                        Unlock
                                    </Button>
                                </Form>
                            </div>
                        </div>
                        <h6 className='already-content mailrecieved-content mt-5 text-center'>
                            Not you? <Link to="/login">Sign up</Link> with a diffrent account
                            </h6>
                        <div className='text-center copyright-content'>
                            <Copyright />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LockScreen