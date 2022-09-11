import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Dropdown,
  Accordion,
  Row,
  Col,
  Table,
  Pagination,
  Modal,
} from "react-bootstrap";
import Latestuser from "../../../assets/images/latestuser-img.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../../utils/Toast";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { AiOutlineSearch } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import Select from "react-select";
import { FaRegEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import EditUsers from "./editUser";
import { useParams } from "react-router-dom";
import avtar from "../../../assets/images/avtar.png";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { DebounceInput } from "react-debounce-input";
import SplashScreen from "../../../SplashScreen";
// import Form from 'react-bootstrap/Form'

import {
  selectAuth,
  getUserListAsync,
  userList,
  updateUsersAsync,
  searchUsersAsync,
  getUserStatusAsync,
  status,
} from "../../auth/authSlice";

const Users = () => {
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userphone, setUserPhone] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userID, setUserID] = useState("");
  const [firstname, setFirstName] = useState("");
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;

  const userListInfo = useSelector(userList);
  const [pageNumber, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchUsers, setSearchUsers] = useState("");
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(true);

  let history = useHistory();
  const [formState, setFormState] = useState({
    errors: {},
  });
  const [selectedOption, SetSelectedOption] = useState("");
  const [selectedStatusOption, SetSelectedStatusOption] = useState("");
  const [selectedTypeOption, SetSelectedTypeOption] = useState("");

  const [updateUserModal, setupdateUserModal] = useState(false);
  const [items] = React.useState([
    {
      label: "All",
      value: 3,
    },
    { label: "Admin", value: 1 },
    { label: "User", value: 2 },
  ]);
  const [statusItems] = React.useState([
    { value: 3, label: "All" },
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
    { value: 4, label: "Suspended" },
  ]);
  const statusOptions = [
    { value: 1, label: "Active" },
    { value: 2, label: "Archived" },
    { value: 3, label: "All" },
    { value: 4, label: "Suspended" },
  ];
  const sOptions = [
    { value: 0, label: "Suspended" },
    { value: 1, label: "Active" },
  ];
  const userTypeOptions = [
    { value: 3, label: "All" },
    { value: 1, label: "Admin" },
    { value: 2, label: "User" },
  ];
  const addUser = () => {
    history.push("/add-user");
  };

  const columns = [
    {
      dataField: "profile_image",
      sort: true,
      formatter: (col, row) => {
        if (col) return <img alt="" src={col} />;
        else {
          return <img alt="" src={avtar} />;
        }
      },
    },

    {
      dataField: "firstname",

      formatter: (col, row) => {
        if (col) return col + " " + row.lastname;
      },
      text: "Name",
      sort: true,
      // headerStyle: (colum, colIndex) => ({ width: '50px', textAlign: 'center' })
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "role_id",
      text: "Type",
      formatter: (col, row) => {
        if (col == 1) {
          return "Admin";
        }
        if (col == 2) {
          return "User";
        }
        if (col == 3) {
          return "Retailer";
        }
      },
    },
    {
      dataField: "active",
      text: "Status",
      sort: false,
      formatter: (col, row) => {
        if (col == 1) {
          return <span className="active-btn"> Active</span>;
        }
        if (col == 0) {
          return <span className="inactive-btn">Suspended </span>;
        }
        if (col == 2) {
          return <span className="inactive-btn">Archived </span>;
        }
      },
    },
    {
      dataField: "",
      text: "Action",
      sort: false,
      // headerStyle: (colum, colIndex) => ({ width: '10%', textAlign: 'left' }),
      formatter: (col, row) => {
        return (
          <>
            <a className="edit-use">
              <FaRegEdit onClick={() => updateUserModalBtn(row)} />
            </a>
          </>
        );
      },
    },
  ];

  const updateUserModalBtn = (row) => {
    // let user_id = row?._id;
    // setUserID(row?._id);
    // setUserName(row?.firstname);
    // setLastName(row?.lastname);
    // setUserEmail(row?.email);
    // setUserPhone(row?.phone_number);
    // setUserImage(row.profile_image);
    // SetSelectedOption(
    //   sOptions.filter((i) => (i.value === row?.active) == 1)[0] || ""
    // );
    // setupdateUserModal(updateUserModal ? false : true);

    history.push({
      pathname: "/edit-users",
      // search: '?update=true',  // query string
      state: {
        // location state
        row,
        // update: true,
      },
    });
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
    setFormState({ errors: errors });
    return formIsValid;
  };

  const updateUserData = async (e) => {
    e.preventDefault();
    // if (handleValidation()) {
    await dispatch(
      updateUsersAsync({
        postData: {
          firstname: userName,
          user_id: userID,
          active: selectedOption.value,
          lastname: lastName,
          email: userEmail,
          phone_number: userphone,
          profile_image: imgData || userImage,
        },
        authToken,
      })
    );
    // }
    setupdateUserModal(false);
    await dispatch(getUserListAsync({ pageNumber, authToken }));
  };

  const handleChange = async (e) => {
    SetSelectedOption(e);
  };
  const handleChangeStatus = async (e) => {
    SetSelectedStatusOption(e.target.value);
    setLoading(true);
  };
  const handleTypeStatus = async (e) => {
    SetSelectedTypeOption(e.target.value);
    setLoading(true);
  };
  const handleOnUserSearch = (e) => {
    setSearchUsers(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000);
    if (authToken) {
      let postData1 = {
        sort: -1,
        pageNumber: pageNumber,
        active: selectedStatusOption
          ? selectedStatusOption == 4
            ? "0"
            : selectedStatusOption
          : "",
      };
      if (searchUsers) {
        postData1.searchParam = searchUsers || "";
      }
      if (selectedTypeOption) {
        postData1.role_id = selectedTypeOption || " +''+";
      }
      dispatch(
        getUserStatusAsync({
          postData: postData1,
          authToken,
        })
      );
    }

    // if (authToken && searchUsers == "") {
    //   dispatch(getUserListAsync({ page, authToken }));
    // }
  }, [
    dispatch,
    authToken,
    pageNumber,
    searchUsers,
    selectedStatusOption,
    selectedTypeOption,
  ]);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <div className="d-flex align-items-center mt-2">
            <h2 className="dashboard-heading">Users</h2>
            <Button onClick={addUser} className="brown-btn ms-4">
              <FiUserPlus className="me-2" />
              Add New User
            </Button>
          </div>
          <div className="user-box mt-3">
            <Row>
              <Col lg="12" md="12">
                <Row>
                  <Col lg="5" md="12">
                    <Form.Group
                      className="mb-3 position-relative searchbox d-flex flex-column user-box new-searchbox"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Search</Form.Label>
                      <DebounceInput
                        minLength={2}
                        debounceTimeout={300}
                        value={searchUsers}
                        className="mt-2"
                        onChange={(e) => {
                          handleOnUserSearch(e, "search");
                        }}
                      />
                      <AiOutlineSearch className="position-absolute search-icon" />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                  <Col
                    lg="2"
                    md="12"
                    className="newuserbox pt-0 d-flex flex-column"
                  >
                    <label className="mb-1">Filter by user type</label>

                    <select onChange={handleTypeStatus}>
                      {items.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </Col>

                  <Col
                    lg="2"
                    md="12"
                    className="newuserbox pt-0 d-flex flex-column"
                  >
                    <label className="mb-1">Filter by status</label>

                    {/* <Select
                      // autoFocus
                      value={selectedStatusOption}
                      onChange={handleChangeStatus}
                      options={statusOptions}
                    /> */}

                    <select className="" onChange={handleChangeStatus}>
                      {statusItems.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <Row className="mt-3">
              <Col lg="12" md="12">
                <div className="userbox position-relative add-newuser">
                  {loading === false ? (
                    <BootstrapTable
                      condensed
                      hover
                      keyField="id"
                      responsive={true}
                      bordered={true}
                      data={userListInfo?.data?.user || []}
                      columns={columns}
                      pagination={paginationFactory({ sizePerPage: 10 })}
                    />
                  ) : (
                    <SplashScreen />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
