import React, { useEffect, useState } from "react";

import {
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
  Figure,
  Button,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";

import supportimg from "../../../assets/images/supportimages.png";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { BiExport } from "react-icons/bi";
import { FiPhone } from "react-icons/fi";
import { FaRegCaretSquareLeft } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { BsSquareFill } from "react-icons/bs";
import { GrFormSearch } from "react-icons/gr";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineAutoGraph,
} from "react-icons/md";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Switch from "react-switch";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { getTicketsListing, supportData } from "../../reducers/supportReducer";

import { selectAuth } from "../../auth/authSlice";

const Support = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  const ticketData = useSelector(supportData);
  let history = useHistory();
  useEffect(() => {
    if (authToken) {
      dispatch(getTicketsListing());
    }
  }, []);

  
  const addNewTicket = () => {
    history.push("/add-new-tickets");
  };

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative support-dashboard">
        <Sidebar />

        <div className="dashboard-right">
          <div className="d-flex align-items-center mt-2">
            <h2 className="dashboard-heading">Support</h2>
            <Button  onClick={addNewTicket} className="brown-btn ms-4">
              <AiOutlinePlusCircle className="me-2" />
              New Ticket
            </Button>
          </div>

          <div className="support-uppersec shadow w-100 py-3 px-4 mt-3">
            <Row>
              <Col lg="6">
                <div className="support-uppersec-left d-flex align-items-center">
                  <Form.Group className="me-3">
                    <Form.Check type="checkbox" id="disabledFieldsetCheck" />
                  </Form.Group>
                  <Form.Group className="d-flex align-items-center">
                    <Form.Label className="mb-0 me-2">Sort by:</Form.Label>
                    <Form.Select
                      id=""
                      className="border-0 support-select fw-bold px-1"
                    >
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
              <Col lg="6">
                <div className="support-uppersec-right d-flex align-items-center justify-content-end">
                  <Form.Group className="d-flex align-items-center">
                    <Form.Label className="mb-0 me-1">Layout:</Form.Label>
                    <Form.Select
                      id=""
                      className="border-0 support-select layout-select fw-bold px-1"
                    >
                      <option>Card View</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <span className="position-relative">
                    <Button
                      variant="primary"
                      type="submit"
                      className="shadow btn-light export-btn"
                    >
                      Export
                    </Button>
                    <BiExport className="position-absolute exportsign" />
                  </span>
                  <Form.Group>
                    <Form.Label className="mb-0 me-1 px-3">
                      1 - 30 of 98
                    </Form.Label>
                  </Form.Group>
                  <span>
                    <Button
                      variant="light"
                      type="submit"
                      className="shadow btn-light px-2 py-1"
                    >
                      <MdOutlineChevronLeft />
                    </Button>
                    <Button
                      variant="light"
                      type="submit"
                      className="shadow btn-light px-2 py-1 ms-1"
                    >
                      <MdOutlineChevronRight />
                    </Button>
                  </span>
                  <span>
                    <Button
                      variant="light"
                      type="submit"
                      className="shadow btn-light px-2 py-1 ms-2"
                    >
                      <FaRegCaretSquareLeft />
                    </Button>
                  </span>
                </div>
              </Col>
            </Row>
          </div>

          <div className="support-lowersec mt-2">
            <Row>
              <Col lg="9">
                <div className="support-lowersec-left">
                  {Array.isArray &&
                    ticketData?.map((i) => (
                      <div className="support-box active shadow p-2 bg-white px-2 d-flex align-items-center justify-content-between mb-2 mt-2">
                        <Row className="align-items-center w-100">
                          <Col lg="9">
                            <div className="d-flex align-items-center">
                              <Form.Group className="ms-3">
                                <Form.Check
                                  type="checkbox"
                                  id="disabledFieldsetCheck"
                                />
                              </Form.Group>
                              <div className="shadow supportimgbox ms-3">
                                <img
                                  src={supportimg}
                                  className="img-fluid selectusrimg"
                                  alt=""
                                />
                              </div>
                              <div className="support-content ms-4 mt-2">
                                <h6 className="mb-0">{i?.subject}</h6>
                                <p className="mb-0">
                                  <span>
                                    <FiPhone className="me-3" />
                                    Sheen S Adrian -
                                  </span>{" "}
                                  Agent responded an hour ago - due in 13 days
                                </p>
                              </div>
                            </div>
                          </Col>
                          <Col lg="3">
                            <div className="support-type d-flex flex-column align-items-end">
                              <span>
                                <Form.Group className="support-severity d-flex align-items-center">
                                  <span>
                                    <BsSquareFill className="squarebox ms-1" />
                                  </span>
                                  <Form.Select
                                    id=""
                                    className="border-0 fw-bold px-1 w-100 ms-2"
                                  >
                                    <option>Medium</option>
                                    <option>Last Modified</option>
                                    <option>Last Modified</option>
                                    <option>Last Modified</option>
                                  </Form.Select>
                                </Form.Group>
                              </span>
                              <span>
                                <Form.Group className="support-severity d-flex align-items-center">
                                  <span>
                                    <RiUserAddLine />
                                  </span>
                                  <Form.Select
                                    id=""
                                    className="border-0 fw-bold px-1 w-100 ms-2"
                                  >
                                    <option>Support/Riya Sebas...</option>
                                    <option>Last Modified</option>
                                    <option>Last Modified</option>
                                    <option>Last Modified</option>
                                  </Form.Select>
                                </Form.Group>
                              </span>
                              <span>
                                <Form.Group className="support-severity d-flex align-items-center">
                                  <span>
                                    <MdOutlineAutoGraph />
                                  </span>
                                  <Form.Select
                                    id=""
                                    className="border-0 fw-bold px-1 w-100 ms-2"
                                  >
                                    <option>Waiting on Thirdparty</option>
                                    <option>Last Modified</option>
                                    <option>Last Modified</option>
                                    <option>Last Modified</option>
                                  </Form.Select>
                                </Form.Group>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}

               
               
                </div>
              </Col>
              <Col lg="3">
                <div
                  className="support-lowersec-right shadow p-2 bg-white mt-2"
                  id="style-4"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 mt-2">Filter</h6>
                    <Button
                      variant="light"
                      type="submit"
                      className="shadow btn-light p-1 fs-3"
                    >
                      <GrFormSearch className="support-search" />
                    </Button>
                  </div>
                  <Form.Group className="d-flex align-items-start mt-2 flex-column">
                    <Form.Label className="mb-1 me-2">Agents</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-2 flex-column">
                    <Form.Label className="mb-1 me-2">Group</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-3 flex-column">
                    <Form.Label className="mb-1 me-2">Created</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-3 flex-column">
                    <Form.Label className="mb-1 me-2">Due By</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-3 flex-column">
                    <Form.Label className="mb-1 me-2">Skill</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-3 flex-column">
                    <Form.Label className="mb-1 me-2">Status</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-3 flex-column">
                    <Form.Label className="mb-1 me-2">Priority</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-3 flex-column">
                    <Form.Label className="mb-1 me-2">Priority</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="d-flex align-items-start mt-3 flex-column">
                    <Form.Label className="mb-1 me-2">Priority</Form.Label>
                    <Form.Select
                      id=""
                      className="support-select layout-select px-1"
                    >
                      <option>Any</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                      <option>Last Modified</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
