import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export function Auth({ location, history }) {
    const pathname = location.pathname;
    const AuthLayout = ({ children }) => {
        return (
            <div>
                {children}
            </div>
        );
    };
    switch (pathname) {
        case "/login":
            return (
                <AuthLayout>
                    <SignIn history={history} />
                </AuthLayout>
            );
        case "/signup":
            return (
                <AuthLayout>
                    <SignUp history={history} />
                </AuthLayout>
            );
            case "/":
                return (
                    <AuthLayout>
                         <SignIn history={history} />
                    </AuthLayout>
                );
        default:
            break;
    }
}