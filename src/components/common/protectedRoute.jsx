import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/auth.context";

function ProtectedRoute({ children, onlyBiz = false, requiredRole = null }) {
  const { pathname } = useLocation();
  const { user } = useAuth();


  if (!user) {
    return <Navigate to="/sign-in" state={{ from: pathname }} />;
  }

  if (onlyBiz && !user.biz && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
