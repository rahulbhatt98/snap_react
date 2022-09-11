import Logo from '../../assets/images/mail-send.png';
import {
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignupVerified = () => {
    return (
        <>  
            <div class="signup">
                <div className='container'>
                     <div className='signup-box'>
                        <div className='signup-form otp-box'>
                                <div>
                                    <figure className='userimage mx-auto'><img src={Logo} className="img-fluid w-20px" alt="" /></figure>
                                </div>
                                <div>
                                    <p className='otp-heading text-center mt-5 mb-4'>
                                        At vero eos et accusamus et iusto odio dignissimos
                                        ducimus qui blanditiis praesentium voluptatum deleniti
                                        atque corrupti quos dolores et
                                    </p>
                                </div>
                                <div>
                                    <Link to="/" variant="primary" type="submit" className='btn-black text-white mx-auto d-flex justify-content-center mt-2 px-4 py-2 br-0 rounded-0'>
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>    
                </div>
            </div>
        </>
    )
}

export default SignupVerified