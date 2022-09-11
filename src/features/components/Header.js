import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import headerlogo from "../../assets/images/headerlogo.png";
import shrinklogo from "../../assets/images/shrinklogo.png";
import setting from "../../assets/images/settings.png";
import leftarrow from "../../assets/images/leftarrow.png";
import bell from "../../assets/images/bell.png";
import User from "../../assets/images/User.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";

import {
  logout,
  selectAuth,
  getUserListAsync,
  userList,
  latestUsersList,
  getLoginUserStatusAsync,
  loginStatus,
} from "../auth/authSlice";


const Header = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  let history = useHistory();
  const [isActive, setActive] = useState(false);
  const userListInfo = useSelector(latestUsersList);
  const updatedStatus = useSelector(loginStatus);
  const [status, setStatus] = useState(true);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const viewUsers = () => {
    history.push("/view-all-users");
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    localStorage.removeItem("user");
    toast.success("user logged out successfully!");
    history.push("/login");
  };

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);

  useEffect(() => {
    let user_id = auth?.data?.userData?._id;
    setInterval(() => {
      if (authToken) {
        dispatch(
          getLoginUserStatusAsync({ postData: { user_id }, authToken, history })
        );
      }
    }, 10000);
   
    
  }, [dispatch, authToken]);

  if (
    updatedStatus?.data?.user_data?.active == 0 ||
    updatedStatus?.data?.user_data?.active == 2
  ) {
    // alert("Your account has been Suspended by admin")
    dispatch(logout());
    localStorage.clear();
    localStorage.removeItem("user");
    toast.error("Your account has been Suspended!");
  
  }

  return (
    <div>
      <header>
        <div className="snap-dheader d-flex align-items-center justify-content-between position-fixed w-100">
          <div className="dheader-logo d-flex align-items-center position-relative">
            {/* <a href="#" className='tp-admintoggle'  onClick={toggleClass} > <img src={leftarrow} className="img-fluid position-absolute img-leftarrow" alt="" /></a> */}
            <span>
              <img src={headerlogo} className="img-fluid sidebarlogo" alt="" />
              <img src={shrinklogo} className="img-fluid shrinklogo" alt="" />
            </span>
          </div>
      
          {status ?     <div className="dheader-content d-flex align-items-center">
            <a href="#" className="mx-1">
              <img src={setting} className="img-fluid loading" alt="" />
            </a>
            <a href="#" className="position-relative mx-1">
              <img src={bell} className="img-fluid bell" alt="" />
              <span className="total-items position-absolute">1</span>
            </a>
            <img
              src={auth?.data?.userData?.profile_image || User}
              className="img-fluid ms-3 userimage"
              alt=""
            />
            <Dropdown className="ms-3">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="shadow-0"
              >
                {auth?.data?.userData
                  ? `${(auth?.data?.userData?.username)
                      .charAt(0)
                      .toUpperCase()}${(auth?.data?.userData?.username).slice(
                      1
                    )}`
                  : ""}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div> : toast.error("Internet Connection Lost")}

        </div>
      </header>
    </div>
  );
};

export default Header;
