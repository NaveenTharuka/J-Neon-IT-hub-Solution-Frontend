import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("user"); // simple example

    console.log(children)
    console.log("ProtectedRoute: isLoggedIn =", isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
}
