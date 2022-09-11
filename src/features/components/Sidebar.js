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
import { BsFillBellFill, BsShopWindow, BsBriefcase } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { RiBarChartFill, RiAdvertisementLine } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { HiOutlineMenu } from "react-icons/hi";
import leftarrow from "../../assets/images/leftarrow.png";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";

const Sidebar = () => {
  let history = useHistory();

  const viewUsers = () => {
    history.push("/view-all-users");
  };

  const viewDashboard = () => {
    history.push("/dashboard");
  };

  const viewRetailers = () => {
    history.push("/view-all-retailers");
  };

  const viewNotifications = () => {
    history.push("/view-all-notifications");
  };

  const sidebarCollapsed = localStorage.getItem("fullwidthdashboard");
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

  const handleToggler = () => {
    if (isExpanded) {
      setIsExpanded(false);
      localStorage.setItem("fullwidthdashboard", true);
      document.body.classList.add("fullwidthdashboard");
      return;
    }
    setIsExpanded(!isExpanded);
    document.body.classList.remove("fullwidthdashboard");
    localStorage.removeItem("fullwidthdashboard");
  };

  const ticketRedirect = () => {
    window.open(
      "https://seasia.freshdesk.com/a/tickets/filters/all_tickets",
      "_blank"
    );
  };
  return (
    <div>
      {/* <section className='main-dashboard position-relative'> */}
      <div className="dashboard-left">
        <a href="#" className="tp-admintoggle" onClick={handleToggler}>
          {" "}
          <HiOutlineMenu className="img-fluid position-fixed img-leftarrow" />
        </a>

        <ul className="m-0 p-0 item-listing">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "route-link active" : "route-link"
              }
              to="/dashboard"
            >
              <AiOutlineHome />
              <span className="userlist">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "route-link active" : "route-link"
              }
              to="/view-all-users"
            >
              <FaUsers />
              <span id="userlistalert" className="userlist">
                Users
              </span>
            </NavLink>
          </li>
          {/* <li><a onClick={viewRetailers}> */}
          <li className="disabled">
            <a>
              <BsShopWindow />
              <span className="userlist">Retailers</span>
            </a>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "route-link active" : "route-link"
              }
              to="/view-all-notifications"
            >
              <BsFillBellFill />
              <span className="userlist">Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "route-link active" : "route-link"
              }
              to="/view-all-advertisment"
            >
              <RiAdvertisementLine />
              <span className="userlist">Advertisement</span>
            </NavLink>
          </li>
          <li className="support-listing">
            {/* <NavLink
              className={({ isActive }) =>
                isActive ? "route-link active" : "route-link"
              }          
            //  to={{ pathname:  window.open(
            //     "https://seasia.freshdesk.com/a/tickets/filters/all_tickets",
            //     "_blank"
            //   )}}
           to="/support"
            >
              <BsBriefcase />
              <span className="userlist">Support</span>
            </NavLink> */}

            <a
              className={({ isActive }) =>
                isActive ? "route-link active" : "route-link"
              }
              onClick={ticketRedirect}
            >
              {" "}
              <BsBriefcase />
              <span className="userlist">Support</span>
            </a>
          </li>
          <li>
            <a href="#">
              <RiBarChartFill />
              <span className="userlist">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <CgNotes />
              <span className="userlist">Content</span>
            </a>
          </li>
        </ul>
      </div>
      {/* </section> */}
    </div>
  );
};

export default Sidebar;
