import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "react-bootstrap";
import Latestuser from "../../../assets/images/latestuser-img.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { AiOutlineSearch } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { useParams } from "react-router-dom";
import avtar from "../../../assets/images/avtar.png";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { RiArrowUpDownLine } from "react-icons/ri";
import { selectAuth } from "../../auth/authSlice";
import {  AiOutlineClose } from "react-icons/ai";
import {  IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { DebounceInput } from "react-debounce-input";


import {
  getAdvertisementListAsync,
  advertisementData,
  getAdvertisementStatusAsync,
} from "../../reducers/advertisementReducer";

const Advertisements = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  const advertisementDataInfo = useSelector(advertisementData);
  const [searchAdvertisements, setSearchAdvertisements] = useState("");
  const [deleteAdModal, setdeleteAdModal] = useState(false);
  const [adID, setAdID] = useState("");
  const [pageNumber, setPage] = useState(1);


  let history = useHistory();
  const [formState, setFormState] = useState({
    errors: {},
  });
  const addUser = () => {
    history.push("/add-advertisements");
  };

  const columns = [
    {
      dataField: "image",
      sort: true,
      formatter: (col, row) => {
        if (col) return <img alt="" src={col} />;
        else {
          return <img alt="" src={avtar} />;
        }
      },
    },

    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: (order, column) => {
        if (!order) return (<span className="ms-1"><IoIosArrowRoundDown /><IoIosArrowRoundUp /></span>);
        else if (order === 'asc') return (<span className="ms-1"><IoIosArrowRoundDown /><font color="red"><IoIosArrowRoundUp /></font></span>);
        else if (order === 'desc') return (<span className="ms-1"><font color="red"><IoIosArrowRoundDown /></font><IoIosArrowRoundUp /></span>);
        return null;
      }
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      sortCaret: (order, column) => {
        if (!order) return (<span className="ms-1"><IoIosArrowRoundDown /><IoIosArrowRoundUp /></span>);
        else if (order === 'asc') return (<span className="ms-1"><IoIosArrowRoundDown /><font color="red"><IoIosArrowRoundUp /></font></span>);
        else if (order === 'desc') return (<span className="ms-1"><font color="red"><IoIosArrowRoundDown /></font><IoIosArrowRoundUp /></span>);
        return null;
      }
    },
    {
      dataField: "link",
      text: "Link",
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
              <FaRegEdit onClick={() => updateAds(row)} />
            </a>

            <a className="edit-use ms-4">
              <FaTrash onClick={() => deleteAdvertisement(row?._id)} />
            </a>
          </>
        );
      },
    },
  ];

  const updateAds = (row) => {
    history.push({
      pathname: "/edit-advertisements",
      state: {
        row,
      },
    });
  };

  const deleteAdvertisement = (row) => {
    setAdID(row);
    setdeleteAdModal(deleteAdModal ? false : true);
  };

  const updateUserModalBtn = (row) => {
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

  const handleOnUserSearch = (e) => {
    setSearchAdvertisements(e.target.value);
  };

  useEffect(() => {
    if (authToken) {
      dispatch(
        getAdvertisementListAsync({
          postData: {
            searchParam: searchAdvertisements || "",
            sort: -1,
            pageNumber: pageNumber,
            recordsLimit: 10,
          },
          authToken,
        })
      );
    }
  }, [searchAdvertisements,pageNumber]);

  const deleteAd = async (e) => {
    e.preventDefault();
    await dispatch(
      getAdvertisementStatusAsync({
        postData: { ad_id: adID },
        authToken,
      })
    );
    // }
    setdeleteAdModal(false);
    await dispatch(
      getAdvertisementListAsync({
        postData: {
          searchParam: searchAdvertisements || "",
          sort: -1,
          pageNumber: 1,
          recordsLimit: 10,
        },
        authToken,
      })
    );
  };
  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <div className="d-flex align-items-center mt-2">
            <h2 className="dashboard-heading">Advertisements</h2>
            <Button onClick={addUser} className="brown-btn ms-4">
              <FiUserPlus className="me-2" />
              Add New Advertisement
            </Button>
          </div>
          <div className="user-box mt-3">
            <Row>
              <Col lg="12" md="12">
                <Row>
                  <Col lg="4" md="12">
                    <Form.Group
                      className="position-relative searchbox d-flex flex-column user-box new-searchbox"
                      controlId="formBasicEmail"
                    >
                      <Form.Label>Search</Form.Label>
                      {/* <Form.Control
                        type="text"
                        placeholder="Search"
                        name="search"
                        value={searchAdvertisements}
                        onChange={(e) => {
                          handleOnUserSearch(e, "search");
                        }}
                      /> */}
                       <DebounceInput
                        minLength={2}
                        debounceTimeout={300}
                        value={searchAdvertisements}
                        className="mt-2"
                        onChange={(e) => {
                          handleOnUserSearch(e, "search");
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                      <AiOutlineSearch className="position-absolute search-icon" />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div>
            <Row className="mt-3">
              <Col lg="12" md="12">
                <div className="userbox position-relative add-newuser advers-table">
                  <BootstrapTable
                    condensed
                    hover
                    keyField="id"
                    responsive={true}
                    bordered={true}
                    data={advertisementDataInfo?.data?.advertisement || []}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 10 })}
                  />
                  {advertisementDataInfo?.data?.advertisement?.length === 0 && (
                    <h2 className="text-center">No Result Found</h2>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <Modal className="menumodal py-5" show={deleteAdModal} size="md">
            <div className="w-100 d-flex justify-content-end">
              <span
                className="px-2 py-2 fw-bold me-2 mt-2 cross-btn"
                onClick={deleteAdvertisement}
              >
                <AiOutlineClose />
              </span>
            </div>
            <ModalHeader className="d-flex justify-content-center align-items-center border-0 pb-0 mt-3">
              <h4 className="text-center fw-bold admodalheading">
                Are you sure you want to delete this Advertisement
              </h4>
            </ModalHeader>
            <ModalBody className="pt-3 pb-5">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                  <Button
                    className="d-inflex-flex justify-content-center green-btn border-0 align-items-center px-3 mx-1"
                    onClick={deleteAd}
                  >
                    Yes
                  </Button>
                  <Button
                    className="d-inflex-flex justify-content-center green-btn border-0 align-items-center px-3 mx-1"
                    onClick={deleteAdvertisement}
                  >
                    No
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Advertisements;
