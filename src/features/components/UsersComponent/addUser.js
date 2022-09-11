import React, { useEffect } from "react";
import { useState } from "react";

import {
  Form,
  Button,
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
  Figure,
  Modal,
} from "react-bootstrap";
import Select from "react-select";
import avtar from "../../../assets/images/avtar.png";

import Singleuser from "../../../assets/images/singleuserimg.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { FaRegEdit } from "react-icons/fa";

import { selectAuth, addUsersAsync } from "../../auth/authSlice";

const AddUsers = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  let history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedTypeOption, SetSelectedTypeOption] = useState("");
  const [selectedStatusOption, SetSelectedStatusOption] = useState("");
  const [userPasswordModal, setUserPasswordModal] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [formState, setFormState] = useState({
    errors: {},
  });
  const userTypeOptions = [
    { value: 1, label: "Admin" },
    { value: 2, label: "User" },
  ];

  const userStatusOptions = [
    { value: 0, label: "Suspended" },
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
  ];
  const addUserData = {
    email: emailAddress,
    phone_number: phoneNumber,
    firstname: firstname,
    lastname: lastname,
    role_id: selectedTypeOption.value,
    profile_image: imgData,
    active: selectedStatusOption.value,
    status: true,
    // "password": password
  };
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    // if (firstname.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
    if (!firstname.match(/^[A-Za-z]*$/)) {
      formIsValid = false;
      errors["firstname"] =
        "firstname cannot contain numbers and special characters and Spaces";
    }
    if (!firstname) {
      formIsValid = false;
      errors["firstname"] = "firstname cannot be empty";
    }
    if (!lastname.match(/^[A-Za-z]*$/)) {
      formIsValid = false;
      errors["lastname"] =
        "lastname cannot contain numbers and special characters and Spaces";
    }
    if (!lastname) {
      formIsValid = false;
      errors["lastname"] = "lastname cannot be empty";
    }
    // if (!password) {
    //   formIsValid = false;
    //   errors["password"] = "Please enter Password";
    // }

    if (!emailAddress) {
      formIsValid = false;
      errors["emailAddress"] = "Please enter Email";
    }
    if (!phoneNumber.match(/^[0-9]*$/)) {
      formIsValid = false;
      errors["phoneNumber"] = "Only Numbers allowed";
    }
    if (!phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "Please enter Phone Number";
    }
    if (phoneNumber.length < 10) {
      formIsValid = false;
      errors["phoneNumber"] = "Phone number should be 10 digit number.";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(addUsersAsync({ postData: addUserData, authToken, history }));
    }
  };
  const handleCancel = () => {
    history.push("/view-all-users");
  };

  const resetUserPasswordBtn = () => {
    setUserPasswordModal(userPasswordModal ? false : true);
  };

  const handleTypeStatus = async (e) => {
    SetSelectedTypeOption(e);
  };

  const handleStatusChange = async (e) => {
    SetSelectedStatusOption(e);
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg"
      ) {
        if (e.target.files[0].size <= 1000000) {
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
        } else {
          toast.error("File size should be less than 1 MB.");
        }
      } else {
        toast.error("file not supported");
      }

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleClick = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <h2 className="dashboard-heading">User Details</h2>
          <Row className="active-userbox mt-4 ms-1">
            {/* <Col xs lg="2" md="12">
              <Form.Group className="mb-1">
                <Form.Label>User status</Form.Label>
                <Form.Select id="#">
                  <option>Active</option>
                  <option>Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col> */}
            <Col lg="3" md="12">
              <Form.Group className="mb-1">
                <Form.Label>User Status</Form.Label>
                <Select
                  value={selectedStatusOption}
                  onChange={handleStatusChange}
                  options={userStatusOptions}
                />
              </Form.Group>
            </Col>
            <Col lg="3" md="12">
              <Form.Group className="mb-1">
                <Form.Label>User Type</Form.Label>
                <Select
                  value={selectedTypeOption}
                  onChange={handleTypeStatus}
                  options={userTypeOptions}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="10" md="12">
              <div className="user-detailbox w-100">
                <Row>
                  <Col lg="8" md="12">
                    <Row>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={15}
                            placeholder="Enter Firstname"
                            //  required pattern="/^[a-zA-Z]*$/"
                            // value={firstname.replace(/[^A-Za-z]/gi, "")}
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["firstname"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="formBasicEmail1">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["emailAddress"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="formBasicEmail2">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={15}
                            placeholder="Enter Lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["lastname"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="formBasicEmail3">
                          <Form.Label>Phone Number:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter PhoneNumber"
                            value={phoneNumber}
                            maxLength={10}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["phoneNumber"]}
                          </span>
                        </Form.Group>
                      </Col>
                      {/* <Col lg="6" md="12" className="mt-3"></Col>
                      <Col lg="6" md="12" className="mt-3">
                        <Form.Label className="d-block">Password</Form.Label>
                        <Button className="brown-btn d-block text-end gray-btn" onClick={() => resetUserPasswordBtn()} >
                          Reset User Password
                        </Button>
                      </Col> */}
                    </Row>
                  </Col>
                  <Col lg="4" md="12">
                    <div>
                      <span className="single-userimg">
                        <span className="profile-imguser d-flex flex-column align-items-center">
                          <div className="position-relative userimg-editicon">
                            <img
                              src={imgData || avtar}
                              className="img-fluid singleuserimage mt-3"
                              alt=""
                            />
                            <a>
                              <FaRegEdit onClick={handleClick} />{" "}
                            </a>
                            <input
                              id="profilePic"
                              type="file"
                              ref={hiddenFileInput}
                              style={{ display: "none" }}
                              onChange={onChangePicture}
                            />
                          </div>
                        </span>
                        {/* <Figure>
                          <FaRegEdit />
                        </Figure> */}
                      </span>
                    </div>
                  </Col>
                </Row>
                <div className="savechanges-btn d-flex">
                  <Button className="brown-btn me-3" onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button
                    className="brown-btn d-block gray-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default AddUsers;
