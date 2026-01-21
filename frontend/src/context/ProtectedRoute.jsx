import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {

    const { isAuth, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="text-white p-10">Loading...</div>;
    }

    if (!isAuth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
