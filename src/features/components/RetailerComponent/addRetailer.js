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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Singleuser from "../../../assets/images/singleuserimg.png";
import { FaRegEdit } from "react-icons/fa";
import validator from "validator";
import { selectAuth, addRetailerAsync } from "../../auth/authSlice";

const AddRetailers = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  let history = useHistory();
  const [firstname, setFirstName] = useState("");
  const [referralId, setReferralID] = useState("");
  const [formState, setFormState] = useState({
    errors: {},
  });
  const retailerData = {
    name: firstname,
    referral_id: referralId,
  };
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (firstname.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/)) {
      formIsValid = false;
      errors["firstname"] = "firstname cannot contain a special characters";
    }
    if (!firstname) {
      formIsValid = false;
      errors["firstname"] = "firstname cannot be empty";
    }
    if (!referralId) {
      formIsValid = false;
      errors["referralId"] = "Please enter Referral Number";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(
        addRetailerAsync({ postData: retailerData, authToken, history })
      );
    }
  };

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <h2 className="dashboard-heading">Retailers Detail</h2>
          <Row className="active-userbox mt-4 ms-1"></Row>
          <Row>
            <Col lg="8" md="12">
              <div className="user-detailbox w-100 retailer-detailbox">
                <Row>
                  <Col xs lg="7" md="12">
                    <Row>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            maxLength={15}
                            placeholder="Enter username"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["firstname"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Referral:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Referral"
                            value={referralId}
                            onChange={(e) => setReferralID(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["referralId"]}
                          </span>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="savechanges-btn d-flex retailer-savchangesbtn">
                  <Button className="brown-btn me-3" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                  <Button className="brown-btn d-block gray-btn">Cancel</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default AddRetailers;
