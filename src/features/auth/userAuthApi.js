import axios from "axios";
import { toast } from "../../utils/Toast.js";

//add-user
export function addUsers(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}add`, data, {
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

//update-users
export function updateUsers(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}update`, data, {
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

//search-users
export function searchUsers(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}search`, data, {
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

//filter-user-status
export function getUserStatus(data, token) {
  let param = "";
  if (
    (!data.active && !data.role_id) ||
    (data.active == 3 && data.role_id == 3)
  ) {
    param = "&filter={active:" + "{$ne:2}" + "}";
  } else if (
    data.active &&
    data.active != 3 &&
    data.role_id &&
    data.role_id != 3
  ) {
    param =
      "&filter={" + "role_id:" + data.role_id + ",active:" + data.active + "}";
  } else {
    if (
      data.role_id != 3 &&
      data.role_id &&
      (!data.active || data.active == 3)
    ) {
      param = "&filter={" + "role_id:" + data.role_id + "}" + "";
    } else if (
      data.active &&
      data.active != 3 &&
      (!data.role_id || data.role_id == 3)
    ) {
      param = "&filter={" + "active:" + data.active + "}";
    }

    if (!data.active || data.active == 3) {
      param = "&filter={" + "active:" + "{$ne:2}" + "}";
    }
    if (
      data.role_id != 3 &&
      data.role_id &&
      (!data.active || data.active == 3)
    ) {
      param = "&filter={" + "role_id:" + data.role_id + "}" + "";
    } else if (
      data.active &&
      data.active != 3 &&
      (!data.role_id || data.role_id == 3)
    ) {
      param = "&filter={" + "active:" + data.active + "}";
    }

    if (data.role_id && !data.active == "" && data.active == 3) {
      param =
        "&filter={" + "role_id:" + data.role_id + ",active:" + "{$ne:2}" + "}";
    } else if (
      data.active &&
      data.active != 3 &&
      (!data.role_id || data.role_id == 3)
    ) {
      param = "&filter={" + "active:" + data.active + "}";
    }
  }
  // if (data.active &&  data.role_id) {
  //   param =
  //     "&filter={" + "role_id:" + data.role_id + ",active:" + data.active + "}";
  // }

  var searchUsers = "";
  if (data.searchParam) {
    searchUsers = data.searchParam;
  } else {
    searchUsers = "undefined";
  }

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}filter?sort=-1&pageNumber=${data.pageNumber}&recordsLimit=1000${param}&searchParam=${searchUsers}`,
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

//get-notifications
export function getNotifications(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}listNotification`, {
        headers: {
          Authorization: `Bearer ${data.authToken}`,
        },
      })
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

//update-Notification

export function updateNotifications(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}updateNotification`, data, {
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

//getLoginUserStatus
export function getLoginUserStatus(data, token) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}getLoginUserStatus?user_id=${data.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        resolve(response);
        // toast.success(response?.data?.message)
        // if (
        //   response?.data?.user_data?.active == 0 ||
        //   response?.data?.user_data?.active == 2
        // ) {
        //   // logout();
        //   localStorage.clear();
        //   localStorage.removeItem("user");
        //   // toast.success("user logged out successfully!");
        //   data.history.push("/login");
        // }
      })
      .catch(function (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      })
  );
}
