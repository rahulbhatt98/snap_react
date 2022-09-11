import axios from "axios";
import { toast } from "../../utils/Toast.js";

export function getTickets(data, token) {
  return new Promise((resolve, reject) =>
    axios({
      // withCredentials: true,
      // curl: `curl -v -u LAGD9PlWRkkPn9f9p4fG:X -X`,
      url: "https://seasia.freshdesk.com/api/v2/tickets",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic TEFHRDlQbFdSa2tQbjlmOXA0Zkc=`,
      },

      // auth: {
      //   Username: "LAGD9PlWRkkPn9f9p4fG",
      //   Password: "Mind@123",
      // },
    })
      // .get(
      //   `${process.env.REACT_APP_ADVERTISEMENT_API_URL}filter?sort=-1&pageNumber=1&recordsLimit=10&searchParam=${data.searchParam}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // )
      .then(function (response) {
        console.log("ticket-response", response);
        resolve(response);
        // toast.success(response?.data?.message)
      })
      .catch(function (error) {
        console.error(error);
        // toast.error(error?.response?.data?.message)
      })
  );
}
