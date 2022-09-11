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

import Singleuser from "../../../assets/images/singleuserimg.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { FaRegEdit } from "react-icons/fa";
import avtar from "../../../assets/images/avtar.png";
import { io } from "socket.io-client";

import {
  selectAuth,
  updateUsersAsync,
  getUserListAsync,
  logout,
} from "../../auth/authSlice";

const EditUsers = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  let history = useHistory();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userID, setUserID] = useState("");
  const [pageNumber, setPage] = useState(1);
  const [password, setPassword] = useState("");
  const [userPasswordModal, setUserPasswordModal] = useState(false);

  const [selectedTypeOption, SetSelectedTypeOption] = useState("");
  const [selectedOption, SetSelectedOption] = useState("");
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

  const sOptions = [
    { value: 0, label: "Suspended" },
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
  ];

  useEffect(() => {
    let row = props?.location?.state?.row;
    // const socket = io("https://stgn.appsndevs.com", {
    //   path: "/snapcident/socket.io",
    //   query: {
    //     user_id: row?._id,
    //   },
    // });
    // console.log("socket", socket);
 
    if (props?.location?.state?.row) {
      setUserID(row?._id);
      setUserName(row?.firstname);
      setLastName(row?.lastname);
      setUserEmail(row?.email);
      setUserPhone(row?.phone_number);
      setUserImage(row.profile_image);
      SetSelectedOption(
        sOptions.filter((i) => (i.value === row?.active) == 1)[0] || ""
      );
      SetSelectedTypeOption(
        userTypeOptions.filter((i) => (i.value === row?.role_id) == 1)[0] || ""
      );
    }
  }, []);

  const handleChange = async (e) => {
    SetSelectedOption(e);
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    // if (userName.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
    if (!userName.match(/^[A-Za-z]*$/)) {
      formIsValid = false;
      errors["userName"] =
        "FirstName cannot contain numbers special characters and Spaces";
    }
    if (!userName) {
      formIsValid = false;
      errors["userName"] = "FirstName cannot be empty";
    }
    if (!lastName.match(/^[A-Za-z]*$/)) {
      formIsValid = false;
      errors["lastName"] =
        "lastName cannot contain numbers special characters and Spaces";
    }
    if (!lastName) {
      formIsValid = false;
      errors["lastName"] = "lastName cannot be empty";
    }

    if (!userEmail) {
      formIsValid = false;
      errors["userEmail"] = "Please enter Email";
    }

    if (!userphone.match(/^[0-9]*$/)) {
      formIsValid = false;
      errors["userphone"] = "Only Numbers allowed";
    }

    if (!userphone) {
      formIsValid = false;
      errors["userphone"] = "Please enter Phone Number";
    }
    if (userphone.length < 10) {
      formIsValid = false;
      errors["userphone"] = "Phone number should be 10 digit number.";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };
  const updateUserData = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      await dispatch(
        updateUsersAsync({
          postData: {
            firstname: userName,
            user_id: userID,
            active: selectedOption.value,
            lastname: lastName,
            email: userEmail,
            phone_number: userphone,
            role_id: selectedTypeOption.value,
            profile_image: imgData || userImage,
            password: password,
          },
          authToken,
          history,
        })
      );
      await dispatch(getUserListAsync({ pageNumber, authToken }));
    }
  };

  const passwordValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!lastName) {
      formIsValid = false;
      toast.error("LastName cannot be empty");
    }
    if (!userName) {
      formIsValid = false;
      toast.error("FirstName cannot be empty");
    }
    if (!userphone) {
      formIsValid = false;
      toast.error("Please enter Phone Number");
    }
    if (!userEmail) {
      formIsValid = false;
      toast.error("Please enter Email");
    }
    if (password.length < 8) {
      formIsValid = false;
      errors["password"] = "Enter Passowrd requires minimum 8 characters.";
    }

    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
      )
    ) {
      formIsValid = false;
      errors["password"] =
        "Password requires minimum 8 characters contain one special character, one number and one letter";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };
  const handleCancel = () => {
    history.push("/view-all-users");
  };

  const updateUserPasData = async (e) => {
    e.preventDefault();
    if (passwordValidation()) {
      await dispatch(
        updateUsersAsync({
          postData: {
            firstname: userName,
            user_id: userID,
            active: selectedOption.value,
            lastname: lastName,
            email: userEmail,
            phone_number: userphone,
            role_id: selectedTypeOption.value,
            profile_image: imgData || userImage,
            password: password,
          },
          authToken,
          history,
        })
      );
      await dispatch(getUserListAsync({ pageNumber, authToken }));
    }
  };
  const handleTypeStatus = async (e) => {
    SetSelectedTypeOption(e);
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
    //   reader.addEventListener("load", () => {
    //     setImgData(reader.result);
    //   });
    //   reader.readAsDataURL(e.target.files[0]);
    // }
  };

  const handleClick = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current.click();
    }
  };

  const resetUserPasswordBtn = () => {
    // setUserID()
    setUserPasswordModal(userPasswordModal ? false : true);
  };

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <h2 className="dashboard-heading">Edit User Details</h2>
          <Row className="active-userbox mt-2 ms-1">
            <Col lg="3" md="12">
              <Form.Group className="mb-1">
                <Form.Label>User Status</Form.Label>
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={sOptions}
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
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail4"
                        >
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={15}
                            placeholder="Enter Firstname"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["userName"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail5"
                        >
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["userEmail"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail6"
                        >
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={15}
                            placeholder="Enter Lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["lastName"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail7"
                        >
                          <Form.Label>Phone Number:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter PhoneNumber"
                            maxLength={10}
                            value={userphone}
                            onChange={(e) => setUserPhone(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["userphone"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12" className="mt-3"></Col>
                      <Col lg="6" md="12" className="mt-3">
                        <Form.Label className="d-block">Password</Form.Label>
                        <Button
                          className="brown-btn d-block text-end gray-btn"
                          onClick={() => resetUserPasswordBtn()}
                        >
                          Reset User Password
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="4">
                    <div className="my-3 user-picsec d-flex flex-column align-items-center">
                      <div className="position-relative userimg-editicon">
                        <img
                          src={imgData || userImage || avtar}
                          className="img-fluid"
                          alt=""
                        />
                        <a>
                          <FaRegEdit onClick={handleClick} />
                        </a>
                        <input
                          id="profilePic"
                          className="profile-secpic"
                          type="file"
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                          onChange={onChangePicture}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="savechanges-btn d-flex">
                  <Button className="brown-btn me-3" onClick={updateUserData}>
                    Save Changes
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
          <Modal
            show={userPasswordModal}
            onHide={resetUserPasswordBtn}
            size="md"
          >
            <Modal.Header closeButton>
              <Modal.Title>User Password </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Row>
                  <Col lg="8" className="mt-3">
                    <Form.Label>Enter New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="error-msg" style={{ color: "red" }}>
                      {formState?.errors["password"]}
                    </span>
                  </Col>
                </Row>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={resetUserPasswordBtn}>
                Close
              </Button>
              <Button className="brown-btn me-3" onClick={updateUserPasData}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default EditUsers;
