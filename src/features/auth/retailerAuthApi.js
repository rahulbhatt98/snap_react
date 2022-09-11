import axios from "axios";
import { toast } from "../../utils/Toast.js";

export function addRetailer(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_RETAILER_API_URL}add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {

        resolve(response);
        toast.success(response?.data?.message);
      })
      .catch(async (error) => {
        toast.error(error?.response?.data?.message);
        // reject(error)
      })
  );
}

//get-retailers-listing
export function getRetailersList(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_RETAILER_API_URL}list?sort=-1&pageNumber=${data.page}&recordsLimit=10`,
        {
          headers: {
            Authorization: `Bearer ${data.authToken}`,
          },
        }
      )
      .then(function (response) {
        resolve(response);
        // toast.success(response?.data?.message)
      })
      .catch(function (error) {
        console.error(error);
        // toast.error(error?.response?.data?.message)
      })
  );
}

//search-retailer

export function searchRetailers(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_RETAILER_API_URL}search`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // console.log('response', response)

        resolve(response);
        // toast.success(response?.data?.message);
      })
      .catch(async (error) => {
        console.log("errro", await error?.response);
        toast.error(error?.response?.data?.message);
        // reject(error)
      })
  );
}

//edit-retailers
export function updateRetailers(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_RETAILER_API_URL}update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // console.log('response', response)

        resolve(response);
        toast.success(response?.data?.message);
      })
      .catch(async (error) => {
        console.log("errro", await error?.response);
        toast.error(error?.response?.data?.message);
        // reject(error)
      })
  );
}