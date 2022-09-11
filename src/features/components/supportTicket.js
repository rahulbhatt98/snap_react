import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col,  Modal, ModalHeader, ModalBody} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { selectAuth } from "../auth/authSlice";
import {  AiOutlineClose } from "react-icons/ai";
import {getTicketsListing} from "../reducers/supportReducer"

const SupportTicket = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;


  let history = useHistory();
  const [formState, setFormState] = useState({
    errors: {},
  });


  useEffect(() => {
    if (authToken) {
      dispatch(
        getTicketsListing()
      );
    }
  },[]);

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
                       <div>
            <Row className="mt-3">
              <Col lg="12" md="12">
                <div className="userbox position-relative add-newuser advers-table">
                  {/* <BootstrapTable
                    condensed
                    hover
                    keyField="id"
                    responsive={true}
                    bordered={true}
                    // data={advertisementDataInfo?.data?.advertisement || []}
                    // columns={columns}
                    // pagination={paginationFactory({ sizePerPage: 10 })}
                  /> */}
                </div>
              </Col>
            </Row>
        
          </div>
            </div>
      </section>
    </div>
  );
};

export default SupportTicket;
