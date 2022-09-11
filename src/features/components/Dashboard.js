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
import Latestuser from "../../assets/images/latestuser-img.png";
import { BsFillBellFill, BsShopWindow, BsBriefcase } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { RiBarChartFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import Copyright from "../../utils/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Select from "react-select";

import {
  selectAuth,
  getLatestUsersAsync,
  latestUsersList,
} from "../auth/authSlice";

const Dashboard = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  const userListInfo = useSelector(latestUsersList);
  let history = useHistory();

  useEffect(() => {
    if (authToken) {
      dispatch(getLatestUsersAsync(authToken));
    }
  }, [dispatch, authToken]);

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const viewUsers = () => {
    history.push("/view-all-users");
  };
  return (
    <div>
      <Header />
      <div className={isActive ? "fullwidthdashboard" : null}>
        <section className="main-dashboard position-relative">
          <Sidebar />

          <div className="dashboard-right">
            <h2 className="dashboard-heading">Dashboard</h2>
           
            <div>
              <Row>
                <Col lg="4" md="12">
                  <div className="featured-box">
                    <div className="featured-boxleft">
                      <p className="mb-0">Total Users</p>
                      <h4 className="mb-0">{ userListInfo?.data?.count || ""}</h4>
                    </div>
                    <span className="featured-img">
                      <FaUsers />
                    </span>
                  </div>
                </Col>
                <Col lg="4" md="12">
                  <div className="featured-box">
                    <div className="featured-boxleft">
                      <p className="mb-0">Partnered Retailers</p>
                      <h4 className="mb-0">98</h4>
                    </div>
                    <span className="featured-img">
                      <BsShopWindow />
                    </span>
                  </div>
                </Col>
                <Col lg="4" md="12">
                  <div className="featured-box">
                    <div className="featured-boxleft">
                      <p className="mb-0">Total Referrals</p>
                      <h4 className="mb-0">1320</h4>
                    </div>
                    <span className="featured-img">
                      <CgNotes />
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col lg="6" md="12">
                  <div className="userbox position-relative">
                    <h6 className="dashboard-subheading border-bottom pb-2">
                      Latest users
                    </h6>
                    {Array.isArray &&
                      userListInfo?.data?.user?.slice(0, 5).map((i) => (
                        <div className="d-flex align-items-center border-bottom pt-1 pb-2">
                          <span className="user-latestimg">
                            <img
                              src={i.profile_image || Latestuser}
                              className="img-fluid userimage"
                              alt=""
                            />
                          </span>

                          <div className="latestuser-detail">
                            
                            <h6 className="mb-0">{i.firstname}</h6>
                            <p className="mb-0">
                              {moment(i.createdAt).format("lll")}
                            </p>
                          </div>
                        </div>
                      ))}
                    <a onClick={viewUsers} className="viewall-btn">
                      View All
                    </a>
                  </div>
                </Col>
                <Col lg="6" md="12">
                  <div className="userbox position-relative">
                    <h6 className="dashboard-subheading pb-2">
                      Top referral brands to the date
                    </h6>
                    <Table size="md" className="border-0 usertable">
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Celine</td>
                          <td>1.45</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Chloe</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Hollister</td>
                          <td>1230</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Celine</td>
                          <td>1100</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Chloe</td>
                          <td>980</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>Hollister</td>
                          <td>522</td>
                        </tr>
                      </tbody>
                    </Table>
                    <a href="#" className="viewall-btn">
                      View All
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
