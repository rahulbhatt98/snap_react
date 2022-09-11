import axios from "axios";
import { toast } from "../../utils/Toast.js";

export function loginApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}login`, data)
      .then(function (response) {
        //   console.log('logginnnnn',response.data.data)
        if (response?.data?.data?.token !== "") {
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          console.error(response);
        }
        // console.log('login-response',response)
        resolve(response);
        // toast.success(response?.data?.message)
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      })
  );
}

export function registerApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}register`, data, {})
      .then(function (response) {
        // console.log('response', response)
        if (response?.data?.user_id !== "") {
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          // toast.error(response?.data?.message)
          console.error(response);
        }
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

export function forgetPassApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}forgetPass`, data, {})
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

export function changePassApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}changePass`, data, {})
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

export function otpVerify(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}otpVerify`, data, {})
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

export function otpResend(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}resendOtp`, data, {})
      .then(function (response) {
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

//get user-listing
export function getUserList(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}userList?sort=-1&pageNumber=${data.pageNumber}&recordsLimit=10`,
        {
          headers: {
            // "device-id": "fsdfgdsfsdg",
            // "device-type": "dsgsdgsdg",
            // "app-version": "sfasfasfsf",
            Authorization: `Bearer ${data.authToken}`,
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

//get-latest-users
export function getLatestUsers(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}userList?sort=-1&pageNumber=1&recordsLimit=10`,
        {
          headers: {
            // "device-id": "fsdfgdsfsdg",
            // "device-type": "dsgsdgsdg",
            // "app-version": "sfasfasfsf",
            Authorization: `Bearer ${data}`,
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
