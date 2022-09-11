import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import otpImg from '../../assets/images/download.jpg';
import Copyright from '../../utils/Copyright';
// import { FaCreativeCommons } from "@react-icons/all-files/fa/FaCreativeCommons";
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { selectAuth } from './authSlice'
import { useSelector } from "react-redux";

const OtpMobile = () => {
  const [otp, setOtp] = useState("")
  const userData = useSelector(selectAuth);
  const handleChange = (otp) => {
    setOtp(otp)
  }
  const user = localStorage.getItem("userData")

  return (
    <>
      <div class="signup">
        <div className='container'>
          <div className='signup-box'>
            <div className='signup-form otp-box'>
              <div>
                <figure className='userimage mx-auto'>
                  {/* <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6666 0.333313H3.33329C1.86129 0.333313 0.666626 1.52798 0.666626 2.99998V19C0.666626 20.472 1.86129 21.6666 3.33329 21.6666H24.6666C26.1386 21.6666 27.3333 20.472 27.3333 19V2.99998C27.3333 1.52798 26.1386 0.333313 24.6666 0.333313ZM24.6666 6.59998L13.9999 13.712L3.33325 6.59998V3.39598L13.9999 10.5066L24.6666 3.39598V6.59998Z" fill="#556EE6"/>
              </svg> */}
                  <MdOutlinePhoneIphone />
                </figure>
                {/* <img src={otpImg} className="img-fluid otp-img" alt="" /> */}

              </div>
              <h6 className='otp-heading text-center mt-5'>
                Please enter the 4 digit code sent to <b>example@abc.commmmm</b>
              </h6>
              <div className='otp-input'>
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={4}
                  separator={<span></span>}
                  className='opt-innerbox'
                />
              </div>
              <Button variant="" className='btn-black text-white mx-auto d-flex justify-content-center mt-4 px-4 py-2 br-0 rounded-0'>Confirm</Button>{' '}
              <div>
              </div>
            </div>
            <h6 className='text-center already-content mt-5'>
              Didn't receive an email? <Link href="/signup">Resend</Link>
            </h6>
            <div className='text-center'>
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtpMobile