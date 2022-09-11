import axios from "axios";
import { toast } from "../../utils/Toast.js";

//add-advertisement
export function addAdvertisements(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_ADVERTISEMENT_API_URL}add`, data, {
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

//update-advertisements
export function updateAdvertisements(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_ADVERTISEMENT_API_URL}update`, data, {
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

//filter-user-status
export function getAdvertisementListing(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_ADVERTISEMENT_API_URL}filter?sort=-1&pageNumber=${data.pageNumber}&recordsLimit=1000&searchParam=${data.searchParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        // console.log('user-response',response)
        resolve(response);
        // toast.success(response?.data?.message)
      })
      .catch(function (error) {
        console.error(error);
        // toast.error(error?.response?.data?.message)
      })
  );
}

//delete-advertisement
export function getAdvertisementStatus(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_ADVERTISEMENT_API_URL}setAdvertisementStatus?ad_id=${data.ad_id}&status=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        resolve(response);
        toast.success(response?.data?.message)
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error?.response?.data?.message)
      })
  );
}
