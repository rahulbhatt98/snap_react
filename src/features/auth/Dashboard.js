import { useState, React } from 'react'
import {
    Form,
    Button,
    Dropdown,
    Accordion,
    Row, Col, Table,
} from 'react-bootstrap';
import headerlogo from '../../assets/images/headerlogo.png';
import setting from '../../assets/images/settings.png';
import leftarrow from '../../assets/images/leftarrow.png';
import bell from '../../assets/images/bell.png';
import User from '../../assets/images/User.png';
import Latestuser from '../../assets/images/latestuser-img.png';
import { BsFillBellFill, BsShopWindow, BsBriefcase } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { RiBarChartFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import Copyright from '../../utils/Copyright';



const Dashboard = () => {
  return (
      <div>
        <header>
            <div className='snap-dheader d-flex align-items-center justify-content-between'>
                <div className='dheader-logo d-flex align-items-center ps-2 position-relative'>
                    <a href="#" className='tp-admintoggle'> <img src={leftarrow} className="img-fluid position-absolute" alt="" /></a>
                    <span><img src={headerlogo} className="img-fluid" alt="" /></span>                    
                </div>
                <div className='dheader-content d-flex align-items-center'>

                    <a href='#' className='mx-1'><img src={setting} className="img-fluid" alt="" /></a>
                    <a href='#' className='position-relative mx-1'><img src={bell} className="img-fluid" alt="" /><span className='total-items position-absolute'>1</span></a>
                    <img src={User} className="img-fluid ms-3 userimage" alt="" />
                    <Dropdown className='ms-3'>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className='shadow-0'>
                                Admin
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                </div>
            </div>
        </header>
    
        <section className='main-dashboard position-relative tpdashboard-wrapper'>
            <div className='dashboard-left'>
                    <ul className='m-0 p-0 item-listing'>
                        <li><a href='#'>
                       <AiOutlineHome/>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Dashboard</Accordion.Header>
                                        <Accordion.Body>
                                        <ul className='m-0 p-0'>
                                            <li><a href="#">List 1</a></li>
                                            <li><a href="#">List 2</a></li>
                                            <li><a href="#">List 3</a></li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>                                       
                            </Accordion></a>
                        </li>
                        <li><a href='#'><FaUsers/><Accordion>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>User</Accordion.Header>
                                        <Accordion.Body>
                                        <ul className='m-0 p-0'>
                                            <li><a href="#">List 1</a></li>
                                            <li><a href="#">List 2</a></li>
                                            <li><a href="#">List 3</a></li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>                                       
                            </Accordion></a></li>
                        <li><a href='#'>
                            <BsShopWindow/>
                            Retailers</a></li>
                        <li><a href='#'><BsFillBellFill />
                            Notifications</a></li>
                        <li><a href='#'><BsBriefcase/>Support</a></li> 
                        <li><a href='#'><RiBarChartFill/>Analytics</a></li> 
                        <li><a href='#'><CgNotes/>Content</a></li>  
                    </ul>
            </div>
            <div className='dashboard-right'>
                <h2 className='dashboard-heading'>Dashboard</h2>
                <div>
                    <Row>
                        <Col xs lg="4" md="12">
                            <div className='featured-box'>
                                <div className='featured-boxleft'>
                                    <p className='mb-0'>Total Users</p>
                                    <h4 className='mb-0'>320</h4>
                                </div>
                                <span className='featured-img'><FaUsers/></span>   
                            </div>       
                        </Col>
                        <Col xs lg="4" md="12">
                            <div className='featured-box'>
                                <div className='featured-boxleft'>
                                    <p className='mb-0'>Partenerd retailers</p>
                                    <h4 className='mb-0'>98</h4>
                                </div>
                                <span className='featured-img'><BsShopWindow/></span>   
                            </div>    
                        </Col>
                        <Col xs lg="4" md="12">
                            <div className='featured-box'>
                                <div className='featured-boxleft'>
                                    <p className='mb-0'>Total referrals</p>
                                    <h4 className='mb-0'>1320</h4>
                                </div>
                                <span className='featured-img'><CgNotes/></span>   
                            </div>    
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col xs lg="6" md="12">
                            <div className='userbox position-relative'>
                                <h6 className='dashboard-subheading border-bottom pb-2'>Latest users</h6>
                                <div className='d-flex align-items-center border-bottom pt-2 pb-3'>
                                    <span className='user-latestimg'><img src={Latestuser} className="img-fluid userimage" alt="" /></span>
                                    <div className='latestuser-detail'>
                                        <h6 className='mb-0'>Julie. M</h6>                                        
                                        <p className='mb-0'>Member since Oct. 6, 2021</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center border-bottom pt-2 pb-3'>
                                    <span className='user-latestimg'><img src={Latestuser} className="img-fluid userimage" alt="" /></span>
                                    <div className='latestuser-detail'>
                                        <h6 className='mb-0'>Julie. M</h6>                                        
                                        <p className='mb-0'>Member since Oct. 6, 2021</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center border-bottom pt-2 pb-3'>
                                    <span className='user-latestimg'><img src={Latestuser} className="img-fluid userimage" alt="" /></span>
                                    <div className='latestuser-detail'>
                                        <h6 className='mb-0'>Julie. M</h6>                                        
                                        <p className='mb-0'>Member since Oct. 6, 2021</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center border-bottom pt-2 pb-3'>
                                    <span className='user-latestimg'><img src={Latestuser} className="img-fluid userimage" alt="" /></span>
                                    <div className='latestuser-detail'>
                                        <h6 className='mb-0'>Julie. M</h6>                                        
                                        <p className='mb-0'>Member since Oct. 6, 2021</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <span className='user-latestimg'><img src={Latestuser} className="img-fluid userimage" alt="" /></span>
                                    <div className='latestuser-detail'>
                                        <h6 className='mb-0'>Julie. M</h6>                                        
                                        <p className='mb-0'>Member since Oct. 6, 2021</p>
                                    </div>
                                </div>
                                <a href='#' className='viewall-btn'>View All</a>
                            </div>
                        </Col>
                        <Col xs lg="6" md="12">
                            <div className='userbox position-relative'>
                                <h6 className='dashboard-subheading pb-2'>Top referral brands to the date</h6>
                                        <Table size="md" className='border-0 usertable'>
 
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
                                <a href='#' className='viewall-btn'>View All</a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
        <section className='footer position-absolute'>
            <Copyright/>
        </section>
    </div>
  )
}

export default Dashboard