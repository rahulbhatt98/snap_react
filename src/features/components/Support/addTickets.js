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
import addimg from "../../../assets/images/galleryimg.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { FaRegEdit } from "react-icons/fa";
import { RiArrowUpDownLine } from "react-icons/ri";
import { selectAuth } from "../../auth/authSlice";
import SplashScreen from "../../../SplashScreen";


const AddTickets = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <h2 className="dashboard-heading">Add Ticket</h2>
          <Row>
            <Col lg="10" md="12">
              <div className="user-detailbox w-100">
                <Row>
                  <Col lg="8" md="12">
                    <Row>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="#">
                          <Form.Label>Name<span className="colored">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            minLength={5}
                            maxLength={20}
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail1"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail1"
                        >
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=""
                          />
                        </Form.Group>
                      </Col>                   
                      <Col  lg="6" md="12"
                    className="newuserbox pt-0 d-flex flex-column user-box select-userbox">
                    <label className="mb-1">Subject</label>
                    <select>
                        <option> 1</option>
                        <option>2</option>
                    </select>
                    </Col>
                    <Col  lg="6" md="12"
                    className="newuserbox pt-0 d-flex flex-column user-box select-userbox">
                    <label className="mb-1">Type</label>
                    <select>
                        <option> 1</option>
                        <option>2</option>
                    </select>
                    </Col>
                    <Col  lg="6" md="12"
                    className="newuserbox pt-0 d-flex flex-column user-box select-userbox">
                    <label className="mb-1">Status</label>
                    <select>
                        <option> 1</option>
                        <option>2</option>
                    </select>
                    </Col>

                      <Col lg="12" md="12">
                        <Form.Group
                          className="mb-3 d-flex flex-column ad-textarea mt-3"
                          controlId="formBasicEmail2"
                        >
                          <Form.Label className="mb-2">Description<span className="colored">*</span></Form.Label>

                          <textarea
                            maxLength={200}
                            placeholder="Enter Description"
                            className="p-3"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="4" md="12">
                    <div>
                      <span className="single-userimg d-flex flex-column align-items-center">
                        <span className="profile-imguser d-flex flex-column align-items-center">
                          <div className="position-relative userimg-editicon mt-3 advertisment-img d-flex flex-column">
                            <label>Add Image <span className="colored">*</span></label>
                            <img
                              src={addimg || addimg}
                              className="img-fluid singleuserimage mt-3 border-0 rounded-0"
                              alt=""
                            />
                            <a>
                              <FaRegEdit />{" "}
                            </a>
                            <input
                              id="profilePic"
                              type="file"
                              style={{ display: "none" }}
                            />
                          </div>
                        </span>
                      </span>
                    </div>
                  </Col>
                </Row>
                <div className="savechanges-btn d-flex">
              
                  <Button className="brown-btn me-3" >
                    Save
                  </Button>
                  
                  <Button
                    className="brown-btn d-block gray-btn"                    
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

export default AddTickets;
