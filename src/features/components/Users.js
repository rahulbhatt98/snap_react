import React, { useEffect } from 'react'
import {
  Form,
  Button,
  Dropdown,
  Accordion,
  Row, Col, Table,
} from 'react-bootstrap';
import Latestuser from '../../assets/images/latestuser-img.png';
import { useDispatch, useSelector } from "react-redux";
import { toast } from '../../utils/Toast';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

import { selectAuth, getUserListAsync, userList } from '../auth/authSlice';

const Users = () => {
  const auth = useSelector(selectAuth)
  const dispatch = useDispatch();
  const authToken = auth?.data?.token
  const userListInfo = useSelector(userList)
  let history = useHistory();

  useEffect(() => {

    if (authToken) {
      dispatch(getUserListAsync(authToken))
    }
  }, [dispatch, authToken])


  return (

    <div>
      <Header />
      <section className='main-dashboard position-relative'>
        <Sidebar />

        <div className='dashboard-right'>
          <h2 className='dashboard-heading'>All Users</h2>
          <div>
            <Row className='mt-5'>
              <Col xs lg="12" md="12">
                <div className='userbox position-relative'>
                  <Table size="md" className='border-0 usertable responsive'>
                    <thead>
                      <tr> <th>User Name</th>
                        <th>Email</th>
                        <th>Created at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray && userListInfo?.data?.user?.map(i => (
                        <tr>

                          <td>{i.username}</td>
                          <td>{i.email}</td>
                          <td>{moment(i.createdAt).format('lll')}</td>
                        </tr>
                      ))}

                    </tbody>
                  </Table>

                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Users
