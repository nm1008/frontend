import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
