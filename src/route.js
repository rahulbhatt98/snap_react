import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./features/home/Home";
import SignUpOtp from "./features/auth/SignUpOtp";
import SignIn from "./features/auth/SignIn";
import PasswordReset from "./features/auth/PasswordReset";
import LockScreen from "./features/auth/LockScreen";
import SignupVerified from "./features/auth/SignupVerified";
import SignUp from "./features/auth/SignUp";
import OtpMobile from "./features/auth/OtpMobile";
import Dashboard from "./features/components/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Auth } from "./features/auth/Auth";
import Users from "./features/components/UsersComponent/Users";
import { selectAuth } from "./features/auth/authSlice";
import AddUsers from "./features/components/UsersComponent/addUser";
import Retailers from "./features/components/RetailerComponent/Retailers";
import AddRetailers from "./features/components/RetailerComponent/addRetailer";
import Notifications from "./features/components/Notifications/Notifications";
import EditUsers from "./features/components/UsersComponent/editUser";
import Advertisement from "./features/components/AdvertisementsComponent/Advertisement";
import AddAdvertisement from "./features/components/AdvertisementsComponent/addAdvertisement";
import UpdateAdvertisement from "./features/components/AdvertisementsComponent/updateAdvertisement";
// import SupportTicket from "./features/components/supportTicket"
import Support from "./features/components/Support/Support";
import AddTickets from "./features/components/Support/addTickets";

export default function Routes(props) {
  const auth = useSelector(selectAuth);
  const authorized = auth?.data?.userData?._id ? true : false;
  // console.log(authorized, "authorized")
  return (
    <>
      <Router basename="/snapcident/">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) =>
              authorized ? (
                <Redirect to="/dashboard" />
              ) : (
                <Auth {...routeProps} />
              )
            }
          />
          {/* <Route exact path="/" component={SignUp} /> */}
          <Route exact path="/otp/:id" component={SignUpOtp} />
          {/* <Route exact path="/login" component={SignIn} /> */}
          <Route exact path="/password-reset" component={PasswordReset} />
          <Route exact path="/lock-screen" component={LockScreen} />
          <Route exact path="/signup-verified" component={SignupVerified} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route exact path="/otpmobile" component={OtpMobile} /> */}
          <Route
            exact
            path="/login"
            render={(routeProps) =>
              authorized ? (
                <Redirect to="/dashboard" />
              ) : (
                <Auth {...routeProps} />
              )
            }
            component={Auth}
          />

          <ProtectedRoute
            exact
            path="/view-all-retailers"
            component={Retailers}
          />
          <ProtectedRoute exact path="/add-retailer" component={AddRetailers} />

          <ProtectedRoute exact path="/view-all-users" component={Users} />
          <ProtectedRoute exact path="/add-user" component={AddUsers} />
          <ProtectedRoute exact path="/edit-users" component={EditUsers} />

          <ProtectedRoute exact path="/dashboard" component={Dashboard} />

          <ProtectedRoute
            exact
            path="/view-all-notifications"
            component={Notifications}
          />

          <ProtectedRoute
            exact
            path="/view-all-advertisment"
            component={Advertisement}
          />
          <ProtectedRoute
            exact
            path="/add-advertisements"
            component={AddAdvertisement}
          />
          <ProtectedRoute
            exact
            path="/edit-advertisements"
            component={UpdateAdvertisement}
          />
          {/* <ProtectedRoute exact path='/support-ticket' component={SupportTicket} /> */}

          {/* <ProtectedRoute exact path='/support' component={Support} />
          <ProtectedRoute exact path='/add-new-tickets' component={AddTickets} /> */}

          {/* <Route
            path=""
            component={() => {
              window.open(
                "https://seasia.freshdesk.com/a/tickets/filters/all_tickets",
                "_blank"
              );
              return null;
            }}
          /> */}
        </Switch>
      </Router>
    </>
  );
}
