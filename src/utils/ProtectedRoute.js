import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    selectAuth
} from "../features/auth/authSlice";


function ProtectedRoute({ component: Component, ...restOfProps }) {
    const auth = useSelector(selectAuth)
    const isAuthenticated = auth?.data?.userData?._id ? true : false  ;
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;