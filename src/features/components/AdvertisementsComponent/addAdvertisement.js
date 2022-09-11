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

import { addAdvertisementsAsync } from "../../reducers/advertisementReducer";

const AddAdvertisement = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const authToken = auth?.data?.token;
  let history = useHistory();
  const [link, setLink] = useState("");
  const [titlename, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = React.useState(false);


  const [formState, setFormState] = useState({
    errors: {},
  });
  const addAdvertisementData = {
    link: link,
    name: titlename,
    description: description,
    image: imgData,
  };
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!titlename.match(/^[a-zA-Z ]*$/)) {
     
      formIsValid = false;
      errors["titlename"] =
        "title cannot contain special characters, numbers";
    }
    if (!titlename) {
      formIsValid = false;
      errors["titlename"] = "Title is Required*";
    }
    if (titlename.length < 5) {
      formIsValid = false;
      errors["titlename"] = "Minimum 5 characters required";
    }
    if (!description) {
      formIsValid = false;
      errors["description"] = "Description is Required*";
    }
    if (description.length < 50) {
      formIsValid = false;
      errors["description"] = "Minimum 50 characters required.";
    }
    if (description.length > 200) {
      formIsValid = false;
      errors["description"] = "You are Exceeding the Limit.";
    }
    if (!imgData) {
      formIsValid = false;
      errors["imgData"] = "Image is Required*";
    }
    setFormState({ errors: errors });
    return formIsValid;
  };
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);

    if (handleValidation()) {
      dispatch(
        addAdvertisementsAsync({
          postData: addAdvertisementData,
          authToken,
          history,
        })
      );
    }
    setDisable(true)
   setTimeout(() => setDisable(false), 3000);

    // setLoading(false);


  };
  const handleCancel = () => {
    history.push("/view-all-advertisment");
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpg"
      ) {
        if (e.target.files[0].size <= 1000000) {
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
        } else {
          toast.error("File size should be less than 1 MB.");
        }
      } else {
        toast.error("file not supported");
      }

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleClick = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div>
      <Header />
      <section className="main-dashboard position-relative">
        <Sidebar />

        <div className="dashboard-right">
          <h2 className="dashboard-heading">Add Advertisement</h2>
          {/* {loading === false ? ( */}

          <Row>
            <Col lg="10" md="12">
              <div className="user-detailbox w-100">
                <Row>
                  <Col lg="8" md="12">
                    <Row>
                      <Col lg="6" md="12">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Title<span className="colored">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            minLength={5}
                            maxLength={20}
                            placeholder="Enter Title"
                            value={titlename}
                            onChange={(e) => setTitleName(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["titlename"]}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col lg="6" md="12">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail1"
                        >
                          <Form.Label>Link</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                          />
                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["link"]}
                          </span>
                        </Form.Group>
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
                            value={description}
                            className="p-3"
                            onChange={(e) => setDescription(e.target.value)}
                          />

                          <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["description"]}
                          </span>
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
                              src={imgData || addimg}
                              className="img-fluid singleuserimage mt-3 border-0 rounded-0"
                              alt=""
                            />
                            <a>
                              <FaRegEdit onClick={handleClick} />{" "}
                            </a>
                            <input
                              id="profilePic"
                              type="file"
                              ref={hiddenFileInput}
                              style={{ display: "none" }}
                              onChange={onChangePicture}
                            />
                            
                          </div>
                        </span>
                        <span className="error-msg" style={{ color: "red" }}>
                            {formState?.errors["imgData"]}
                          </span>
                      </span>
                    </div>
                  </Col>
                </Row>
                <div className="savechanges-btn d-flex">
              
                  <Button className="brown-btn me-3"  disabled={disable}  onClick={handleSubmit}>
                    Save
                  </Button>
                  
                  <Button
                    className="brown-btn d-block gray-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          {/* ) : (
            <SplashScreen />
          )}  */}

        </div>
      </section>
    </div>
  );
};

export default AddAdvertisement;
