import React, { useEffect, useState } from "react";

import {
  Button,
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
  Figure,
  Check,
} from "react-bootstrap";
import Select from "react-select";

import updownarrow from "../../../assets/images/updownarrow.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { FaRegEdit } from "react-icons/fa";
import { RiArrowUpDownFill } from "react-icons/ri";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import {
  selectAuth,
  getNotificationsAsync,
  notificationsList,
  updateNotificationsAsync,
} from "../../auth/authSlice";

const Notifications = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  const notificationsData = useSelector(notificationsList);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (authToken) {
      dispatch(getNotificationsAsync({ authToken }));
    }
  }, [dispatch, authToken]);

  
  const administratorsColumns = [
    {
      dataField: "",
      text: "When",
      sort: true,
      formatter: (col, row) => {
        return row?.statement;
      },
    },
    {
      dataField: "",
      text: "Send Grid template",
      sort: true,
      formatter: (col, row) => {
        return (
          <Form.Select aria-label="Default select example">
            <option>{row?.options}</option>
          </Form.Select>
        );
      },
    },
    {
      dataField: "",
      text: "Manage",
      sort: false,
      formatter: (col, row) => {
        return (
          <>
            <Switch
              checked={row?.active === 1}
              uncheckedIcon={false}
              checkedIcon={false}
              onChange={() => updateData(row)}
              onColor={"#14CE95"}
              className="notify-pasword"
            />
          </>
        );
      },
    },
  ];
  const updateData = async (row) => {
    await dispatch(
      updateNotificationsAsync({
        postData: {
          active: !(row?.active == 1) ? 1 : 0,
          notification_id: row?._id,
        },
        authToken,
      })
    );
    await dispatch(getNotificationsAsync({ authToken }));
  };

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <h2 className="dashboard-heading">Notifications</h2>

          <Row className="mt-3">
            <Col lg="12" md="12">
              <div className="userbox notification-box position-relative add-newuser">
                <h6 className="mb-3">
                  These email notifications are sent to all user types
                </h6>

                {/* <BootstrapTable
                  condensed
                  hover
                  keyField="id"
                  responsive={true}
                  bordered={true}
                  data={notificationsData?.data?.notificationAdmin || []}
                  columns={columns}
                /> */}

                {/* <h6 className="mt-5 mb-3">
                  These email notifications are sent to administrators only
                </h6> */}

                <BootstrapTable
                  condensed
                  hover
                  keyField="id"
                  responsive={true}
                  bordered={true}
                  data={notificationsData?.data?.notificationUser || []}
                  columns={administratorsColumns}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
